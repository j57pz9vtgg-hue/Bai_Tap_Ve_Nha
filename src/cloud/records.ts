import { equal } from "./merge";
import type { Json } from "./merge";
import { CLOUD_APPLIED, SYNC_KEYS } from "./storage";
export type Kind = "topic" | "draft" | "result" | "settings" | "parent";
export type LearningRecord = { kind: Kind; key: string; payload: Json };
export const recordId = (kind: Kind, key: string) =>
  `${kind}_${encodeURIComponent(key)}`;
const emptyProgress = () => ({ version: 1, grade: 2, results: {}, drafts: {} });
const parse = (key: string, fallback: unknown) =>
  JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback));
export function localRecords(): Map<string, LearningRecord> {
  const result = new Map<string, LearningRecord>();
  const add = (kind: Kind, key: string, payload: Json) =>
    result.set(recordId(kind, key), { kind, key, payload });
  const topics = parse(SYNC_KEYS.topics, { version: 1, topics: [] });
  if (topics.version !== 1 || !Array.isArray(topics.topics))
    throw new Error("Không đọc được dữ liệu chủ đề trên máy này.");
  for (const topic of topics.topics) {
    if (
      typeof topic?.id !== "string" ||
      !topic.id.startsWith("user-topic-") ||
      typeof topic.title !== "string" ||
      !Array.isArray(topic.questionIds) ||
      !Array.isArray(topic.exampleIds)
    )
      throw new Error("Dữ liệu chủ đề không hợp lệ.");
    add("topic", topic.id, topic);
  }
  const progress = parse(SYNC_KEYS.progress, emptyProgress());
  if (
    progress.version !== 1 ||
    !progress.results ||
    !progress.drafts ||
    !Number.isInteger(progress.grade)
  )
    throw new Error("Không đọc được dữ liệu bài làm trên máy này.");
  add("settings", "grade", progress.grade);
  for (const [id, payload] of Object.entries(progress.results))
    add("result", id, payload as Json);
  for (const [id, payload] of Object.entries(progress.drafts))
    add("draft", id, payload as Json);
  const credential = parse(SYNC_KEYS.parent, null);
  if (credential) add("parent", "credential", credential);
  return result;
}
export function validateRecord(record: LearningRecord) {
  if (
    !record ||
    !["topic", "draft", "result", "settings", "parent"].includes(record.kind) ||
    typeof record.key !== "string" ||
    !record.key ||
    record.key.length > 500
  )
    throw new Error("Dữ liệu đồng bộ không hợp lệ.");
  const value = record.payload;
  if (value === null) return;
  if (record.kind === "settings") {
    if (
      record.key !== "grade" ||
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 5
    )
      throw new Error("Lớp học không hợp lệ.");
    return;
  }
  if (typeof value !== "object" || Array.isArray(value))
    throw new Error("Dữ liệu đồng bộ không hợp lệ.");
  if (
    record.kind === "topic" &&
    (value.id !== record.key ||
      !record.key.startsWith("user-topic-") ||
      typeof value.title !== "string" ||
      !Array.isArray(value.questionIds) ||
      !value.questionIds.every((v) => typeof v === "string") ||
      !Array.isArray(value.exampleIds) ||
      !value.exampleIds.every((v) => typeof v === "string"))
  )
    throw new Error("Chủ đề đồng bộ không hợp lệ.");
  if (
    record.kind === "parent" &&
    (record.key !== "credential" ||
      value.version !== 1 ||
      typeof value.salt !== "string" ||
      !/^[a-f0-9]{32}$/.test(value.salt) ||
      typeof value.digest !== "string" ||
      !/^[a-f0-9]{64}$/.test(value.digest))
  )
    throw new Error("Khóa phụ huynh không hợp lệ.");
  if (
    (record.kind === "draft" || record.kind === "result") &&
    (!/^[a-z]+:[1-5]:[^/]+$/.test(record.key) ||
      (value.answers !== undefined &&
        (!value.answers || typeof value.answers !== "object")) ||
      (value.questions !== undefined && !Array.isArray(value.questions)))
  )
    throw new Error("Bài làm đồng bộ không hợp lệ.");
}
export function applyRecord(record: LearningRecord) {
  validateRecord(record);
  if (
    equal(
      localRecords().get(recordId(record.kind, record.key))?.payload ?? null,
      record.payload,
    )
  )
    return;
  let storageKey: string;
  if (record.kind === "topic") {
    storageKey = SYNC_KEYS.topics;
    const current = parse(storageKey, { version: 1, topics: [] });
    const index = current.topics.findIndex(
      (t: { id: string }) => t.id === record.key,
    );
    if (record.payload === null)
      current.topics = current.topics.filter(
        (t: { id: string }) => t.id !== record.key,
      );
    else if (index < 0) current.topics.push(record.payload);
    else current.topics[index] = record.payload;
    localStorage.setItem(storageKey, JSON.stringify(current));
  } else if (record.kind === "parent") {
    storageKey = SYNC_KEYS.parent;
    if (record.payload === null) localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, JSON.stringify(record.payload));
  } else {
    storageKey = SYNC_KEYS.progress;
    const progress = parse(storageKey, emptyProgress());
    if (record.kind === "settings") progress.grade = record.payload ?? 2;
    else {
      const target =
        record.kind === "draft" ? progress.drafts : progress.results;
      if (record.payload === null) delete target[record.key];
      else target[record.key] = record.payload;
    }
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }
  window.dispatchEvent(new CustomEvent(CLOUD_APPLIED, { detail: storageKey }));
}
export async function backupBeforeFirstSync(owner: string) {
  const marker = `learning-cloud-backup:${owner}`;
  if (localStorage.getItem(marker) === "done") return;
  const snapshot = Object.fromEntries(
    Object.values(SYNC_KEYS).map((key) => [key, localStorage.getItem(key)]),
  );
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("learning-cloud-backups", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("backups");
    request.onerror = () =>
      reject(new Error("Không tạo được bản sao lưu trước khi đồng bộ."));
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("backups", "readwrite");
      transaction
        .objectStore("backups")
        .put({ createdAt: Date.now(), snapshot }, owner);
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(new Error("Không lưu được bản dự phòng trước khi đồng bộ."));
      };
    };
  });
  localStorage.setItem(marker, "done");
}
