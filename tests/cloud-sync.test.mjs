import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const folder = await mkdtemp(join(tmpdir(), "learning-sync-test-"));
await build({
  entryPoints: ["src/cloud/merge.ts", "src/cloud/records.ts", "src/data.ts"],
  outdir: folder,
  bundle: true,
  platform: "node",
  format: "esm",
  outExtension: { ".js": ".mjs" },
});
const { merge, equal, MergeConflict } = await import(
  pathToFileURL(join(folder, "cloud/merge.mjs"))
);
const { applyRecord, localRecords, recordId, validateRecord } = await import(
  pathToFileURL(join(folder, "cloud/records.mjs"))
);
const data = await import(pathToFileURL(join(folder, "data.mjs")));
let store = new Map();
globalThis.localStorage = {
  getItem: (key) => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, value),
  removeItem: (key) => store.delete(key),
};
globalThis.window = new EventTarget();
const source = ["qualifier", "national"].flatMap((category) =>
  data
    .getExercises("timo", category, 2)
    .flatMap((paper) => data.getQuestions(2, "timo", paper)),
);
const questionId = (q) => `${q.sourcePaper}::${q.sourceNumber}`;
const topicKey = "homework-user-topics:v1",
  progressKey = "dino-homework:v1";
const topic = {
  id: "user-topic-test",
  title: "Topic",
  questionIds: [questionId(source[0])],
  exampleIds: [questionId(source[0])],
};
const copy = (v) => JSON.parse(JSON.stringify(v));
const topicRecord = (payload) => ({ kind: "topic", key: topic.id, payload });
const draft = {
  answers: {},
  index: 0,
  deadline: 2000000000000,
  questions: source.slice(0, 3),
};

