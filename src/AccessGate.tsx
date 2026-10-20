import { createContext, useContext, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { BookOpen, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { APP_ACCESS } from "./accessConfig";
const SESSION_KEY = "homework-access-session:v1";
const AccessContext = createContext({ logout: () => {} });
export const useAppAccess = () => useContext(AccessContext);
export function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === APP_ACCESS.digest;
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* In-memory lock still applies. */
    }
    setUnlocked(false);
    setPassword("");
    setError("");
  }
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"],
      );
      const salt = Uint8Array.from(APP_ACCESS.salt.match(/.{2}/g)!, (x) =>
        parseInt(x, 16),
      );
      const digest = Array.from(
        new Uint8Array(
          await crypto.subtle.deriveBits(
            { name: "PBKDF2", hash: "SHA-256", iterations: 210000, salt },
            key,
            256,
          ),
        ),
        (x) => x.toString(16).padStart(2, "0"),
      ).join("");
      if (digest !== APP_ACCESS.digest) {
        setError("Mật khẩu vào ứng dụng chưa đúng. Vui lòng nhập lại.");
        return;
      }
      try {
        sessionStorage.setItem(SESSION_KEY, APP_ACCESS.digest);
      } catch {
        /* Access remains valid until this page reloads. */
      }
      setPassword("");
      setUnlocked(true);
    } catch {
      setError(
        "Không thể xác nhận mật khẩu. Vui lòng tải lại trang rồi thử lại.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (unlocked)
    return (
      <AccessContext.Provider value={{ logout }}>
        {children}
      </AccessContext.Provider>
    );
  return (
    <main className="access-screen">
      <section className="access-card" aria-labelledby="access-title">
        <div className="access-book">
          <BookOpen size={42} />
        </div>
        <h1 id="access-title">Góc học tập của bé</h1>
        <p>Nhập mật khẩu để vào ứng dụng.</p>
        <form onSubmit={login}>
          <label htmlFor="app-access-password">Mật khẩu đăng nhập</label>
          <div className="access-input">
            <LockKeyhole size={20} />
            <input
              id="app-access-password"
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              autoFocus
              required
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={busy}
            />
            <button
              type="button"
              className="icon-button"
              aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && (
            <p role="alert" className="password-error">
              {error}
            </p>
          )}
          <button type="submit" className="primary-button" disabled={busy}>
            {busy ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
        <small>
          Mật khẩu phụ huynh được dùng riêng khi xem kết quả và lời giải.
        </small>
      </section>
    </main>
  );
}
