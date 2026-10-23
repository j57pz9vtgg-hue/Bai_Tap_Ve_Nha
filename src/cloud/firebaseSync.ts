import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { firebaseConfig, SYNC_EMAIL, SYNC_UID } from "./firebaseConfig";
import { equal, merge, MergeConflict } from "./merge";
import type { Json } from "./merge";
import {
  applyRecord,
  backupBeforeFirstSync,
  localRecords,
  recordId,
  validateRecord,
} from "./records";
import type { LearningRecord } from "./records";
import { CLOUD_APPLIED, LOCAL_CHANGED, SYNC_KEYS } from "./storage";

const app = initializeApp(firebaseConfig);
export const cloudAuth = getAuth(app);
export const cloudDatabase = getFirestore(app);
// Local QA only; this branch is removed from production builds.
if (
  import.meta.env.DEV &&
  new URLSearchParams(location.search).get("firebaseEmulator") === "1"
) {
  connectAuthEmulator(cloudAuth, "http://127.0.0.1:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(cloudDatabase, "127.0.0.1", 8085);
}
const BASE_KEY = `learning-cloud-base:${firebaseConfig.projectId}:${SYNC_UID}`;
const OWNER_KEY = "learning-cloud-local-owner:v1";
type Acknowledged = LearningRecord & { revision: number };
export type CloudStatus = {
  phase:
    | "disconnected"
    | "connecting"
    | "syncing"
    | "synced"
    | "offline"
    | "error"
    | "conflict";
  message: string;
  lastSynced: number | null;
  conflicts: { id: string; label: string }[];
};
const labels = {
  topic: "Chủ đề",
  draft: "Bài đang làm",
  result: "Kết quả",
  settings: "Lớp học",
  parent: "Mật khẩu phụ huynh",
};
function describe(record: LearningRecord) {
  const payload = record.payload;
  const title =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? payload.title
      : null;
  return `${labels[record.kind]}${typeof title === "string" ? `: ${title}` : record.kind === "draft" || record.kind === "result" ? `: ${record.key}` : ""}`;
}
export function cloudError(error: unknown) {
  const code = String((error as { code?: string })?.code ?? "");
  if (
    /invalid-credential|wrong-password|user-not-found|invalid-email/.test(code)
  )
    return "Mật khẩu tài khoản đồng bộ chưa đúng hoặc tài khoản không thuộc dự án Firebase này.";
  if (/permission-denied/.test(code))
    return "Firebase chưa cấp quyền truy cập. Kiểm tra UID trong Rules của đúng dự án goc-hoc-tap-cua-be-19a0b.";
  if (/resource-exhausted|quota/.test(code))
    return "Đã chạm hạn mức Firebase. Dữ liệu trên máy vẫn được giữ lại; hãy thử đồng bộ sau.";
  if (/unavailable|network|deadline/.test(code))
    return "Chưa kết nối được Firebase. Dữ liệu vẫn lưu trên máy và sẽ thử lại khi có mạng.";
  if (/too-many-requests/.test(code))
    return "Có quá nhiều lần đăng nhập. Vui lòng đợi rồi thử lại.";
  return error instanceof Error && !code
    ? error.message
    : "Chưa đồng bộ được. Dữ liệu trên máy vẫn được giữ nguyên.";
}

class FirebaseSync {
  private state: CloudStatus = {
    phase: "disconnected",
    message: "Chưa kết nối đồng bộ",
    lastSynced: null,
    conflicts: [],
  };
  private listeners = new Set<() => void>();
  private authStop?: Unsubscribe;
  private dataStop?: Unsubscribe;
  private timer?: ReturnType<typeof setTimeout>;
  private retryTimer?: ReturnType<typeof setInterval>;
  private remote = new Map<string, Acknowledged>();
  private base = new Map<string, Acknowledged>();
  private conflictMap = new Map<
    string,
    { local: LearningRecord; remote: Acknowledged }
  >();
  private resolutions = new Map<string, "local" | "remote">();
  private ready = false;
  private running = false;
  private rerun = false;
  private generation = 0;
  private references = 0;
  getSnapshot = () => this.state;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  private update(
    phase: CloudStatus["phase"],
    message: string,
    lastSynced = this.state.lastSynced,
  ) {
    this.state = {
      phase,
      message,
      lastSynced,
      conflicts: [...this.conflictMap.entries()].map(([id, value]) => ({
        id,
        label: describe(value.local),
      })),
    };
    this.listeners.forEach((listener) => listener());
  }
  private fail(error: unknown) {
    this.update(navigator.onLine ? "error" : "offline", cloudError(error));
  }
  private changed = () => {
    if (cloudAuth.currentUser) {
      this.update(
        navigator.onLine ? "syncing" : "offline",
        navigator.onLine
          ? "Đang chờ đồng bộ…"
          : "Mất mạng · dữ liệu đã lưu trên máy",
      );
      this.schedule();
    }
  };
  private storageChanged = (event: StorageEvent) => {
    if (
      event.key &&
      (Object.values(SYNC_KEYS) as string[]).includes(event.key)
    ) {
      window.dispatchEvent(
        new CustomEvent(CLOUD_APPLIED, { detail: event.key }),
      );
      this.changed();
    }
  };
  private onlineChanged = () => {
    if (!cloudAuth.currentUser) {
      this.update("disconnected", "Chưa kết nối đồng bộ");
      return;
    }
    if (!navigator.onLine)
      this.update("offline", "Mất mạng · dữ liệu đã lưu trên máy");
    else this.schedule(0);
  };
  start() {
    this.references++;
    if (this.references === 1) {
      window.addEventListener(LOCAL_CHANGED, this.changed);
      window.addEventListener("storage", this.storageChanged);
      window.addEventListener("online", this.onlineChanged);
      window.addEventListener("offline", this.onlineChanged);
      this.authStop = onAuthStateChanged(cloudAuth, (user) => {
        this.generation++;
        this.dataStop?.();
        this.ready = false;
        this.remote.clear();
        this.conflictMap.clear();
        this.resolutions.clear();
        if (!user) {
          this.update("disconnected", "Chưa kết nối đồng bộ");
          return;
        }
        if (user.uid !== SYNC_UID) {
          this.update(
            "error",
            "Tài khoản đăng nhập không khớp UID được cấp quyền đồng bộ.",
          );
          return;
        }
        void this.attach(this.generation);
      });
      this.retryTimer = setInterval(() => this.schedule(0), 30000);
    }
    return () => {
      this.references--;
      if (!this.references) {
        this.generation++;
        this.authStop?.();
        this.dataStop?.();
        this.ready = false;
        clearTimeout(this.timer);
        clearInterval(this.retryTimer);
        window.removeEventListener(LOCAL_CHANGED, this.changed);
        window.removeEventListener("storage", this.storageChanged);
        window.removeEventListener("online", this.onlineChanged);
        window.removeEventListener("offline", this.onlineChanged);
      }
    };
  }
  private async attach(generation: number) {
    try {
      this.update("connecting", "Đang kết nối dữ liệu…");
      const owner = localStorage.getItem(OWNER_KEY);
      if (owner && owner !== SYNC_UID)
        throw new Error(
          "Dữ liệu trình duyệt này đã gắn với tài khoản khác. Hãy dùng hồ sơ trình duyệt riêng.",
        );
      localRecords(); // Validate before uploading or applying remote data.
      await backupBeforeFirstSync(SYNC_UID);
      if (generation !== this.generation) return;
      localStorage.setItem(OWNER_KEY, SYNC_UID);
      this.base = new Map(JSON.parse(localStorage.getItem(BASE_KEY) ?? "[]"));
      this.dataStop = onSnapshot(
        collection(cloudDatabase, "users", SYNC_UID, "records"),
        { includeMetadataChanges: true },
        (snapshot) => {
          if (generation !== this.generation) return;
          if (snapshot.metadata.fromCache) {
            this.ready = false;
            this.update(
              navigator.onLine ? "connecting" : "offline",
              navigator.onLine
                ? "Đang chờ xác nhận kết nối Firebase…"
                : "Mất mạng · dữ liệu đã lưu trên máy",
            );
            return;
          }
          try {
            const remote = new Map<string, Acknowledged>();
            for (const entry of snapshot.docs) {
              const value = entry.data();
              const record: Acknowledged = {
                kind: value.kind,
                key: value.key,
                revision: value.revision,
                payload: JSON.parse(value.payload),
              };
              validateRecord(record);
              if (
                entry.id !== recordId(record.kind, record.key) ||
                !Number.isInteger(record.revision) ||
                record.revision < 1
              )
                throw new Error("Bản đồng bộ trực tuyến không hợp lệ.");
              remote.set(entry.id, record);
            }
            this.remote = remote;
            this.ready = true;
            this.schedule(0);
          } catch (error) {
            this.fail(error);
          }
        },
        (error) => {
          this.ready = false;
          this.fail(error);
        },
      );
    } catch (error) {
      if (generation === this.generation) this.fail(error);
    }
  }
  private schedule(delay = 1500) {
    clearTimeout(this.timer);
    if (this.running) {
      this.rerun = true;
      return;
    }
    this.timer = setTimeout(() => {
      void this.run();
    }, delay);
  }
  async login(password: string) {
    const result = await signInWithEmailAndPassword(
      cloudAuth,
      SYNC_EMAIL,
      password,
    );
    if (result.user.uid !== SYNC_UID) {
      await signOut(cloudAuth);
      throw new Error(
        "Tài khoản này không khớp UID đã được cấp quyền. Vui lòng kiểm tra lại dự án Firebase.",
      );
    }
  }
  async disconnect() {
    await signOut(cloudAuth);
  }
  retry = () => {
    if (!this.ready && cloudAuth.currentUser?.uid === SYNC_UID) {
      this.generation++;
      this.dataStop?.();
      void this.attach(this.generation);
    } else this.schedule(0);
  };
  resolve(id: string, choice: "local" | "remote") {
    if (!this.conflictMap.has(id)) return;
    this.resolutions.set(id, choice);
    this.conflictMap.delete(id);
    this.schedule(0);
  }
  private async run() {
    if (
      this.running ||
      !this.references ||
      !this.ready ||
      cloudAuth.currentUser?.uid !== SYNC_UID
    )
      return;
    if (!navigator.onLine) {
      this.update("offline", "Mất mạng · dữ liệu đã lưu trên máy");
      return;
    }
    this.running = true;
    this.rerun = false;
    const generation = this.generation;
    try {
      this.update("syncing", "Đang đồng bộ…");
      const local = localRecords();
      const ids = new Set([
        ...local.keys(),
        ...this.remote.keys(),
        ...this.base.keys(),
      ]);
      for (const id of ids) {
        if (generation !== this.generation || !this.references) return;
        if (this.conflictMap.has(id)) continue;
        const known = this.base.get(id);
        const remoteKnown = this.remote.get(id);
        const description = local.get(id) ?? remoteKnown ?? known;
        if (!description) continue;
        const latest = localRecords().get(id);
        const startPayload = latest?.payload ?? null;
        if (
          !this.resolutions.has(id) &&
          known &&
          known.revision === remoteKnown?.revision &&
          equal(startPayload, known.payload)
        )
          continue;
        const ref = doc(cloudDatabase, "users", SYNC_UID, "records", id);
        try {
          const result = await runTransaction(
            cloudDatabase,
            async (transaction) => {
              const snapshot = await transaction.get(ref);
              const value = snapshot.data();
              const revision = value?.revision ?? 0;
              if (
                value &&
                (value.kind !== description.kind ||
                  value.key !== description.key ||
                  !Number.isInteger(revision) ||
                  revision < 1)
              )
                throw new Error("Bản đồng bộ không hợp lệ.");
              const remotePayload: Json = value
                ? JSON.parse(value.payload)
                : null;
              const remoteRecord = {
                ...description,
                payload: remotePayload,
                revision,
              };
              validateRecord(remoteRecord);
              const choice = this.resolutions.get(id);
              let payload: Json;
              try {
                payload =
                  choice === "local"
                    ? startPayload
                    : choice === "remote"
                      ? remotePayload
                      : !snapshot.exists() && !known
                        ? startPayload
                        : !known && value && remotePayload === null
                          ? null
                          : (merge(
                              known?.payload ??
                                (description.kind === "settings" ? 2 : null),
                              startPayload,
                              remotePayload,
                            ) ?? null);
              } catch (error) {
                if (error instanceof MergeConflict)
                  this.conflictMap.set(id, {
                    local: { ...description, payload: startPayload },
                    remote: remoteRecord,
                  });
                throw error;
              }
              validateRecord({ ...description, payload });
              const encoded = JSON.stringify(payload);
              if (new TextEncoder().encode(encoded).byteLength > 850000)
                throw new Error(
                  "Một bài làm quá lớn để đồng bộ. Bản trên máy vẫn được giữ lại.",
                );
              if (!snapshot.exists() || !equal(payload, remotePayload)) {
                transaction.set(ref, {
                  kind: description.kind,
                  key: description.key,
                  payload: encoded,
                  revision: revision + 1,
                  updatedAt: serverTimestamp(),
                });
                return { ...description, payload, revision: revision + 1 };
              }
              return { ...description, payload, revision };
            },
          );
          if (generation !== this.generation || !this.references) return;
          if (equal(localRecords().get(id)?.payload ?? null, startPayload))
            applyRecord(result);
          else this.rerun = true; // Never replace edits made while a request was in flight.
          this.base.set(id, result);
          localStorage.setItem(BASE_KEY, JSON.stringify([...this.base]));
          this.resolutions.delete(id);
        } catch (error) {
          if (!(error instanceof MergeConflict)) throw error;
        }
      }
      if (this.conflictMap.size)
        this.update(
          "conflict",
          "Có thay đổi trên hai máy cần bạn chọn bản muốn giữ.",
        );
      else if (this.rerun) this.update("syncing", "Đang đồng bộ…");
      else this.update("synced", "Đã đồng bộ", Date.now());
    } catch (error) {
      if (generation === this.generation) this.fail(error);
    } finally {
      this.running = false;
      if (this.rerun && this.references) this.schedule(300);
    }
  }
}
export const firebaseSync = new FirebaseSync();
export async function tryCloudLogin(password: string) {
  await cloudAuth.authStateReady();
  if (!cloudAuth.currentUser) {
    try {
      await firebaseSync.login(password);
    } catch {
      /* Local access remains available; the sync dialog can use the Firebase password. */
    }
  }
}
