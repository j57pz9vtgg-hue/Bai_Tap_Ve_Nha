import { useEffect, useState, useSyncExternalStore } from "react";
import { Cloud } from "lucide-react";
import { Dialog } from "../components";
import { firebaseSync, cloudError } from "./firebaseSync";
import { SYNC_EMAIL } from "./firebaseConfig";
import { SYNC_KEYS } from "./storage";
import "./cloud.css";

export default function CloudSync() {
  const state = useSyncExternalStore(
    firebaseSync.subscribe,
    firebaseSync.getSnapshot,
  );
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => firebaseSync.start(), []);
  function close() {
    setOpen(false);
    setPassword("");
    setError("");
  }
  async function login(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await firebaseSync.login(password);
      setPassword("");
    } catch (reason) {
      setError(cloudError(reason));
    } finally {
      setBusy(false);
    }
  }
  function downloadBackup() {
    const backup = {
      version: 1,
      createdAt: new Date().toISOString(),
      data: Object.fromEntries(
        Object.values(SYNC_KEYS).map((key) => [key, localStorage.getItem(key)]),
      ),
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "goc-hoc-tap-sao-luu.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <button
        className={`icon-button cloud-sync-button cloud-${state.phase}`}
        aria-label={`Đồng bộ dữ liệu: ${state.message}`}
        title={state.message}
        onClick={() => setOpen(true)}
      >
        <Cloud size={23} />
        <span className="cloud-status-dot" />
      </button>
      <span className="visually-hidden" role="status">
        {state.message}
      </span>
      {open && (
        <Dialog
          title="Đồng bộ dữ liệu"
          className="cloud-dialog"
          onClose={close}
        >
          <h2>Đồng bộ dữ liệu</h2>
          <p role="status" className={`cloud-state cloud-${state.phase}`}>
            {state.message}
          </p>
          <p>
            Chủ đề, bài mẫu đã gắn, kết quả, bài đang làm và khóa phụ huynh được
            dùng chung giữa các máy.
          </p>
          {state.phase === "disconnected" ? (
            <form onSubmit={login}>
              <p>
                Kết nối tài khoản <strong>{SYNC_EMAIL}</strong> một lần trên
                trình duyệt này. Những lần sau ứng dụng tự đồng bộ, không cần
                đăng nhập Google.
              </p>
              <label className="cloud-password-label">
                Mật khẩu tài khoản đồng bộ
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              {error && (
                <p role="alert" className="cloud-error">
                  {error}
                </p>
              )}
              <button className="primary-button" disabled={busy}>
                {busy ? "Đang kết nối…" : "Kết nối đồng bộ"}
              </button>
            </form>
          ) : (
            <>
              {state.lastSynced && (
                <p>
                  Lần đồng bộ gần nhất:{" "}
                  {new Date(state.lastSynced).toLocaleString("vi-VN")}
                </p>
              )}
              <p>
                Khi mất mạng, dữ liệu vẫn lưu trên máy. Khi có mạng trở lại, ứng
                dụng sẽ tự thử đồng bộ.
              </p>
              {state.conflicts.map((conflict) => (
                <section className="cloud-conflict" key={conflict.id}>
                  <h3>{conflict.label}</h3>
                  <p>
                    Hai máy đã sửa cùng dữ liệu. Chọn bản muốn dùng cho nội dung
                    này; các mục khác không bị thay đổi.
                  </p>
                  <button
                    onClick={() => firebaseSync.resolve(conflict.id, "local")}
                  >
                    Giữ bản trên máy này
                  </button>
                  <button
                    onClick={() => firebaseSync.resolve(conflict.id, "remote")}
                  >
                    Dùng bản trực tuyến
                  </button>
                </section>
              ))}
              <div className="cloud-actions">
                <button className="primary-button" onClick={firebaseSync.retry}>
                  Đồng bộ lại
                </button>
                <button
                  onClick={() => {
                    void firebaseSync
                      .disconnect()
                      .catch((reason) => setError(cloudError(reason)));
                  }}
                >
                  Ngắt kết nối
                </button>
              </div>
              {error && (
                <p role="alert" className="cloud-error">
                  {error}
                </p>
              )}
            </>
          )}
          <button className="cloud-backup" onClick={downloadBackup}>
            Tải bản sao dữ liệu trên máy
          </button>
          <p className="cloud-note">
            Kết nối chỉ dùng tài khoản Firebase riêng của ứng dụng. Mật khẩu
            không được đưa vào mã nguồn hay tệp sao lưu.
          </p>
        </Dialog>
      )}
    </>
  );
}