await test("independent question selections on two offline devices are retained", () => {
  const a = copy(topic),
    b = copy(topic);
  a.questionIds.push(questionId(source[25]));
  b.questionIds.push(questionId(source[187]));
  const result = merge(topic, a, b);
  assert.equal(result.questionIds.length, 3);
  assert.deepEqual(
    new Set(result.questionIds),
    new Set([...a.questionIds, ...b.questionIds]),
  );
  assert.deepEqual(result.exampleIds, topic.exampleIds);
});
await test("membership removals are not resurrected by an unchanged device", () => {
  const before = { questionIds: ["one", "two"] };
  assert.deepEqual(copy(merge(before, { questionIds: ["one"] }, before)), {
    questionIds: ["one"],
  });
  assert.deepEqual(
    copy(
      merge(
        before,
        { questionIds: ["one"] },
        { questionIds: ["one", "two", "three"] },
      ),
    ),
    { questionIds: ["one", "three"] },
  );
});
await test("conflicting names, answers, and delete-vs-edit are reported", () => {
  assert.throws(
    () => merge(topic, { ...topic, title: "A" }, { ...topic, title: "B" }),
    MergeConflict,
  );
  assert.throws(
    () =>
      merge(
        draft,
        { ...draft, answers: { 0: 0 } },
        { ...draft, answers: { 0: 1 } },
      ),
    MergeConflict,
  );
  assert.throws(
    () => merge(topic, null, { ...topic, title: "Changed" }),
    MergeConflict,
  );
});
await test("answers to different questions merge without changing the deadline or source", () => {
  const result = merge(
    draft,
    { ...draft, answers: { 0: 0 } },
    { ...draft, answers: { 1: 1 } },
  );
  assert.deepEqual(copy(result.answers), { 0: 0, 1: 1 });
  assert.equal(result.deadline, draft.deadline);
  assert.deepEqual(result.questions, draft.questions);
});
await test("an unchanged machine receives newer remote data and duplicate edits are harmless", () => {
  assert.deepEqual(merge(topic, topic, { ...topic, title: "New" }), {
    ...topic,
    title: "New",
  });
  assert.deepEqual(
    merge(topic, { ...topic, title: "New" }, { ...topic, title: "New" }),
    { ...topic, title: "New" },
  );
  assert.equal(merge(2, 2, 3), 3);
});
await test("applying a remote topic preserves other topics and every practice/result snapshot", () => {
  store = new Map();
  const other = { ...topic, id: "user-topic-other", title: "Other" };
  store.set(topicKey, JSON.stringify({ version: 1, topics: [topic, other] }));
  const progress = {
    version: 1,
    grade: 2,
    results: {
      "timo:2:qualifier-02": { id: "timo:2:qualifier-02", score: 3, total: 25 },
    },
    drafts: { "timo:2:qualifier-01": draft },
  };
  store.set(progressKey, JSON.stringify(progress));
  applyRecord(topicRecord({ ...topic, title: "Updated" }));
  assert.equal(JSON.parse(store.get(topicKey)).topics[0].title, "Updated");
  assert.deepEqual(JSON.parse(store.get(topicKey)).topics[1], other);
  assert.deepEqual(JSON.parse(store.get(progressKey)), copy(progress));
  applyRecord(topicRecord(null));
  assert.deepEqual(JSON.parse(store.get(topicKey)).topics, [other]);
});
await test("incoming answers retain unrelated results, topics and exact deadlines", () => {
  const originalTopic = store.get(topicKey);
  applyRecord({
    kind: "draft",
    key: "timo:2:qualifier-01",
    payload: { ...draft, answers: { 0: 0, 1: 1 } },
  });
  const progress = JSON.parse(store.get(progressKey));
  assert.equal(progress.drafts["timo:2:qualifier-01"].deadline, draft.deadline);
  assert.deepEqual(progress.drafts["timo:2:qualifier-01"].answers, {
    0: 0,
    1: 1,
  });
  assert.equal(progress.results["timo:2:qualifier-02"].score, 3);
  assert.equal(store.get(topicKey), originalTopic);
});
await test("applying the acknowledged state does not emit feedback changes", () => {
  const record = localRecords().get(recordId("draft", "timo:2:qualifier-01"));
  let events = 0;
  const listener = () => events++;
  window.addEventListener("learning-cloud-applied", listener);
  applyRecord(record);
  assert.equal(events, 0);
  window.removeEventListener("learning-cloud-applied", listener);
});
await test("invalid remote records are rejected before replacing browser data", () => {
  const before = new Map(store);
  assert.throws(() =>
    applyRecord(topicRecord({ ...topic, questionIds: [123] })),
  );
  assert.throws(() =>
    validateRecord({ kind: "draft", key: "__proto__", payload: draft }),
  );
  assert.throws(() =>
    applyRecord({
      kind: "parent",
      key: "credential",
      payload: { version: 1, salt: "bad", digest: "bad" },
    }),
  );
  assert.deepEqual(store, before);
});
await test("source exam inventory remains 350 unique questions with received keys", () => {
  assert.equal(source.length, 350);
  assert.equal(new Set(source.map(questionId)).size, 350);
  assert(
    source.every(
      (q) => q.correct !== null || typeof q.correctText === "string",
    ),
  );
  assert(
    new TextEncoder().encode(JSON.stringify({ ...draft, questions: source }))
      .byteLength < 850000,
  );
  assert(equal({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }));
});
await test("curated topics expose only three approved source examples while all other questions await approval", () => {
  const progressBefore = store.get(progressKey);
  const topics = data.getExercises("timo", "topic", 2);
  const approved = topics.filter((topic) => topic.id !== "unassigned");
  assert.deepEqual(approved.map((topic) => topic.title), [
    "Tìm số thích hợp để điền vào chỗ trống",
    "Tính số đồ vật sau khi nhận hoặc cho",
    "Bài toán về tuổi",
  ]);
  assert.deepEqual(approved.map((topic) => topic.example.sourceNumber), [1, 2, 3]);
  for (const topic of approved) {
    assert.equal(topic.questionCount, 0);
    assert.deepEqual(data.getQuestions(2, "timo", topic), []);
    assert.equal(topic.examples.length, 1);
    assert.equal(topic.example.sourcePaper, "Đề số 1 · Vòng loại TIMO lớp 2");
  }
  const waiting = data.getQuestions(2, "timo", topics.find((topic) => topic.id === "unassigned"));
  assert.equal(waiting.length, 347);
  assert.equal(new Set([...waiting, ...approved.flatMap((topic) => topic.examples)].map(questionId)).size, 350);
  assert.equal(store.get(progressKey), progressBefore);
});
await rm(folder, { recursive: true, force: true });
