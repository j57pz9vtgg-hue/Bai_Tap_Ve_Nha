export type Section =
  "home" | "timo" | "asmo" | "toan" | "vietnamese" | "esl" | "math" | "science";
export type Category = "all" | "qualifier" | "national" | "topic";
export type Exercise = {
  id: string;
  title: string;
  category: Category;
  topic?: number;
  exampleOnly?: boolean;
};
export type Question = {
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

// Only original exercises and answer keys supplied by the owner may be added here.
// The catalog stays empty until real source material is provided.
export function getExercises(
  section: Section,
  category: Category,
  grade: number = 2,
): Exercise[] {
  if (
    section === "timo" &&
    grade === 2 &&
    (category === "topic" || category === "all")
  ) {
    return [
      {
        id: "age-problem",
        title: "Bài toán về tuổi (Age problem)",
        category: "topic",
        exampleOnly: true,
      },
      {
        id: "date-problem",
        title: "Bài toán về ngày tháng (Date Problem)",
        category: "topic",
        exampleOnly: true,
      },
      {
        id: "problem-type-1",
        title: "Dạng bài 1 (Problem type 1)",
        category: "topic",
        exampleOnly: true,
      },
    ];
  }
  return [];
}

export function getQuestions(
  _grade: number,
  _section: Section,
  _exercise: Exercise,
): Question[] {
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
