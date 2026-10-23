// New classifications use a new ID namespace so previously deleted topics stay deleted.
export const isRetiredTopic = (id: string) => !id.startsWith("user-topic-v2-");
