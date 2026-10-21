import {
  ArrowLeft,
  ChartNoAxesColumnIncreasing,
  Clock3,
  FileCheck2,
  Play,
  Send,
} from "lucide-react";
import { getExercises, SECTION_LABELS } from "./data";
import { publicAsset } from "./components";
import type { Exercise, Question, Section } from "./data";

type Props = {
  exercise: Exercise;
  grade: number;
  section: Section;
  questions: Question[];
  answers: Record<number, number>;
  started: boolean;
  review: boolean;
  elapsed: number;
  inert: boolean;
  onAnswer: (question: number, answer: number) => void;
  onStart: () => void;
  onSubmit: () => void;
  onClose: () => void;
  onConfigure?: (grade: number, section: Section, exercise: Exercise) => void;
};
export function PaperWorkspace(p: Props) {
  const topic = p.exercise.category === "topic";
  const answered = p.questions.filter(
    (_, i) => p.answers[i] !== undefined,
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
        {topic && (
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
                    const next = getExercises(p.section, "topic").find(
                      (x) => x.id === e.target.value,
                    );
                    if (next) configure(p.grade, p.section, next);
                  }}
                >
                  {getExercises(p.section, "topic").map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {!p.started && (
              <button className="topic-start" onClick={p.onStart}>
                <Play size={22} />
                Bắt đầu luyện tập
              </button>
            )}
          </section>
        )}
        <header className="paper-toolbar">
          <div className="paper-title">
            {topic ? (
              <ChartNoAxesColumnIncreasing size={32} />
            ) : (
              <span className="exam-number">
                {Number(p.exercise.id.match(/-(\d+)$/)?.[1] ?? 1)}
              </span>
            )}
            <div>
              <h2>{topic ? "Bài luyện tập" : p.exercise.title}</h2>
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
                {p.review ? "Thời gian làm bài" : "Thời gian đã làm"}
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
          {p.started && !p.review ? (
            submit
          ) : p.review ? (
            <button className="paper-submit" onClick={p.onClose}>
              Hoàn tất
            </button>
          ) : (
            <button className="paper-submit" onClick={p.onStart}>
              <Play size={20} />
              Bắt đầu
            </button>
          )}
        </header>
        <article
          className={`exam-paper ${p.review ? "review-paper" : ""}`}
          aria-label={p.review ? "Đáp án và lời giải" : "Bài luyện tập Toán"}
        >
          {!topic && (
            <div className="paper-heading">
              <h1>{p.review ? "ĐÁP ÁN & LỜI GIẢI" : "BÀI LUYỆN TẬP TOÁN"}</h1>
              <p>Đề bài • {p.questions.length} câu</p>
              <div>
                {p.review
                  ? "Đối chiếu câu trả lời và xem lời giải cho từng câu."
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
                disabled={!p.started || p.review}
              >
                <legend>
                  <strong>Câu {i + 1}.</strong> {q.text}
                </legend>
                <div className="paper-options">
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
                        {"ABCD"[j]}. {option}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {p.review && q.correct !== null && (
                <aside
                  className="paper-explanation"
                  aria-label={`Đáp án và lời giải câu ${i + 1}`}
                >
                  <strong className="review-answer-heading">
                    Lời giải câu {i + 1}
                  </strong>
                  <b>Đáp án {"ABCD"[q.correct]}.</b> {q.explanation}
                  {p.answers[i] === undefined && (
                    <span> Bé chưa trả lời câu này.</span>
                  )}
                </aside>
              )}
            </div>
          ))}
          {p.started && !p.review && (
            <footer className="paper-end">{submit}</footer>
          )}
        </article>
      </div>
    </div>
  );
}
