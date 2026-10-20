import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  House,
  SearchX,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import {
  CategoryCards,
  Dialog,
  ExerciseCard,
  Hero,
  Sidebar,
} from "./components";
import {
  CATEGORIES,
  getExercises,
  readSaved,
  SECTION_LABELS,
  STORAGE_KEY,
  storageId,
} from "./data";
import type { Category, Draft, Exercise, Result, Section } from "./data";
import { ThemeProvider, themeAsset, useTheme } from "./theme";

const Quiz = lazy(() => import("./Quiz"));
type ParentTab = "results" | "help";

export default function App() {
  return (
    <ThemeProvider>
      <LearningApp />
    </ThemeProvider>
  );
}

function LearningApp() {
  const { theme } = useTheme();
  const [saved, setSaved] = useState(readSaved);
  const [section, setSection] = useState<Section>("timo");
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [parentTab, setParentTab] = useState<ParentTab | null>(null);
  const [examsOpen, setExamsOpen] = useState(true);
  const [schoolOpen, setSchoolOpen] = useState(true);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [storageError, setStorageError] = useState(false);
  const grade = saved.grade;
  const isExam = section === "timo" || section === "asmo";
  const exerciseId = exercise ? storageId(section, grade, exercise.id) : "";

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [saved]);

  function navigate(next: Section, nextCategory: Category = "all") {
    setSection(next);
    setCategory(nextCategory);
    setSearch("");
    if (next === "timo" || next === "asmo") setExamsOpen(true);
    else if (next !== "home") setSchoolOpen(true);
    setMenuOpen(false);
  }

  const saveDraft = useCallback(
    (draft: Draft) => {
      if (!exerciseId) return;
      setSaved((s) => ({ ...s, drafts: { ...s.drafts, [exerciseId]: draft } }));
    },
    [exerciseId],
  );
  const finish = useCallback((result: Result) => {
    setSaved((s) => {
      const drafts = { ...s.drafts };
      delete drafts[result.id];
      return { ...s, drafts, results: { ...s.results, [result.id]: result } };
    });
  }, []);

  const sidebarProps = {
    grade,
    section,
    category,
    examsOpen,
    schoolOpen,
    onGrade: (n: number) => setSaved((s) => ({ ...s, grade: n })),
    onNavigate: navigate,
    onToggleExams: () => setExamsOpen((v) => !v),
    onToggleSchool: () => setSchoolOpen((v) => !v),
  };
  const normalized = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .toLowerCase();
  const exercises = getExercises(section, category).filter((e) =>
    normalized(e.title).includes(normalized(search.trim())),
  );
  const results = Object.values(saved.results).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const selectedTitle =
    category === "all"
      ? `Tất cả đề ${SECTION_LABELS[section]}`
      : `${CATEGORIES.find((c) => c.id === category)?.title} ${SECTION_LABELS[section]}`;

  return (
    <div className={`app-layout theme-${theme}`}>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <div className="desktop-sidebar">
        <Sidebar {...sidebarProps} />
      </div>
      <div className="main-shell">
        <Hero
          search={search}
          onSearch={setSearch}
          onMenu={() => setMenuOpen(true)}
          onParent={() => setParentTab("results")}
        />
        <main id="main-content" className="content">
          <div className="breadcrumbs" aria-label="Đường dẫn">
            <button aria-label="Trang chủ" onClick={() => navigate("home")}>
              <House size={18} fill="currentColor" />
            </button>
            <ChevronRight size={15} />
            <button onClick={() => setMenuOpen(true)}>Lớp {grade}</button>
            {section !== "home" ? (
              <>
                <span>/</span>
                <span>{isExam ? "Các kỳ thi" : "Báo bài của trường"}</span>
                <span>/</span>
                <span aria-current="page">{SECTION_LABELS[section]}</span>
              </>
            ) : null}
          </div>
          {storageError ? (
            <div className="storage-warning" role="alert">
              Trình duyệt không cho phép lưu dữ liệu. Kết quả chỉ được giữ đến
              khi tải lại trang.
            </div>
          ) : null}
          {section === "home" ? (
            <>
              <h1>Hôm nay bé khám phá gì?</h1>
              <p className="home-description">
                Chọn một hành trình và cùng{" "}
                {theme === "space" ? "nhà du hành" : "Khủng Long"} học thêm điều
                mới nhé!
              </p>
              <div className="home-grid">
                <button onClick={() => navigate("timo")}>
                  <img
                    src={themeAsset(theme, "dino")}
                    alt={
                      theme === "space"
                        ? "Nhà du hành khám phá vũ trụ"
                        : "Khủng long khám phá"
                    }
                  />
                  <span>
                    <Trophy size={24} />
                    <strong>Các kỳ thi</strong>
                    <ArrowRight size={21} />
                  </span>
                  <p>Luyện tập cùng TIMO và ASMO</p>
                </button>
                <button onClick={() => navigate("toan")}>
                  <img
                    src={themeAsset(theme, "triceratops")}
                    alt={
                      theme === "space"
                        ? "Nhà du hành đọc sách"
                        : "Khủng long tìm tòi"
                    }
                  />
                  <span>
                    <BookOpen size={24} />
                    <strong>Báo bài của trường</strong>
                    <ArrowRight size={21} />
                  </span>
                  <p>Toán, Tiếng Việt, ESL, Math và Science</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>{isExam ? selectedTitle : SECTION_LABELS[section]}</h1>
              {isExam ? (
                <CategoryCards
                  category={category}
                  onSelect={(c) => {
                    setCategory(c);
                    setSearch("");
                  }}
                />
              ) : (
                <p className="subject-description">
                  Cùng ôn bài và khám phá kiến thức {SECTION_LABELS[section]}{" "}
                  lớp {grade} nhé!
                </p>
              )}
              <div className="list-heading">
                <h2>
                  {search.trim()
                    ? "Kết quả tìm kiếm"
                    : category === "topic"
                      ? "Chọn chủ đề"
                      : isExam
                        ? "Danh sách đề"
                        : "Bài tập của bé"}
                </h2>
                {category !== "all" ? (
                  <button
                    className="text-button"
                    onClick={() => {
                      setCategory("all");
                      setSearch("");
                    }}
                  >
                    <ArrowLeft size={16} />
                    Tất cả đề
                  </button>
                ) : null}
              </div>
              {exercises.length ? (
                <div className="exercise-grid">
                  {exercises.map((e) => {
                    const id = storageId(section, grade, e.id);
                    return (
                      <ExerciseCard
                        key={id}
                        exercise={e}
                        grade={grade}
                        result={saved.results[id]}
                        hasDraft={Boolean(saved.drafts[id])}
                        onOpen={() => setExercise(e)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <SearchX size={40} />
                  <h3>Chưa tìm thấy bài tập</h3>
                  <p>Thử một từ khóa khác, ví dụ “vòng loại” nhé.</p>
                  <button
                    className="secondary-button"
                    onClick={() => setSearch("")}
                  >
                    Xem tất cả bài tập
                  </button>
                </div>
              )}
              <div className="sample-footer">
                <ShieldCheck size={16} />
                <span>
                  Nội dung luyện tập mẫu · Kết quả lưu trên thiết bị của bạn
                </span>
              </div>
            </>
          )}
        </main>
      </div>
      {menuOpen ? (
        <Dialog
          title="Danh mục học tập"
          onClose={() => setMenuOpen(false)}
          className="drawer"
        >
          <Sidebar {...sidebarProps} onClose={() => setMenuOpen(false)} />
        </Dialog>
      ) : null}
      {parentTab ? (
        <Dialog
          title="Góc phụ huynh"
          onClose={() => setParentTab(null)}
          className="parent-dialog"
        >
          <div className="parent-title-icon">
            <GraduationCap size={30} />
          </div>
          <h2>Góc phụ huynh</h2>
          <p className="parent-subtitle">Cùng con lớn lên qua từng bài học.</p>
          <div className="parent-tabs">
            <button
              className={parentTab === "results" ? "active" : ""}
              onClick={() => setParentTab("results")}
            >
              Kết quả của bé
            </button>
            <button
              className={parentTab === "help" ? "active" : ""}
              onClick={() => setParentTab("help")}
            >
              Hướng dẫn
            </button>
          </div>
          {parentTab === "results" ? (
            <>
              <p className="local-profile">
                Hồ sơ trên trình duyệt này · {results.length} bài đã làm
              </p>
              {results.length ? (
                <div className="result-list">
                  {results.map((r) => (
                    <div className="result-row" key={r.id}>
                      <span className="result-list-icon">
                        <Trophy size={23} />
                      </span>
                      <div>
                        <strong>{r.title}</strong>
                        <span>
                          {SECTION_LABELS[r.section]} · Lớp {r.grade} ·{" "}
                          {new Intl.DateTimeFormat("vi-VN", {
                            dateStyle: "short",
                          }).format(new Date(r.date))}
                        </span>
                      </div>
                      <b>
                        {r.score}/{r.total}
                      </b>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <BookOpen size={39} />
                  <h3>Hành trình của bé sắp bắt đầu</h3>
                  <p>
                    Hãy chọn một bài tập. Kết quả sẽ xuất hiện ở đây khi bé nộp
                    bài.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => setParentTab(null)}
                  >
                    Khám phá bài tập
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
              <p className="sample-notice">
                Mỗi bài hiển thị kết quả lần làm gần nhất. Chưa có tài khoản
                hoặc đồng bộ giữa các thiết bị.
              </p>
            </>
          ) : (
            <div className="help-content">
              <h3>Đồng hành cùng bé</h3>
              <ol>
                <li>
                  <strong>Chọn lớp của bé</strong>
                  <p>Dùng mục “Chọn lớp” để xem bài tập dành cho lớp 1–5.</p>
                </li>
                <li>
                  <strong>Chọn hành trình học</strong>
                  <p>
                    Khám phá TIMO, ASMO hoặc các môn trong “Báo bài của trường”.
                    Các bài hiện tại là nội dung mẫu, chưa phải đề thi hay bài
                    báo chính thức của trường.
                  </p>
                </li>
                <li>
                  <strong>Làm bài và xem lời giải</strong>
                  <p>
                    Bé có 15 phút cho mỗi bài. Sau khi nộp, bé có thể xem đáp án
                    và lời giải từng câu.
                  </p>
                </li>
                <li>
                  <strong>Theo dõi sự tiến bộ</strong>
                  <p>
                    Kết quả và câu trả lời đang làm được lưu trên trình duyệt
                    này. Xóa dữ liệu trình duyệt sẽ xóa hồ sơ; không dùng dữ
                    liệu này cho thông tin nhạy cảm.
                  </p>
                </li>
              </ol>
            </div>
          )}
        </Dialog>
      ) : null}
      {exercise ? (
        <Suspense
          fallback={
            <div className="loading-overlay" role="status">
              Đang chuẩn bị bài tập…
            </div>
          }
        >
          <Quiz
            key={exerciseId}
            id={exerciseId}
            section={section}
            grade={grade}
            exercise={exercise}
            draft={saved.drafts[exerciseId]}
            onSave={saveDraft}
            onFinish={finish}
            onClose={() => setExercise(null)}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
