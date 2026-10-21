import { TIMO_GRADE2_QUALIFIER1 } from "./content/timo-grade2-qualifier1";
import { TIMO_GRADE2_QUALIFIER2 } from "./content/timo-grade2-qualifier2";
const ALL_QUESTIONS = [...TIMO_GRADE2_QUALIFIER1, ...TIMO_GRADE2_QUALIFIER2];
// Classification follows the owner’s newly supplied numeric-sequence example.
for (const question of ALL_QUESTIONS) {
  if (question.sourceNumber === 1 || question.sourceNumber === 12)
    question.topicId = "topic-01";
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
  questionCount?: number;
};
export type QuestionDiagram =
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
  ];
  const topics = [
    {
      id: "topic-01",
      title: "Chủ đề 1",
      category: "topic" as const,
      example: TIMO_GRADE2_QUALIFIER1[0],
      exampleOnly: true,
    },
    { id: "unassigned", title: "Chưa có chủ đề", category: "topic" as const },
  ].map((topic) => ({
    ...topic,
    questionCount: ALL_QUESTIONS.filter((q) => q.topicId === topic.id).length,
  }));
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
