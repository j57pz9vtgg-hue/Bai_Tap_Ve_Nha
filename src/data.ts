import { TIMO_GRADE2_QUALIFIER1 } from "./content/timo-grade2-qualifier1";
import { TIMO_GRADE2_QUALIFIER2 } from "./content/timo-grade2-qualifier2";
import { TIMO_GRADE2_QUALIFIER3 } from "./content/timo-grade2-qualifier3";
const ALL_QUESTIONS = [
  ...TIMO_GRADE2_QUALIFIER1,
  ...TIMO_GRADE2_QUALIFIER2,
  ...TIMO_GRADE2_QUALIFIER3,
];
// Classify the three supplied papers against the owner's teaching examples.
// Keep stable topic IDs so existing attempts/results remain attached to topic 1.
const TOPIC_BY_SOURCE_NUMBER: Record<number, string> = {
  1: "topic-01",
  12: "topic-01",
  2: "topic-02",
  3: "topic-03",
  4: "topic-04",
  5: "topic-05",
  6: "topic-06",
  7: "topic-07",
  8: "topic-08",
  9: "topic-09",
  10: "topic-10",
  11: "topic-11",
  13: "topic-12",
  14: "topic-13",
  15: "topic-14",
  16: "topic-15",
  17: "topic-16",
  18: "topic-17",
  19: "topic-18",
  20: "topic-19",
  21: "topic-20",
  22: "topic-21",
  23: "topic-22",
  24: "topic-23",
  25: "topic-24",
};
// These mappings were reviewed for the three supplied papers only.
// A future paper must be reviewed before its questions are assigned.
const CLASSIFIED_PAPERS = new Set([
  "Đề số 1 · Vòng loại TIMO lớp 2",
  "Đề số 2 · Vòng loại TIMO lớp 2",
  "Đề số 3 · Vòng loại TIMO lớp 2",
]);
for (const question of ALL_QUESTIONS) {
  question.topicId = CLASSIFIED_PAPERS.has(question.sourcePaper ?? "")
    ? (TOPIC_BY_SOURCE_NUMBER[question.sourceNumber ?? 0] ?? "unassigned")
    : "unassigned";
}
export type Section =
  "home" | "timo" | "asmo" | "toan" | "vietnamese" | "esl" | "math" | "science";
export type Category = "all" | "qualifier" | "national" | "topic";
export type Exercise = {
  id: string;
  title: string;
  category: Category;
  topic?: number;
  exampleOnly?: boolean;
  example?: Question;
  examples?: Question[];
  questionCount?: number;
};
export type QuestionDiagram =
  | `p3-${"sequence" | "suns" | "backpack" | "chain" | "addition" | "sequence12" | "operations" | "operators" | "squares" | "shapes" | "cubes-right" | "segments" | "cubes-count" | "numbers" | "routes"}`
  | `p2-${"sequence" | "flowers" | "tree" | "chain" | "addition" | "sequence12" | "operations" | "operators" | "squares" | "shapes" | "cubes-front" | "segments" | "cubes-count" | "numbers" | "routes"}`
  | "sequence-1"
  | "hat-groups"
  | "bell-equation"
  | "operation-chain"
  | "letter-addition"
  | "sequence-12"
  | "operation-boxes"
  | "missing-operators"
  | "square-lines"
  | "shape-pattern"
  | "cubes-front"
  | "boat-segments"
  | "cubes-count"
  | "descending-numbers"
  | "food-choices";
export type Question = {
  translation?: string;
  diagram?: QuestionDiagram;
  strand?: string;
  topicId?: string;
  sourcePaper?: string;
  sourceNumber?: number;
  text: string;
  options: string[];
  correct: number | null;
  explanation: string | null;
};
export type Result = {
  id: string;
  title: string;
  grade: number;
  score: number;
  total: number;
  date: string;
  section: Section;
  answers?: Record<number, number>;
  elapsedSeconds?: number;
  questions?: Question[];
};
export type Draft = {
  answers: Record<number, number>;
  index: number;
  deadline: number;
  questions?: Question[];
};
export type Saved = {
  version: 1;
  grade: number;
  results: Record<string, Result>;
  drafts: Record<string, Draft>;
};

export const SECTION_LABELS: Record<Section, string> = {
  home: "Trang chủ",
  timo: "TIMO",
  asmo: "ASMO",
  toan: "Toán",
  vietnamese: "Tiếng Việt",
  esl: "ESL",
  math: "Math",
  science: "Science",
};
export const CATEGORIES = [
  {
    id: "qualifier" as const,
    title: "Đề vòng loại",
    description: "Làm quen và rèn luyện\nđể tự tin chinh phục kỳ thi.",
    icon: "🏆",
    tone: "teal",
  },
  {
    id: "national" as const,
    title: "Đề Quốc gia",
    description: "Thử thách với các đề thi\ncấp Quốc gia.",
    icon: "🏅",
    tone: "gold",
  },
  {
    id: "topic" as const,
    title: "Luyện theo chủ đề",
    description: "Ôn luyện theo chủ đề,\nkiến thức trọng tâm.",
    icon: "📚",
    tone: "green",
  },
];

