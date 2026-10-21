import { APP_ACCESS } from "./accessConfig";

const DATABASE = "homework-remembered-login:v1";
const STORE = "credentials";
const RECORD = "app-login";
type RememberedLogin = {
  version: 1;
  accessDigest: string;
  key: CryptoKey;
  iv: Uint8Array;
  encrypted: ArrayBuffer;
};
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(new Error("Remembered login storage is blocked"));
  });
}
let pendingMutation: Promise<unknown> = Promise.resolve();
function mutate(
  record: RememberedLogin | null,
  isCurrent: () => boolean = () => true,
): Promise<boolean> {
  const operation = pendingMutation.then(async () => {
    const db = await openDatabase();
    try {
      if (!isCurrent()) return false;
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE, "readwrite");
        const store = transaction.objectStore(STORE);
        if (record) store.put(record, RECORD);
        else store.delete(RECORD);
        transaction.oncomplete = () => resolve();
        transaction.onabort = transaction.onerror = () =>
          reject(transaction.error);
      });
      return true;
    } finally {
      db.close();
    }
  });
  pendingMutation = operation.catch(() => {});
  return operation;
}
export async function saveRememberedPassword(
  password: string,
  isCurrent: () => boolean,
): Promise<boolean> {
  // No plaintext password is written to browser storage. The device key is non-extractable.
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(password),
  );
  if (!isCurrent()) return false;
  return mutate(
    { version: 1, accessDigest: APP_ACCESS.digest, key, iv, encrypted },
    isCurrent,
  );
}
export function clearRememberedPassword() {
  return mutate(null);
}
export async function loadRememberedPassword(): Promise<string | null> {
  await pendingMutation;
  const db = await openDatabase();
  let record: RememberedLogin | undefined;
  try {
    record = await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, "readonly");
      const request = transaction.objectStore(STORE).get(RECORD);
      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = transaction.onerror = () =>
        reject(transaction.error);
    });
  } finally {
    db.close();
  }
  if (!record) return null;
  try {
    if (
      record.version !== 1 ||
      record.accessDigest !== APP_ACCESS.digest ||
      record.key.extractable ||
      record.key.algorithm.name !== "AES-GCM"
    ) {
      await clearRememberedPassword();
      return null;
    }
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(record.iv) },
      record.key,
      record.encrypted,
    );
    const password = new TextDecoder().decode(plaintext);
    return password.length > 0 && password.length <= 128 ? password : null;
  } catch {
    await clearRememberedPassword();
    return null;
  }
}
