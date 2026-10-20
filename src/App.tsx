import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Search,
  UsersRound,
  X,
  ArrowRight,
  Trophy,
} from "lucide-react";
import {
  Dialog,
  ExerciseCard,
  PixelIcon,
  StudyFilters,
  formatDuration,
  publicAsset,
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

const Quiz = lazy(() => import("./Quiz"));
type Selection = {
  exercise: Exercise;
  section: Section;
  grade: number;
  mode: "play" | "result";
};

export default function App() {
  const [saved, setSaved] = useState(readSaved);
  const [section, setSection] = useState<Section>("timo");
  const [schoolSubject, setSchoolSubject] = useState<Section>("toan");
  const [category, setCategory] = useState<Category>("qualifier");
  const [search, setSearch] = useState("");
  const [parentTab, setParentTab] = useState<"results" | "help" | null>(null);
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
  const exercises = getExercises(section, category).filter((e) =>
    normalized(e.title).includes(normalized(search.trim())),
  );
  const results = Object.values(saved.results).sort((a, b) =>
    b.date.localeCompare(a.date),
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [saved]);

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
  function viewPastResult(result: Result) {
    const id = result.id.split(":").slice(2).join(":");
    const exercise = [
      ...getExercises(result.section, "all"),
      ...getExercises(result.section, "topic"),
    ].find((e) => e.id === id);
    if (exercise) {
      setParentTab(null);
      setSelection({
        exercise,
        grade: result.grade,
        section: result.section,
        mode: "result",
      });
    }
  }

  return (
    <div className="pixel-app">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
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
            <img src={publicAsset("pixel-book")} alt="" />
            <span>Góc học tập của bé</span>
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
            <button
              className="parent-button"
              onClick={() => setParentTab("results")}
            >
              <UsersRound size={23} fill="currentColor" />
              <span>Phụ huynh</span>
            </button>
          </div>
        </div>
      </header>
      <div className="adventure-banner">
        <h1 className="banner-message">Học vui, chinh phục từng bài!</h1>
      </div>
      <main id="main-content" className="page-content">
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
        {storageError ? (
          <p className="storage-warning" role="alert">
            Trình duyệt không cho phép lưu dữ liệu. Kết quả sẽ mất khi tải lại
            trang.
          </p>
        ) : null}
        <section className="exercise-section" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div className="catalog-title">
              <PixelIcon name="flag" size={37} />
              <div>
                <h2 id="catalog-title">
                  {search.trim() ? "Kết quả tìm kiếm" : title}
                </h2>
                <p>
                  Lớp {grade}
                  <span>•</span>
                  {isExam ? "Toán" : SECTION_LABELS[section]}
                </p>
              </div>
            </div>
            <span className="exercise-count" aria-live="polite">
              {exercises.length} {category === "topic" ? "chủ đề" : "đề"}
              <PixelIcon name="star" size={23} />
            </span>
          </div>
          {exercises.length ? (
            <div className="exercise-grid">
              {exercises.map((exercise, index) => {
                const id = storageId(section, grade, exercise.id);
                return (
                  <ExerciseCard
                    key={id}
                    exercise={exercise}
                    index={index}
                    result={saved.results[id]}
                    hasDraft={Boolean(saved.drafts[id])}
                    onOpen={() =>
                      setSelection({ exercise, section, grade, mode: "play" })
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
              <h3>Chưa tìm thấy bài tập</h3>
              <p>Thử từ khóa khác hoặc chọn lại nội dung luyện tập nhé.</p>
              <button className="primary-button" onClick={() => setSearch("")}>
                Xóa tìm kiếm
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </section>
        <p className="sample-footer">
          Bài luyện tập mẫu · Kết quả thực tế lưu trên trình duyệt này
        </p>
      </main>
      <footer className="world-footer" aria-hidden="true">
        <img src={publicAsset("pixel-ground")} alt="" />
      </footer>
      {parentTab ? (
        <Dialog
          title="Góc phụ huynh"
          onClose={() => setParentTab(null)}
          className="parent-dialog"
        >
          <div className="parent-title-icon">
            <UsersRound size={29} />
          </div>
          <h2>Góc phụ huynh</h2>
          <p className="parent-subtitle">Cùng bé chinh phục từng bài học.</p>
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
                    <button
                      className="result-row"
                      key={r.id}
                      onClick={() => viewPastResult(r)}
                    >
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
                        <small>{formatDuration(r.elapsedSeconds)}</small>
                      </div>
                      <b>
                        {r.score}/{r.total}
                      </b>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <PixelIcon name="book" size={43} />
                  <h3>Hành trình của bé sắp bắt đầu</h3>
                  <p>
                    Chọn một đề và bắt đầu làm bài. Kết quả sẽ được lưu sau khi
                    nộp bài.
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
                Hiển thị lần làm gần nhất của mỗi bài. Các kết quả cũ vẫn được
                giữ; bài cũ chưa có thời gian sẽ hiển thị “—”.
              </p>
            </>
          ) : (
            <div className="help-content">
              <ol>
                <li>
                  <strong>Chọn nội dung học</strong>
                  <p>
                    Chọn lớp 1–5, chương trình TIMO/ASMO hoặc Báo bài của
                    trường, môn học và nội dung luyện tập ở thanh lọc.
                  </p>
                </li>
                <li>
                  <strong>Làm bài</strong>
                  <p>
                    Mỗi bài có 15 phút. Bé có thể chuyển câu, tạm đóng bài rồi
                    quay lại. Đồng hồ vẫn tiếp tục chạy và bài tự nộp khi hết
                    giờ.
                  </p>
                </li>
                <li>
                  <strong>Xem tiến bộ</strong>
                  <p>
                    Sau khi nộp, điểm và thời gian thực tế được lưu. Chọn “Xem
                    kết quả” để xem lại hoặc “Làm lại” để luyện tập thêm.
                  </p>
                </li>
                <li>
                  <strong>Lưu trên thiết bị</strong>
                  <p>
                    Nội dung hiện là bài luyện tập mẫu, không phải đề thi chính
                    thức. Chưa có tài khoản hoặc đồng bộ giữa các thiết bị. Xóa
                    dữ liệu trình duyệt sẽ xóa kết quả.
                  </p>
                </li>
              </ol>
            </div>
          )}
        </Dialog>
      ) : null}
      {selection ? (
        <Suspense
          fallback={
            <div className="loading-overlay" role="status">
              Đang chuẩn bị bài tập…
            </div>
          }
        >
          <Quiz
            key={`${exerciseId}:${selection.mode}`}
            id={exerciseId}
            exercise={selection.exercise}
            grade={selection.grade}
            section={selection.section}
            draft={
              selection.mode === "play" ? saved.drafts[exerciseId] : undefined
            }
            initialResult={
              selection.mode === "result"
                ? saved.results[exerciseId]
                : undefined
            }
            onSave={saveDraft}
            onFinish={finish}
            onClose={() => setSelection(null)}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