// Content and answer keys are accepted only from the owner.
export function getExercises(
  section: Section,
  category: Category,
  grade = 2,
): Exercise[] {
  if (section !== "timo" || grade !== 2) return [];
  const exam: Exercise = {
    id: "qualifier-01",
    title: "Đề vòng loại 01",
    category: "qualifier",
    questionCount: TIMO_GRADE2_QUALIFIER1.length,
  };
  const exams = [
    exam,
    {
      id: "qualifier-02",
      title: "Đề vòng loại 02",
      category: "qualifier" as const,
      questionCount: TIMO_GRADE2_QUALIFIER2.length,
    },
    {
      id: "qualifier-03",
      title: "Đề vòng loại 03",
      category: "qualifier" as const,
      questionCount: TIMO_GRADE2_QUALIFIER3.length,
    },
  ];
  const topics = [
    {
      id: "topic-01",
      title: "Dãy số và quy luật",
      category: "topic" as const,
      example: TIMO_GRADE2_QUALIFIER1[0],
      examples: [TIMO_GRADE2_QUALIFIER1[0], TIMO_GRADE2_QUALIFIER1[11]],
      exampleOnly: true,
    },
    ...[
      { id: "topic-02", title: "Bài toán cộng có lời văn", sourceNumber: 2 },
      { id: "topic-03", title: "Bài toán tính tuổi", sourceNumber: 3 },
      { id: "topic-04", title: "Quy luật số lượng hình", sourceNumber: 4 },
      { id: "topic-05", title: "Ngày và thứ trong tuần", sourceNumber: 5 },
      { id: "topic-06", title: "Tính tổng bằng cách ghép số", sourceNumber: 6 },
      {
        id: "topic-07",
        title: "Tìm số bị che trong phép tính",
        sourceNumber: 7,
      },
      { id: "topic-08", title: "Tính biểu thức cộng, trừ", sourceNumber: 8 },
      { id: "topic-09", title: "Tính ngược theo sơ đồ", sourceNumber: 9 },
      { id: "topic-10", title: "Tìm chữ số trong phép cộng", sourceNumber: 10 },
      { id: "topic-11", title: "Đếm số theo tổng chữ số", sourceNumber: 11 },
      { id: "topic-12", title: "Đếm kết quả chẵn, lẻ", sourceNumber: 13 },
      { id: "topic-13", title: "Điền dấu cộng, trừ", sourceNumber: 14 },
      { id: "topic-14", title: "Cân bằng số lượng", sourceNumber: 15 },
      { id: "topic-15", title: "Đếm hình vuông", sourceNumber: 16 },
      { id: "topic-16", title: "Quy luật dãy hình", sourceNumber: 17 },
      {
        id: "topic-17",
        title: "Đếm hình vuông theo hướng nhìn",
        sourceNumber: 18,
      },
      { id: "topic-18", title: "Đếm đoạn thẳng", sourceNumber: 19 },
      { id: "topic-19", title: "Đếm khối lập phương", sourceNumber: 20 },
      { id: "topic-20", title: "Sắp xếp số và tìm thứ hạng", sourceNumber: 21 },
      {
        id: "topic-21",
        title: "Lập số chẵn không lặp chữ số",
        sourceNumber: 22,
      },
      {
        id: "topic-22",
        title: "Lập hai số có tổng nhỏ nhất",
        sourceNumber: 23,
      },
      { id: "topic-23", title: "Đếm số cách kết hợp", sourceNumber: 24 },
      { id: "topic-24", title: "Mua hàng nhận quà tặng", sourceNumber: 25 },
    ].map(({ id, title, sourceNumber }) => ({
      id,
      title,
      category: "topic" as const,
      example: TIMO_GRADE2_QUALIFIER1.find(
        (q) => q.sourceNumber === sourceNumber,
      ),
      exampleOnly: true,
    })),
    { id: "unassigned", title: "Chưa có chủ đề", category: "topic" as const },
  ]
    .map((topic) => ({
      ...topic,
      questionCount: ALL_QUESTIONS.filter((q) => q.topicId === topic.id).length,
    }))
    .filter((topic) => topic.questionCount > 0);
  if (category === "qualifier") return exams;
  if (category === "topic") return topics;
  if (category === "all") return [...exams, ...topics];
  return [];
}

export function getQuestions(
  grade: number,
  section: Section,
  exercise: Exercise,
): Question[] {
  if (section !== "timo" || grade !== 2) return [];
  if (exercise.id === "qualifier-01") return TIMO_GRADE2_QUALIFIER1;
  if (exercise.id === "qualifier-02") return TIMO_GRADE2_QUALIFIER2;
  if (exercise.id === "qualifier-03") return TIMO_GRADE2_QUALIFIER3;
  if (exercise.category === "topic")
    return ALL_QUESTIONS.filter((q) => q.topicId === exercise.id);
  return [];
}
export const getPracticeQuestions = getQuestions;

export function storageId(section: Section, grade: number, exerciseId: string) {
  return `${section}:${grade}:${exerciseId}`;
}
export const STORAGE_KEY = "dino-homework:v1";
const CONTENT_RESET_KEY = "homework-real-content-reset:v1";
export function readSaved(): Saved {
  // Remove local demo attempts once, without touching either password or the theme.
  try {
    if (localStorage.getItem(CONTENT_RESET_KEY) !== "done") {
      const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      const grade =
        Number.isInteger(previous?.grade) &&
        previous.grade >= 1 &&
        previous.grade <= 5
          ? previous.grade
          : 2;
      const clean: Saved = { version: 1, grade, results: {}, drafts: {} };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
      localStorage.setItem(CONTENT_RESET_KEY, "done");
      return clean;
    }
  } catch {
    return { version: 1, grade: 2, results: {}, drafts: {} };
  }
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      parsed?.version === 1 &&
      parsed.results &&
      parsed.drafts &&
      Number.isInteger(parsed.grade) &&
      parsed.grade >= 1 &&
      parsed.grade <= 5
    )
      return parsed;
  } catch {
    /* An unavailable or corrupted store starts a fresh local profile. */
  }
  return { version: 1, grade: 2, results: {}, drafts: {} };
}
