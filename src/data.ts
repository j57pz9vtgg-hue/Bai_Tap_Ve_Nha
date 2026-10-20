export type Section =
  "home" | "timo" | "asmo" | "toan" | "vietnamese" | "esl" | "math" | "science";
export type Category = "all" | "qualifier" | "national" | "topic";
export type Exercise = {
  id: string;
  title: string;
  category: Category;
  image: string;
  topic?: number;
};
export type Question = {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
};
export type Result = {
  id: string;
  title: string;
  grade: number;
  score: number;
  total: number;
  date: string;
  section: Section;
};
export type Draft = {
  answers: Record<number, number>;
  index: number;
  deadline: number;
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

export function getExercises(section: Section, category: Category): Exercise[] {
  if (section === "timo" || section === "asmo") {
    if (category === "topic")
      return [
        {
          id: "logic",
          title: "Tư duy logic",
          category: "topic",
          image: "triceratops",
          topic: 0,
        },
        {
          id: "numbers",
          title: "Khám phá số học",
          category: "topic",
          image: "dino",
          topic: 1,
        },
        {
          id: "shapes",
          title: "Thế giới hình học",
          category: "topic",
          image: "hero",
          topic: 2,
        },
      ];
    const exams: Exercise[] = [
      {
        id: "qualifier-01",
        title: "Đề vòng loại 01",
        category: "qualifier",
        image: "dino",
      },
      {
        id: "qualifier-02",
        title: "Đề vòng loại 02",
        category: "qualifier",
        image: "triceratops",
      },
      {
        id: "national-01",
        title: "Đề Quốc gia 01",
        category: "national",
        image: "hero",
      },
    ];
    return category === "all"
      ? exams
      : exams.filter((exam) => exam.category === category);
  }
  const titles: Record<string, string[]> = {
    toan: ["Cùng bé tính nhẩm", "Thử tài giải toán", "Khám phá hình học"],
    vietnamese: ["Em yêu tiếng Việt", "Từ ngữ quanh em", "Đọc hiểu cùng bé"],
    esl: ["Hello, little explorer!", "Animals around us", "Colors & numbers"],
    math: ["Fun with numbers", "Number adventures", "Shapes around us"],
    science: ["Thế giới động vật", "Thiên nhiên kỳ thú", "Khám phá khoa học"],
  };
  return (titles[section] ?? []).map((title, i) => ({
    id: `lesson-${i}`,
    title,
    category: "all",
    image: ["dino", "triceratops", "hero"][i],
    topic: i,
  }));
}

function choice(
  text: string,
  correct: number | string,
  wrong: (number | string)[],
  explanation: string,
  seed: number,
): Question {
  const answer = String(correct);
  const alternatives = [
    ...new Set(wrong.map(String).filter((v) => v !== answer)),
  ].slice(0, 3);
  let pad = 1;
  while (alternatives.length < 3) {
    const value = String(Number(correct) + pad++);
    if (value !== answer && !alternatives.includes(value))
      alternatives.push(value);
  }
  const position = seed % 4;
  const options = [...alternatives];
  options.splice(position, 0, answer);
  return { text, options, correct: position, explanation };
}

export function getQuestions(
  grade: number,
  section: Section,
  exercise: Exercise,
): Question[] {
  const variant = exercise.id.includes("02") ? 2 : 0;
  const advanced = exercise.category === "national" ? 2 : 0;
  const n = grade * 2 + variant + advanced;
  const english = section === "math";
  if (section === "vietnamese")
    return [
      {
        text: "Từ nào dưới đây chỉ một loài vật?",
        options: ["Cây bàng", "Chú mèo", "Quyển vở", "Bầu trời"],
        correct: 1,
        explanation:
          "Mèo là một loài vật. Cây bàng là cây cối, quyển vở là đồ vật.",
      },
      {
        text: "Từ nào trái nghĩa với “cao”?",
        options: ["Xa", "Rộng", "Thấp", "Dài"],
        correct: 2,
        explanation: "“Cao” và “thấp” là hai từ có nghĩa trái ngược nhau.",
      },
      {
        text: "Điền từ phù hợp: “Em … bài tập về nhà.”",
        options: ["làm", "bay", "ngủ", "chảy"],
        correct: 0,
        explanation: "Câu đúng là: “Em làm bài tập về nhà.”",
      },
      {
        text: "Câu nào được viết đúng chính tả?",
        options: [
          "em yêu trường em.",
          "Em yêu trường em",
          "em Yêu trường em.",
          "Em yêu trường em.",
        ],
        correct: 3,
        explanation: "Đầu câu cần viết hoa chữ E và cuối câu cần có dấu chấm.",
      },
      {
        text: "Đọc: “Mỗi sáng, Lan tưới nước cho cây. Cây lớn lên xanh tốt.” Lan làm gì mỗi sáng?",
        options: ["Hái hoa", "Tưới nước cho cây", "Đọc sách", "Chơi bóng"],
        correct: 1,
        explanation: "Bài đọc cho biết: “Mỗi sáng, Lan tưới nước cho cây.”",
      },
    ];
  if (section === "esl")
    return [
      {
        text: "“Cat” có nghĩa là gì?",
        options: ["Con chó", "Con cá", "Con mèo", "Con chim"],
        correct: 2,
        explanation:
          "Cat = con mèo. Dog = con chó. Fish = con cá. Bird = con chim.",
      },
      {
        text: "What color is a banana? (Quả chuối chín có màu gì?)",
        options: ["Yellow", "Blue", "Purple", "Red"],
        correct: 0,
        explanation: "A ripe banana is yellow. Quả chuối chín có màu vàng.",
      },
      {
        text: "Điền từ: “One, two, …, four.”",
        options: ["Five", "Six", "Ten", "Three"],
        correct: 3,
        explanation: "One, two, three, four là một, hai, ba, bốn.",
      },
      {
        text: "Em nói gì khi chào bạn?",
        options: ["Goodbye!", "Hello!", "Good night!", "Thank you!"],
        correct: 1,
        explanation: "Hello! là lời chào khi gặp nhau.",
      },
      {
        text: "Which animal can fly? (Con vật nào biết bay?)",
        options: ["A cat", "A dog", "A bird", "A fish"],
        correct: 2,
        explanation: "A bird can fly. Chim có thể bay.",
      },
    ];
  if (section === "science")
    return [
      {
        text: "Cây xanh cần gì để phát triển?",
        options: [
          "Chỉ bóng tối",
          "Ánh sáng, nước và không khí",
          "Chỉ đá",
          "Chỉ cát khô",
        ],
        correct: 1,
        explanation:
          "Cây cần ánh sáng để quang hợp, nước và không khí để sống và phát triển.",
      },
      {
        text: "Con vật nào đẻ trứng?",
        options: ["Mèo", "Chó", "Gà", "Bò"],
        correct: 2,
        explanation: "Gà đẻ trứng. Mèo, chó và bò là các loài thú đẻ con.",
      },
      {
        text: "Đâu là nguồn ánh sáng tự nhiên?",
        options: ["Mặt Trời", "Đèn pin", "Bóng đèn", "Đèn bàn"],
        correct: 0,
        explanation:
          "Mặt Trời tự phát sáng trong tự nhiên. Những loại đèn còn lại do con người tạo ra.",
      },
      {
        text: "Trước khi ăn, bé nên làm gì?",
        options: [
          "Chơi với đất",
          "Chạy thật nhanh",
          "Chạm vào rác",
          "Rửa tay bằng xà phòng",
        ],
        correct: 3,
        explanation:
          "Rửa tay bằng xà phòng giúp loại bỏ vi khuẩn và bảo vệ sức khỏe.",
      },
      {
        text: "Nước biến thành đá khi được làm gì?",
        options: [
          "Đun sôi",
          "Làm lạnh đến đóng băng",
          "Khuấy đều",
          "Đổ vào cốc",
        ],
        correct: 1,
        explanation:
          "Khi được làm lạnh đến nhiệt độ đóng băng, nước chuyển từ thể lỏng sang thể rắn.",
      },
    ];
  const questions = [
    choice(
      english
        ? `What is ${n + 3} + ${grade + 2}?`
        : `Bé hãy tính: ${n + 3} + ${grade + 2} = ?`,
      n + grade + 5,
      [n + grade + 4, n + grade + 6, n + grade + 7],
      `${n + 3} + ${grade + 2} = ${n + grade + 5}. Bé có thể đếm thêm ${grade + 2} từ số ${n + 3}.`,
      1,
    ),
    choice(
      english
        ? `There are ${n + 6} apples. You eat 3. How many are left?`
        : `Khủng Long có ${n + 6} quả táo. Bạn ấy ăn 3 quả. Hỏi còn lại bao nhiêu quả táo?`,
      n + 3,
      [n + 2, n + 4, n + 9],
      `Ta lấy số táo ban đầu trừ đi số táo đã ăn: ${n + 6} − 3 = ${n + 3} quả.`,
      2,
    ),
    choice(
      english
        ? `Find the next number: ${n}, ${n + 2}, ${n + 4}, ${n + 6}, …`
        : `Số tiếp theo trong dãy là số nào?\n${n}, ${n + 2}, ${n + 4}, ${n + 6}, …`,
      n + 8,
      [n + 7, n + 9, n + 10],
      `Mỗi số lớn hơn số đứng trước 2 đơn vị. Vậy số tiếp theo là ${n + 6} + 2 = ${n + 8}.`,
      0,
    ),
    choice(
      english
        ? "How many sides does a triangle have?"
        : "Một hình tam giác có bao nhiêu cạnh?",
      3,
      [2, 4, 5],
      "Hình tam giác có 3 cạnh và 3 đỉnh.",
      3,
    ),
    grade === 1
      ? choice(
          "Số nào lớn nhất trong các số sau?",
          9,
          [3, 6, 8],
          "Trong các số 3, 6, 8, 9 thì số 9 là số lớn nhất.",
          0,
        )
      : choice(
          english
            ? `What is 3 × ${grade + 1}?`
            : `Có 3 chiếc giỏ, mỗi giỏ có ${grade + 1} quả cam. Có tất cả bao nhiêu quả cam?`,
          3 * (grade + 1),
          [3 * (grade + 1) - 1, 3 + grade + 1, 3 * (grade + 1) + 2],
          `Lấy số cam mỗi giỏ nhân với số giỏ: ${grade + 1} × 3 = ${3 * (grade + 1)} quả.`,
          1,
        ),
    choice(
      english
        ? `Fill in the blank: … + ${grade + 1} = ${n + 5}`
        : `Điền số còn thiếu: … + ${grade + 1} = ${n + 5}`,
      n + 4 - grade,
      [n + 3 - grade, n + 5 - grade, n + 6],
      `Để tìm số còn thiếu, ta lấy ${n + 5} − ${grade + 1} = ${n + 4 - grade}.`,
      3,
    ),
    choice(
      english
        ? "How many legs do 2 birds have in total?"
        : "Hai chú chim có tất cả bao nhiêu chiếc chân?",
      4,
      [2, 6, 8],
      "Mỗi chú chim có 2 chân. Hai chú chim có 2 + 2 = 4 chân.",
      2,
    ),
    choice(
      english
        ? `Which number is between ${n + 4} and ${n + 6}?`
        : `Số tự nhiên nào nằm giữa ${n + 4} và ${n + 6}?`,
      n + 5,
      [n + 3, n + 7, n + 8],
      `Ba số tự nhiên liên tiếp là ${n + 4}, ${n + 5}, ${n + 6}. Số ở giữa là ${n + 5}.`,
      0,
    ),
  ];
  if (exercise.topic === 2)
    return [
      questions[3],
      choice(
        english
          ? "How many sides does a square have?"
          : "Một hình vuông có bao nhiêu cạnh?",
        4,
        [3, 5, 6],
        "Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.",
        1,
      ),
      {
        text: english
          ? "Which shape has no corners?"
          : "Hình nào dưới đây không có góc?",
        options: ["Hình tam giác", "Hình vuông", "Hình tròn", "Hình chữ nhật"],
        correct: 2,
        explanation: "Hình tròn có đường bao cong khép kín và không có góc.",
      },
      choice(
        english
          ? "How many corners does a rectangle have?"
          : "Một hình chữ nhật có bao nhiêu góc?",
        4,
        [2, 3, 6],
        "Hình chữ nhật có 4 góc, tất cả đều là góc vuông.",
        3,
      ),
      {
        text: english
          ? "Which shape does a clock face usually have?"
          : "Mặt đồng hồ tròn thường có dạng hình gì?",
        options: ["Hình tròn", "Hình tam giác", "Hình vuông", "Hình chữ nhật"],
        correct: 0,
        explanation:
          "Mặt đồng hồ tròn có dạng hình tròn, không có cạnh thẳng hay góc.",
      },
    ];
  if (exercise.topic === 0)
    return [
      questions[2],
      questions[7],
      questions[5],
      questions[6],
      questions[0],
    ];
  return questions;
}

export function storageId(section: Section, grade: number, exerciseId: string) {
  return `${section}:${grade}:${exerciseId}`;
}
export const STORAGE_KEY = "dino-homework:v1";
export function readSaved(): Saved {
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
