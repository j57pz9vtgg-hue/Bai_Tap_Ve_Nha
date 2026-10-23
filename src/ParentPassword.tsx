import { writeLearningStorage } from "./cloud/storage";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { APP_ACCESS } from "./accessConfig";
import { CheckCircle2, LockKeyhole } from "lucide-react";

const KEY = "homework-parent-password:v1";
const ITERATIONS = 210000;
type Credential = { version: 1; salt: string; digest: string };
function readCredential(): Credential | null {
  const raw = localStorage.getItem(KEY);
  if (raw === null) return null;
  const value = JSON.parse(raw);
  if (
    value?.version !== 1 ||
    !/^[a-f0-9]{32}$/.test(value.salt) ||
    !/^[a-f0-9]{64}$/.test(value.digest)
  )
    throw new Error("Invalid credential");
  return value;
}
const hex = (bytes: Uint8Array) =>
  Array.from(bytes, (x) => x.toString(16).padStart(2, "0")).join("");
async function derive(password: string, salt: string) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bytes = Uint8Array.from(salt.match(/.{2}/g)!, (x) => parseInt(x, 16));
  return hex(
    new Uint8Array(
      await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          hash: "SHA-256",
          iterations: ITERATIONS,
          salt: bytes,
        },
        material,
        256,
      ),
    ),
  );
}
async function verify(password: string, credential: Credential) {
  const actual = await derive(password, credential.salt);
  let difference = 0;
  for (let i = 0; i < actual.length; i++)
    difference |= actual.charCodeAt(i) ^ credential.digest.charCodeAt(i);
  return difference === 0;
}

export function ParentPassword({
  purpose,
  onUnlock,
  onCancel,
  onSetup,
}: {
  purpose: "settings" | "review";
  onUnlock?: () => void;
  onCancel: () => void;
  onSetup?: () => void;
}) {
  const [credential] = useState(() => {
    try {
      return { value: readCredential(), error: "" };
    } catch {
      return {
        value: null,
        error:
          "Không đọc được mật khẩu đã lưu. Vui lòng kiểm tra quyền lưu dữ liệu của trình duyệt rồi thử lại.",
      };
    }
  });
  const [password, setPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(credential.error);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);
  const settings = purpose === "settings";
  const needsCurrent = Boolean(credential.value);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || credential.error) return;
    setError("");
    if (
      settings &&
      (nextPassword.length < 6 || nextPassword !== confirmation)
    ) {
      setError(
        nextPassword.length < 6
          ? "Mật khẩu cần ít nhất 6 ký tự."
          : "Hai mật khẩu mới chưa trùng nhau.",
      );
      return;
    }
    setBusy(true);
    try {
      if (
        JSON.stringify(readCredential()) !== JSON.stringify(credential.value)
      ) {
        setError(
          "Mật khẩu phụ huynh đã được cập nhật ở máy khác. Hãy đóng và mở lại cửa sổ này.",
        );
        return;
      }
      if (credential.value && !(await verify(password, credential.value))) {
        if (active.current) setError("Mật khẩu chưa đúng. Vui lòng nhập lại.");
        return;
      }
      if (!active.current) return;
      if (settings) {
        if (await verify(nextPassword, APP_ACCESS)) {
          if (active.current)
            setError(
              "Mật khẩu phụ huynh phải khác mật khẩu đăng nhập ứng dụng.",
            );
          return;
        }
        if (!active.current) return;
        const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
        const digest = await derive(nextPassword, salt);
        if (!active.current) return;
        writeLearningStorage(KEY, JSON.stringify({ version: 1, salt, digest }));
        setPassword("");
        setNextPassword("");
        setConfirmation("");
        setDone(true);
      } else if (credential.value) {
        setPassword("");
        onUnlock?.();
      }
    } catch {
      if (active.current)
        setError(
          "Không thể xác nhận hoặc lưu mật khẩu. Vui lòng kiểm tra quyền lưu dữ liệu của trình duyệt rồi thử lại.",
        );
    } finally {
      if (active.current) setBusy(false);
    }
  }
  return (
    <div className="parent-password-panel">
      <div className="password-icon">
        {done ? <CheckCircle2 size={30} /> : <LockKeyhole size={30} />}
      </div>
      <h3 id="parent-password-title">
        {done
          ? "Đã lưu mật khẩu phụ huynh"
          : settings
            ? needsCurrent
              ? "Đổi mật khẩu phụ huynh"
              : "Thiết lập mật khẩu phụ huynh"
            : "Dành cho phụ huynh"}
      </h3>
      {done ? (
        <>
          <p>
            Mỗi lần mở kết quả, đáp án và lời giải đều cần nhập mật khẩu này.
          </p>
          <button className="primary-button" onClick={onCancel}>
            Hoàn tất
          </button>
        </>
      ) : !settings && !credential.value && !credential.error ? (
        <>
          <p>
            Phụ huynh cần thiết lập mật khẩu tại{" "}
            <strong>Phụ huynh → Mật khẩu</strong> trước khi xem đáp án và lời
            giải.
          </p>
          <button className="primary-button" onClick={onSetup}>
            Thiết lập mật khẩu
          </button>
          <button className="text-button" onClick={onCancel}>
            Quay lại
          </button>
        </>
      ) : (
        <>
          <p>
            {settings
              ? needsCurrent
                ? "Nhập mật khẩu hiện tại để đổi mật khẩu mới."
                : "Phụ huynh đặt mật khẩu ít nhất 6 ký tự để khóa phần kết quả, đáp án và lời giải."
              : "Nhập mật khẩu phụ huynh để xem kết quả, đáp án và lời giải của bài này."}
          </p>
          <form onSubmit={submit}>
            {needsCurrent && (
              <label htmlFor="parent-current-password">
                {settings ? "Mật khẩu hiện tại" : "Mật khẩu phụ huynh"}
                <input
                  id="parent-current-password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  maxLength={128}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={busy}
                />
              </label>
            )}
            {settings && (
              <>
                <label htmlFor="parent-new-password">
                  Mật khẩu mới
                  <input
                    id="parent-new-password"
                    type="password"
                    autoComplete="new-password"
                    autoFocus={!needsCurrent}
                    required
                    minLength={6}
                    maxLength={128}
                    value={nextPassword}
                    onChange={(e) => setNextPassword(e.target.value)}
                    disabled={busy}
                  />
                </label>
                <label htmlFor="parent-confirm-password">
                  Nhập lại mật khẩu mới
                  <input
                    id="parent-confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    maxLength={128}
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    disabled={busy}
                  />
                </label>
              </>
            )}
            {error && (
              <p className="password-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="primary-button"
              type="submit"
              disabled={busy || Boolean(credential.error)}
            >
              {busy
                ? "Đang xác nhận…"
                : settings
                  ? "Lưu mật khẩu"
                  : "Mở kết quả"}
            </button>
            <button className="text-button" type="button" onClick={onCancel}>
              Hủy
            </button>
          </form>
        </>
      )}
      <p className="sample-notice">
        Khóa phụ huynh được lưu trên máy và sẽ đồng bộ khi đã kết nối tài khoản.
        Phụ huynh nên thiết lập trước khi giao máy cho bé.
      </p>
    </div>
  );
}
