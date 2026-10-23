import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { BookOpen, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { APP_ACCESS } from "./accessConfig";
import {
  clearRememberedPassword,
  loadRememberedPassword,
  saveRememberedPassword,
} from "./rememberedPassword";
const SESSION_KEY = "homework-access-session:v1";
const REMEMBER_KEY = "homework-access-remember:v1";
function hasAccess(
  storageName: "localStorage" | "sessionStorage",
  key: string,
) {
  try {
    return window[storageName].getItem(key) === APP_ACCESS.digest;
  } catch {
    return false;
  }
}
async function verifyPassword(password: string) {
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
  return digest === APP_ACCESS.digest;
}
const AccessContext = createContext({ logout: () => {} });
export const useAppAccess = () => useContext(AccessContext);
export function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() =>
    hasAccess("sessionStorage", SESSION_KEY),
  );
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [rememberMessage, setRememberMessage] = useState("");
  const rememberRevision = useRef(0);
  const savedPassword = useRef("");
  useEffect(() => {
    // Remove grants from the old auto-login feature. Remembering now only prefills the form.
    try {
      localStorage.removeItem(REMEMBER_KEY);
    } catch {
      /* Browser storage may be unavailable. */
    }
    let active = true;
    const revision = rememberRevision.current;
    void (async () => {
      try {
        const stored = await loadRememberedPassword();
        if (!stored || !active || revision !== rememberRevision.current) return;
        const valid = await verifyPassword(stored);
        if (!active || revision !== rememberRevision.current) return;
        if (!valid) {
          await clearRememberedPassword();
          return;
        }
        savedPassword.current = stored;
        if (unlocked) return;
        setPassword(stored);
        setRemember(true);
        setRememberMessage(
          "Đã điền mật khẩu đã lưu. Bấm Đăng nhập để vào ứng dụng.",
        );
      } catch {
        /* The login form remains available if device storage is blocked. */
      }
    })();
    return () => {
      active = false;
    };
  }, [unlocked]);
  function clearRememberedAccess() {
    rememberRevision.current++;
    savedPassword.current = "";
    void clearRememberedPassword().catch(() => {});
  }
  function changePassword(value: string) {
    clearRememberedAccess();
    setPassword(value);
    setError("");
    setRememberMessage(
      remember
        ? value
          ? "Đang xác nhận để lưu mật khẩu…"
          : "Nhập mật khẩu để lưu."
        : "",
    );
  }
  function changeRemember(value: boolean) {
    clearRememberedAccess();
    setRemember(value);
    setError("");
    setRememberMessage(
      value
        ? password
          ? "Đang xác nhận để lưu mật khẩu…"
          : "Nhập mật khẩu để lưu."
        : "",
    );
  }
  useEffect(() => {
    if (!remember || !password || unlocked || busy) return;
    if (password === savedPassword.current) return;
    let active = true;
    const revision = rememberRevision.current;
    const timer = window.setTimeout(async () => {
      try {
        const valid = await verifyPassword(password);
        if (!active || revision !== rememberRevision.current) return;
        if (!valid) {
          setRememberMessage("Mật khẩu chưa đúng, chưa lưu mật khẩu.");
          return;
        }
        const saved = await saveRememberedPassword(
          password,
          () => active && revision === rememberRevision.current,
        );
        if (!saved || !active || revision !== rememberRevision.current) return;
        savedPassword.current = password;
        setRememberMessage("Đã lưu mật khẩu. Bạn vẫn cần bấm Đăng nhập.");
      } catch {
        if (active && revision === rememberRevision.current)
          setRememberMessage("Chưa thể lưu mật khẩu trên trình duyệt này.");
      }
    }, 300);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [remember, password, unlocked, busy]);
  function logout() {
    rememberRevision.current++;
    const remembered = savedPassword.current;
    setRememberMessage(
      remembered
        ? "Đã điền mật khẩu đã lưu. Bấm Đăng nhập để vào ứng dụng."
        : "",
    );
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* In-memory lock still applies. */
    }
    setUnlocked(false);
    setRemember(Boolean(remembered));
    setVisible(false);
    setPassword(remembered);
    setError("");
  }
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    rememberRevision.current++;
    setBusy(true);
    setError("");
    try {
      if (!(await verifyPassword(password))) {
        setError("Mật khẩu vào ứng dụng chưa đúng. Vui lòng nhập lại.");
        return;
      }
      try {
        sessionStorage.setItem(SESSION_KEY, APP_ACCESS.digest);
      } catch {
        /* Access remains valid until this page reloads. */
      }
      try {
        const revision = rememberRevision.current;
        if (remember) {
          const saved = await saveRememberedPassword(
            password,
            () => revision === rememberRevision.current,
          );
          if (saved) savedPassword.current = password;
        } else {
          savedPassword.current = "";
          await clearRememberedPassword();
        }
      } catch {
        /* A blocked persistent store does not prevent this login. */
      }
      // Try the existing app password once. If Firebase has a different password,
      // local access still works and the cloud dialog can connect it once.
      void import("./cloud/firebaseSync")
        .then(({ tryCloudLogin }) => tryCloudLogin(password))
        .catch(() => {});
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
              onChange={(e) => changePassword(e.target.value)}
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
          <label className="remember-login">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => changeRemember(e.target.checked)}
              disabled={busy}
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          {remember && rememberMessage && (
            <p className="remember-feedback" role="status">
              {rememberMessage}
            </p>
          )}
          {error && (
            <p role="alert" className="password-error">
              {error}
            </p>
          )}
          <button type="submit" className="primary-button" disabled={busy}>
            {busy ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
      </section>
    </main>
  );
}
