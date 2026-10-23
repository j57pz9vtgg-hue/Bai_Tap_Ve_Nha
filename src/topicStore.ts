import { isRetiredTopic } from "./topicPolicy";
import { APPROVED_TOPICS } from "./content/approved-topics";
import { writeLearningStorage } from "./cloud/storage";
import type { Exercise, Question } from "./data";

export type UserTopic = {
  id: string;
  title: string;
  questionIds: string[];
  examples: Question[];
};
const KEY = "homework-user-topics:v1";
export const questionId = (q: Question) =>
  `${q.sourcePaper}::${q.sourceNumber}`;
export function readUserTopics(questions: Question[]): UserTopic[] | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  if (data.version !== 1 || !Array.isArray(data.topics))
    throw new Error("Dữ liệu chủ đề không hợp lệ.");
  const sources = new Map(questions.map((q) => [questionId(q), q]));
  const ids = new Set<string>();
  return data.topics.filter((topic: { id?: string }) => typeof topic?.id === "string" && !isRetiredTopic(topic.id)).map(
    (topic: { id: string; title: string; questionIds: string[]; exampleIds: string[] }) => {
      if (ids.has(topic.id) || typeof topic.title !== "string" || !topic.title.trim() ||
        !Array.isArray(topic.questionIds) || !topic.questionIds.every((id) => typeof id === "string") ||
        !Array.isArray(topic.exampleIds) || !topic.exampleIds.every((id) => typeof id === "string"))
        throw new Error("Dữ liệu chủ đề không hợp lệ.");
      ids.add(topic.id);
      return {
        id: topic.id, title: topic.title,
        questionIds: [...new Set(topic.questionIds)].filter((id) => sources.has(id)),
        examples: [...new Set(topic.exampleIds)].flatMap((id) => sources.has(id) ? [sources.get(id)!] : []),
      };
    },
  );
}

export function saveUserTopics(topics: UserTopic[]) {
  writeLearningStorage(
    KEY,
    JSON.stringify({
      version: 1,
      topics: topics.map(({ examples, ...topic }) => ({
        ...topic,
        exampleIds: examples.map(questionId),
      })),
    }),
  );
}
export function resolveUserTopics(questions: Question[]): Exercise[] {
  if (typeof localStorage === "undefined") return [];
  let topics: UserTopic[] | null;
  try {
    topics = readUserTopics(questions);
  } catch {
    return [];
  }
  const sources = new Map(questions.map((q) => [questionId(q), q]));
  topics = [...(topics ?? []), ...APPROVED_TOPICS.filter((topic) => topic.exampleIds.every((id) => sources.has(id))).map((topic) => ({
    id: topic.id,
    title: topic.title,
    questionIds: topic.questionIds,
    examples: topic.exampleIds.map((id) => sources.get(id)!),
  }))];
  const available = new Set(questions.map(questionId));
  const assigned = new Set(topics.flatMap((t) => [...t.questionIds, ...t.examples.map(questionId)]));
  const resolved: Exercise[] = topics.map((t) => ({
    id: t.id,
    title: t.title,
    category: "topic",
    questionIds: t.questionIds.filter((id) => available.has(id)),
    questionCount: t.questionIds.filter((id) => available.has(id)).length,
    examples: t.examples,
    example: t.examples[0],
    exampleOnly: true,
  }));
  const unassigned = questions
    .filter((q) => !assigned.has(questionId(q)))
    .map(questionId);
  if (unassigned.length)
    resolved.push({
      id: "unassigned",
      title: "Chưa có chủ đề",
      category: "topic",
      questionIds: unassigned,
      questionCount: unassigned.length,
    });
  return resolved;
}
