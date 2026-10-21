import type { ReactNode } from "react";
import { TopicExample } from "./TopicExample";
import { Paper2Shape } from "./Paper2Illustration";
import {
  ArrowLeft,
  ChartNoAxesColumnIncreasing,
  Clock3,
  FileCheck2,
  Play,
  Send,
} from "lucide-react";
import { getExercises, SECTION_LABELS, hasStudentAnswer } from "./data";
import { publicAsset } from "./components";
import {
  QuestionIllustration,
  ShapeIcon,
  hasSolutionDiagram,
} from "./QuestionIllustration";
import type { Exercise, Question, Section, StudentAnswer } from "./data";

type Props = {
  submitted?: boolean;
  score?: number;
  onReview?: () => void;
  onRestart?: () => void;
  reviewAccess?: ReactNode;
  hasDraft?: boolean;
  exercise: Exercise;
  grade: number;
  section: Section;
  questions: Question[];
  answers: Record<number, StudentAnswer>;
  started: boolean;
  review: boolean;
  elapsed: number;
  inert: boolean;
  onAnswer: (question: number, answer: StudentAnswer) => void;
  onStart: () => void;
  onSubmit: () => void;
  onClose: () => void;
  onConfigure?: (grade: number, section: Section, exercise: Exercise) => void;
};
export function PaperWorkspace(p: Props) {
  const topic = p.exercise.category === "topic";
  const answered = p.questions.filter((_, i) =>
    hasStudentAnswer(p.answers[i]),
  ).length;
  const clock = `${String(Math.floor(p.elapsed / 60)).padStart(2, "0")}:${String(p.elapsed % 60).padStart(2, "0")}`;
  const configure = (grade: number, section: Section, exercise = p.exercise) =>
    p.onConfigure?.(grade, section, exercise);
  const submit = (
    <button className="paper-submit" onClick={p.onSubmit}>
      <Send size={22} />
      Nộp bài
    </button>
  );
  return (
    <div
      className={`paper-world ${topic ? "topic-world" : ""}`}
      inert={p.inert}
    >
      <div className="paper-brand">
        <img src={publicAsset("pixel-book")} alt="" />
        <strong>
          Góc học tập <em>của bé</em>
        </strong>
        <button className="text-button" onClick={p.onClose}>
          <ArrowLeft size={18} />
          Về danh sách
        </button>
      </div>
      <div className="paper-shell">
        {topic && !p.started && (
          <section className="topic-setup" aria-label="Chọn nội dung luyện tập">
            <div className="topic-filters">
              <label>
                Chọn lớp
                <select
                  aria-label="Chọn lớp"
                  disabled={p.started}
                  value={p.grade}
                  onChange={(e) => configure(Number(e.target.value), p.section)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      Lớp {n}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Chọn chương trình học
                <select
                  aria-label="Chọn chương trình học"
                  disabled={p.started}
                  value={p.section}
                  onChange={(e) =>
                    configure(p.grade, e.target.value as Section)
                  }
                >
                  <option value="timo">TIMO</option>
                  <option value="asmo">ASMO</option>
                </select>
              </label>
              <label>
                Chọn môn học
                <select
                  aria-label="Chọn môn học"
                  value="math"
                  onChange={() => {}}
                >
                  <option value="math">Toán</option>
                </select>
              </label>
              <label>
                Chọn nội dung luyện tập
                <select
                  aria-label="Chọn nội dung luyện tập"
                  disabled={p.started}
                  value="topic"
                  onChange={(e) => {
                    const next = getExercises(
                      p.section,
                      e.target.value as "qualifier" | "national" | "topic",
                      p.grade,
                    )[0];
                    if (next) configure(p.grade, p.section, next);
                  }}
                >
                  <option value="qualifier">Đề vòng loại</option>
                  <option value="national">Đề Quốc gia</option>
                  <option value="topic">Luyện theo chủ đề</option>
                </select>
              </label>
            </div>
            <div className="topic-select-row">
              <label>
                Chọn chủ đề
                <select
                  aria-label="Chọn chủ đề"
                  disabled={p.started}
                  value={p.exercise.id}
                  onChange={(e) => {
                    const next = getExercises(p.section, "topic", p.grade).find(
                      (x) => x.id === e.target.value,
                    );
                    if (next) configure(p.grade, p.section, next);
                  }}
                >
                  {getExercises(p.section, "topic", p.grade).map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {!p.started && !p.exercise.example && (
              <button
                className="topic-start"
                onClick={p.onStart}
                disabled={!p.questions.length}
              >
                <Play size={22} />
                Bắt đầu luyện tập
              </button>
            )}
          </section>
        )}
        {topic && p.exercise.example && !p.review && (
          <TopicExample
            key={p.exercise.id}
            exercise={p.exercise}
            hasDraft={Boolean(p.hasDraft)}
            practicing={p.started}
            onPractice={() => {
              p.onStart();
              document
                .getElementById("topic-practice-toolbar")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        )}
        <header
          id={topic ? "topic-practice-toolbar" : undefined}
          className="paper-toolbar"
        >
          <div className="paper-title">
            {topic ? (
              <ChartNoAxesColumnIncreasing size={32} />
            ) : (
              <span className="exam-number">
                {Number(p.exercise.id.match(/-(\d+)$/)?.[1] ?? 1)}
              </span>
            )}
            <div>
              <h2>{p.exercise.title}</h2>
              {!topic && (
                <small>
                  {SECTION_LABELS[p.section]} • Lớp {p.grade} • Toán
                </small>
              )}
            </div>
          </div>
          <div className="paper-stat">
            <Clock3 />
            <div>
              <small>
                {p.submitted ? "Thời gian làm bài" : "Thời gian đã làm"}
              </small>
              <strong>{clock}</strong>
            </div>
          </div>
          <div className="paper-stat">
            <FileCheck2 />
            <div>
              <small>Đã trả lời</small>
              <strong>
                {answered}/{p.questions.length} câu
              </strong>
            </div>
          </div>
          {p.submitted && (
            <div className="paper-stat paper-result" role="status">
              <FileCheck2 />
              <div>
                <small>Kết quả</small>
                <strong>
                  {p.score}/{p.questions.length} câu đúng
                </strong>
              </div>
            </div>
          )}
          {p.submitted && !p.review ? (
            <div className="paper-result-actions">
              <button className="paper-submit" onClick={p.onReview}>
                Xem đáp án & lời giải
              </button>
              <button className="secondary-button" onClick={p.onRestart}>
                Làm lại
              </button>
            </div>
          ) : p.started && !p.review ? (
            <div className="paper-result-actions">
              {submit}
              <button className="secondary-button" onClick={p.onRestart}>
                Làm lại
              </button>
            </div>
          ) : p.review ? (
            <button className="paper-submit" onClick={p.onClose}>
              Hoàn tất
            </button>
          ) : (
            <button
              className="paper-submit"
              onClick={p.onStart}
              disabled={!p.questions.length}
            >
              <Play size={20} />
              Bắt đầu
            </button>
          )}
        </header>
        {p.reviewAccess}
        <article
          className={`exam-paper ${p.review ? "review-paper" : ""}`}
          aria-label={p.review ? "Đáp án và lời giải" : "Bài luyện tập Toán"}
        >
          {!topic && (
            <div className="paper-heading">
              <h1>
                {p.review
                  ? "ĐÁP ÁN & LỜI GIẢI"
                  : p.exercise.id === "qualifier-01"
                    ? "ĐỀ SỐ 1"
                    : p.exercise.title}
              </h1>
              <p>Đề bài • {p.questions.length} câu</p>
              <div>
                {p.review
                  ? "Đối chiếu câu trả lời và xem lời giải cho từng câu."
                  : p.questions.some((q) => q.answerFormat === "text")
                    ? "Viết câu trả lời cho mỗi câu hỏi."
                    : "Chọn một đáp án cho mỗi câu hỏi."}
              </div>
            </div>
          )}
          {p.questions.map((q, i) => (
            <div
              key={i}
              className={
                p.review
                  ? "paper-question-row review-row"
                  : "paper-question-row"
              }
            >
              <fieldset
                className="paper-question"
                disabled={!p.started || p.review || p.submitted}
              >
                <legend>
                  <strong>Câu {i + 1}.</strong> {q.text}
                </legend>
                {q.translation && (
                  <p className="question-translation">{q.translation}</p>
                )}
                <QuestionIllustration diagram={q.diagram} />
                {q.answerFormat === "text" ? (
                  <label className="paper-short-answer">
                    Câu trả lời của bé
                    <input
                      type="text"
                      aria-label={`Câu trả lời câu ${i + 1}`}
                      autoComplete="off"
                      maxLength={250}
                      value={p.answers[i] ?? ""}
                      onChange={(e) => p.onAnswer(i, e.target.value)}
                    />
                  </label>
                ) : (
                  <div
                    className={`paper-options ${q.options.some((option) => option.length > 18) ? "long-options" : ""}`}
                  >
                    {q.options.map((option, j) => (
                      <label
                        key={j}
                        className={`${p.review && q.correct === j ? "paper-correct" : ""} ${p.review && p.answers[i] === j && q.correct !== j ? "paper-wrong" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`paper-question-${i}`}
                          checked={p.answers[i] === j}
                          onChange={() => p.onAnswer(i, j)}
                        />
                        <span>
                          {"ABCD"[j]}.{" "}
                          {q.diagram === "p2-shapes" ? (
                            <>
                              <svg
                                className="option-shape"
                                viewBox="-17 -17 34 34"
                                aria-hidden="true"
                              >
                                <Paper2Shape index={[1, 2, 0, 3][j]} />
                              </svg>
                              <span className="visually-hidden">{option}</span>
                            </>
                          ) : q.diagram === "shape-pattern" ? (
                            <>
                              <svg
                                className="option-shape"
                                viewBox="-17 -17 34 34"
                                aria-hidden="true"
                              >
                                <ShapeIcon index={j} />
                              </svg>
                              <span className="visually-hidden">{option}</span>
                            </>
                          ) : (
                            option
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
              {p.review && q.correct !== null && (
                <aside
                  className="paper-explanation"
                  aria-label={`Đáp án và lời giải câu ${i + 1}`}
                >
                  <strong className="review-answer-heading">
                    Lời giải câu {i + 1}
                  </strong>
                  <b>Đáp án {"ABCD"[q.correct]}.</b>
                  {hasSolutionDiagram(q.diagram) && (
                    <QuestionIllustration diagram={q.diagram} solution />
                  )}
                  <p className="supplied-explanation">{q.explanation}</p>
                  {!hasStudentAnswer(p.answers[i]) && (
                    <span> Bé chưa trả lời câu này.</span>
                  )}
                </aside>
              )}
            </div>
          ))}
          {p.started && !p.review && !p.submitted && (
            <footer className="paper-end">{submit}</footer>
          )}
        </article>
      </div>
    </div>
  );
}
