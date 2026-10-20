import { randomBytes, pbkdf2Sync } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

// Read from stdin so the password never needs to appear in a command argument.
const password = readFileSync(0, "utf8").replace(/\r?\n$/, "");
if (password.length < 8 || password.length > 128) {
  throw new Error("Mật khẩu đăng nhập cần từ 8 đến 128 ký tự.");
}
const salt = randomBytes(16).toString("hex");
const digest = pbkdf2Sync(
  password,
  Buffer.from(salt, "hex"),
  210000,
  32,
  "sha256",
).toString("hex");
const config = { version: 1, salt, digest };
writeFileSync(
  new URL("../src/accessConfig.ts", import.meta.url),
  `// Basic browser access gate for the static site; independent of parent review credentials.\nexport const APP_ACCESS = ${JSON.stringify(config)} as const;\n`,
);
console.log(
  "Đã cập nhật cấu hình mật khẩu. Build và xuất bản lại để áp dụng cho website.",
);
