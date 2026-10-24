import { CLOUD_APPLIED, writeLearningStorage } from "./cloud/storage";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BookOpen,
  Search,
  UsersRound,
  X,
  ArrowRight,
  Palette,
  LogOut,
} from "lucide-react";
import { Dialog, ExerciseCard, StudyFilters, publicAsset } from "./components";
import {
  CATEGORIES,
  getExercises,
  readSaved,
  SECTION_LABELS,
  STORAGE_KEY,
  storageId,
} from "./data";
import type { Category, Draft, Exercise, Result, Section } from "./data";

import { ThemePicker } from "./ThemePicker";
import { THEMES, useLearningTheme } from "./theme";
import { useAppAccess } from "./AccessGate";
import { ParentPassword } from "./ParentPassword";

const CloudSync = lazy(() => import("./cloud/CloudSync"));
const TopicPreview = lazy(() => import("./TopicPreview"));
const Quiz = lazy(() => import("./Quiz"));
const UnassignedWorkspace = lazy(() => import("./UnassignedWorkspace"));
type Selection = {
  exercise: Exercise;
  section: Section;
  grade: number;
  mode: "play" | "result" | "example";
};

export default function App() {
  const { theme } = useLearningTheme();
  const { logout } = useAppAccess();
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [, refreshTopics] = useState(0);
  const mastheadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = mastheadRef.current;
    if (!element) return;
    const updateHeight = () =>
      document.documentElement.style.setProperty(
        "--catalog-masthead-height",
        `${element.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    updateHeight();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty(
        "--catalog-masthead-height",
      );
    };
  }, []);
  const [saved, setSaved] = useState(readSaved);
  const [section, setSection] = useState<Section>("timo");
  const [schoolSubject, setSchoolSubject] = useState<Section>("toan");
  const [category, setCategory] = useState<Category>("qualifier");
  const [search, setSearch] = useState("");
  const [parentOpen, setParentOpen] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [storageError, setStorageError] = useState(false);
  const grade = saved.grade;
  const isExam = section === "timo" || section === "asmo";
  const exerciseId = selection
    ? storageId(selection.section, selection.grade, selection.exercise.id)
    : "";
  const normalized = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase();
  const exercises = getExercises(section, category, grade).filter((e) =>
    normalized(e.title).includes(normalized(search.trim())),
  );
  const categoryTitle =
    category === "all"
      ? "Tất cả đề"
      : (CATEGORIES.find((c) => c.id === category)?.title ?? "Bài tập");
  const title = isExam
    ? `${categoryTitle} ${SECTION_LABELS[section]}`
    : category === "topic"
      ? `Luyện theo chủ đề ${SECTION_LABELS[section]}`
      : `Bài tập ${SECTION_LABELS[section]}`;

  useEffect(() => {
    try {
      writeLearningStorage(STORAGE_KEY, JSON.stringify(saved));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [saved]);

  useEffect(() => {
    const refresh = () => {
      setSaved(readSaved());
      refreshTopics((v) => v + 1);
    };
    window.addEventListener(CLOUD_APPLIED, refresh);
    return () => window.removeEventListener(CLOUD_APPLIED, refresh);
  }, []);

  function changeProgram(program: "timo" | "asmo" | "school") {
    setSection(program === "school" ? schoolSubject : program);
    setCategory(program === "school" ? "all" : "qualifier");
    setSearch("");
  }
  const saveDraft = useCallback(
    (draft: Draft) => {
      if (exerciseId)
        setSaved((s) => ({
          ...s,
          drafts: { ...s.drafts, [exerciseId]: draft },
        }));
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

  return (
    <div className="pixel-app">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <div className="catalog-masthead" ref={mastheadRef}>
        <header className="site-header">
          <div className="header-inner">
            <button
              className="brand"
              aria-label="Góc học tập của bé — Danh sách đề"
              onClick={() => {
                setSearch("");
                setCategory(isExam ? "qualifier" : "all");
              }}
            >
              {theme === "crystal" ||
              theme === "cloud" ||
              ["forest", "magic", "treasure", "cars"].includes(theme) ? (
                <img
                  className="crystal-brand-icon"
                  src={publicAsset(`${theme}-book`)}
                  alt=""
                />
              ) : theme === "pixel" ? (
                <img src={publicAsset("pixel-book")} alt="" />
              ) : (
                <BookOpen className="modern-brand-icon" size={44} />
              )}
              <span>
                Góc học tập <span className="brand-child">của bé</span>
              </span>
              <span className="brand-spark" aria-hidden="true">
                ✦
              </span>
            </button>
            <div className="header-tools">
              <div className="search-box">
                <Search size={21} />
                <input
                  type="search"
                  aria-label="Tìm bài tập"
                  placeholder="Tìm bài tập"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search ? (
                  <button
                    className="icon-button"
                    aria-label="Xóa tìm kiếm"
                    onClick={() => setSearch("")}
                  >
                    <X size={17} />
                  </button>
                ) : null}
              </div>
              <Suspense fallback={null}>
                <CloudSync />
              </Suspense>
              <button
                className="icon-button appearance-button"
                aria-label="Chọn giao diện"
                title="Chọn giao diện"
                aria-expanded={appearanceOpen}
                onClick={() => setAppearanceOpen(true)}
              >
                <Palette size={22} />
              </button>
              <button
                className="icon-button logout-button"
                aria-label="Đăng xuất"
                title="Đăng xuất"
                onClick={logout}
              >
                <LogOut size={21} />
              </button>
              <button
                className="parent-button"
                aria-expanded={parentOpen}
                onClick={() => setParentOpen(true)}
              >
                <UsersRound size={23} fill="currentColor" />
                <span>Phụ huynh</span>
              </button>
            </div>
          </div>
        </header>
        <div className="adventure-banner">
          <h1 className="banner-message">Học vui, chinh phục từng bài!</h1>
          {theme !== "pixel" && (
            <img
              className="modern-hero"
              src={publicAsset(THEMES.find((t) => t.id === theme)!.hero)}
              alt=""
              aria-hidden="true"
            />
          )}
        </div>
        <div className="page-content catalog-filter-bar">
          <StudyFilters
            grade={grade}
            section={section}
            category={category}
            onGrade={(n) => setSaved((s) => ({ ...s, grade: n }))}
            onProgram={changeProgram}
            onSubject={(subject) => {
              setSchoolSubject(subject);
              setSection(subject);
              setCategory("all");
              setSearch("");
            }}
            onCategory={(c) => {
              setCategory(c);
              setSearch("");
            }}
          />
        </div>
      </div>
      <main id="main-content" className="page-content">
        {storageError ? (
          <p className="storage-warning" role="alert">
            Trình duyệt không cho phép lưu dữ liệu. Kết quả sẽ mất khi tải lại
            trang.
          </p>
        ) : null}
        <section className="exercise-section" aria-labelledby="catalog-title">
          {theme === "toys" ? (
            <div className="toys-catalog-banner">
              <h2 id="catalog-title">{search.trim() ? "Kết quả tìm kiếm" : title}</h2>
              <p>Lớp {grade} · {isExam ? "Toán" : SECTION_LABELS[section]}</p>
              <span className="toys-catalog-count" aria-live="polite">{exercises.length} {category === "topic" ? "chủ đề" : "đề"}</span>
            </div>
          ) : <>
          <h2 id="catalog-title" className={(theme === "arctic") ? `${theme}-catalog-title` : "visually-hidden"}>
            {search.trim() ? "Kết quả tìm kiếm" : title}
          </h2>
          {(theme === "arctic") && <p className={`${theme}-catalog-subtitle`}>Lớp {grade} · {isExam ? "Toán" : SECTION_LABELS[section]}</p>}
          <span className={(theme === "arctic") ? `${theme}-catalog-count` : "visually-hidden"} aria-live="polite">
            {exercises.length} {category === "topic" ? "chủ đề" : "đề"}
          </span>
          </>}
          {exercises.length ? (
            <div className="exercise-grid">
              {exercises.map((exercise, index) => {
                const id = storageId(section, grade, exercise.id);
                return (
                  <ExerciseCard
                    key={id}
                    exercise={exercise}
                    index={
                      exercise.category === "topic"
                        ? getExercises(section, category, grade).findIndex(
                            (item) => item.id === exercise.id,
                          )
                        : index
                    }
                    result={saved.results[id]}
                    hasDraft={Boolean(saved.drafts[id])}
                    onOpen={() =>
                      setSelection({ exercise, section, grade, mode: exercise.questionCount === 0 ? "example" : "play" })
                    }
                    onView={() =>
                      setSelection({ exercise, section, grade, mode: "result" })
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={38} />
              <h3>
                {search.trim() ? "Chưa tìm thấy bài tập" : "Chưa có bộ đề thật"}
              </h3>
              <p>
                {search.trim()
                  ? "Thử từ khóa khác hoặc chọn lại nội dung luyện tập."
                  : "Các bộ đề sẽ xuất hiện sau khi được cung cấp. Đáp án và lời giải chỉ được ghi nhận từ tài liệu bạn gửi."}
              </p>
              {search.trim() && (
                <button
                  className="primary-button"
                  onClick={() => setSearch("")}
                >
                  Xóa tìm kiếm
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          )}
        </section>
      </main>
      <footer className="world-footer" aria-hidden="true">
        <img src={publicAsset("pixel-ground")} alt="" />
      </footer>
      {appearanceOpen && (
        <ThemePicker onClose={() => setAppearanceOpen(false)} />
      )}
      {parentOpen && (
        <Dialog
          title="Mật khẩu phụ huynh"
          className="parent-dialog password-settings-dialog"
          onClose={() => setParentOpen(false)}
        >
          <ParentPassword
            purpose="settings"
            onCancel={() => setParentOpen(false)}
          />
        </Dialog>
      )}
      {selection ? (
        <Suspense
          fallback={
            <div className="loading-overlay" role="status">
              Đang chuẩn bị bài tập…
            </div>
          }
        >
          {selection.mode === "example" && selection.exercise.questionCount === 0 ? (
            <TopicPreview exercise={selection.exercise} onClose={() => setSelection(null)} />
          ) : selection.exercise.id === "unassigned" &&
          selection.mode !== "result" ? (
            <UnassignedWorkspace
              onChanged={() => refreshTopics((value) => value + 1)}
              grade={selection.grade}
              section={selection.section}
              onClose={() => setSelection(null)}
            />
          ) : (
            <Quiz
              key={`${exerciseId}:${selection.mode}`}
              id={exerciseId}
              onConfigure={(nextGrade, nextSection, nextExercise) =>
                setSelection({
                  grade: nextGrade,
                  section: nextSection,
                  exercise: nextExercise,
                  mode: "play",
                })
              }
              previewOnly={selection.mode === "example"}
              exercise={selection.exercise}
              grade={selection.grade}
              section={selection.section}
              draft={
                selection.mode !== "result"
                  ? saved.drafts[exerciseId]
                  : undefined
              }
              initialResult={
                selection.mode === "result"
                  ? saved.results[exerciseId]
                  : undefined
              }
              onSetupPassword={() => {
                setSelection(null);
                setParentOpen(true);
              }}
              onSave={saveDraft}
              onFinish={finish}
              onClose={() => setSelection(null)}
            />
          )}
        </Suspense>
      ) : null}
    </div>
  );
}
