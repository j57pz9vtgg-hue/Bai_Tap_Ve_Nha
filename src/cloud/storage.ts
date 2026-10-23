export const LOCAL_CHANGED = "learning-local-changed";
export const CLOUD_APPLIED = "learning-cloud-applied";
export const SYNC_KEYS = {
  topics: "homework-user-topics:v1",
  progress: "dino-homework:v1",
  parent: "homework-parent-password:v1",
} as const;
export function writeLearningStorage(key: string, value: string) {
  const changed = localStorage.getItem(key) !== value;
  localStorage.setItem(key, value);
  if (changed)
    window.dispatchEvent(new CustomEvent(LOCAL_CHANGED, { detail: key }));
}
