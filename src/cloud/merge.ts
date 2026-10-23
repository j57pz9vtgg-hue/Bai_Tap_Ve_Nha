export type Json =
  null | boolean | number | string | Json[] | { [key: string]: Json };
const record = (v: Json | undefined): v is { [key: string]: Json } =>
  v !== null && typeof v === "object" && !Array.isArray(v);
export function equal(a: Json | undefined, b: Json | undefined): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((v, i) => equal(v, b[i]));
  if (record(a) && record(b)) {
    const keys = Object.keys(a);
    return (
      keys.length === Object.keys(b).length &&
      keys.every((k) => Object.hasOwn(b, k) && equal(a[k], b[k]))
    );
  }
  return false;
}
export class MergeConflict extends Error {}
export function merge(
  base: Json | undefined,
  local: Json | undefined,
  remote: Json | undefined,
  field = "",
): Json | undefined {
  if (equal(local, base)) return remote;
  if (equal(remote, base) || equal(local, remote)) return local;
  // Membership arrays are sets: merge independent additions/removals.
  if (
    (field === "questionIds" || field === "exampleIds") &&
    Array.isArray(local) &&
    Array.isArray(remote) &&
    (base === undefined || Array.isArray(base))
  ) {
    const old = new Set((base as Json[]) ?? []),
      left = new Set(local),
      right = new Set(remote);
    return [...new Set([...local, ...remote])].filter(
      (v) => !old.has(v) || (left.has(v) && right.has(v)),
    );
  }
  if (record(local) && record(remote) && (base === undefined || record(base))) {
    const result: { [key: string]: Json } = Object.create(null);
    for (const key of new Set([
      ...Object.keys(base ?? {}),
      ...Object.keys(local),
      ...Object.keys(remote),
    ])) {
      const value = merge(base?.[key], local[key], remote[key], key);
      if (value !== undefined) result[key] = value;
    }
    return result;
  }
  throw new MergeConflict("Dữ liệu đã được thay đổi ở cả hai thiết bị.");
}
