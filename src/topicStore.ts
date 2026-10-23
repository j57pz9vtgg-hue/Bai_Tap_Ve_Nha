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
  // Owner requested removal of every user-created topic on all devices.
  if (localStorage.getItem(KEY) !== '{"version":1,"topics":[]}') {
    writeLearningStorage(KEY, '{"version":1,"topics":[]}');
  }
  void questions;
  return [];

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
  topics = APPROVED_TOPICS.filter((topic) => topic.exampleIds.every((id) => sources.has(id))).map((topic) => ({
    id: topic.id,
    title: topic.title,
    questionIds: topic.questionIds,
    examples: topic.exampleIds.map((id) => sources.get(id)!),
  }));
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
