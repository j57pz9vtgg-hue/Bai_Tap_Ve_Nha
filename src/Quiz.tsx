import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Flag,
  RotateCcw,
  Send,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { Dialog, formatDuration } from "./components";
import { publicAsset } from "./components";
import { ParentPassword } from "./ParentPassword";
import { PaperWorkspace } from "./PaperWorkspace";
import {
  getPracticeQuestions,
  getQuestions,
  hasStudentAnswer,
  hasProvidedAnswer,
  isCorrectAnswer,
  refreshSuppliedQuestions,
  correctStoredTranscriptions,
} from "./data";
import type { Draft, Exercise, Result, Section, StudentAnswer } from "./data";

type QuizProps = {
  previewOnly?: boolean;
  exercise: Exercise;
  grade: number;
  section: Section;
  id: string;
  draft?: Draft;
  initialResult?: Result;
  onSave: (draft: Draft) => void;
  onFinish: (result: Result) => void;
  onClose: () => void;
  onSetupPassword: () => void;
  onConfigure?: (grade: number, section: Section, exercise: Exercise) => void;
};

export default function Quiz({
  exercise,
  previewOnly = false,
  grade,
  section,
  id,
  draft,
  initialResult,
  onSave,
  onFinish,
  onClose,
  onSetupPassword,
  onConfigure,
}: QuizProps) {
  const [reviewingSaved, setReviewingSaved] = useState(Boolean(initialResult));
  const isPaper = section === "timo" || section === "asmo";
  const isTopic = isPaper && exercise.category === "topic";
  const [questions, setQuestions] = useState(() =>
    initialResult
      ? correctStoredTranscriptions(
          initialResult.questions ?? getQuestions(grade, section, exercise),
        )
      : draft
        ? refreshSuppliedQuestions(
            draft.questions ?? getQuestions(grade, section, exercise),
          )
        : getPracticeQuestions(grade, section, exercise),
  );
  const [started, setStarted] = useState(
    Boolean(initialResult || (!previewOnly && (draft || isTopic))),
  );
  const [answers, setAnswers] = useState<Record<number, StudentAnswer>>(
    initialResult?.answers ?? draft?.answers ?? {},
  );
  const [index, setIndex] = useState(draft?.index ?? 0);
  const [deadline, setDeadline] = useState(
    () =>
      draft?.deadline ??
      (isTopic && !previewOnly && !initialResult ? Date.now() + 900000 : 0),
  );
  const [remaining, setRemaining] = useState(
    draft ? Math.max(0, Math.ceil((draft.deadline - Date.now()) / 1000)) : 900,
  );
  const [stage, setStage] = useState<"work" | "result" | "review">(
    initialResult ? "result" : "work",
  );
  const [reviewRequested, setReviewRequested] = useState(false);
  const [resultUnlocked, setResultUnlocked] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(
    initialResult?.elapsedSeconds ?? 0,
  );
  const [confirmLeave, setConfirmLeave] = useState(false);
  const submitted = useRef(Boolean(initialResult));
  const score =
    reviewingSaved && initialResult
      ? initialResult.score
      : questions.filter((q, i) => isCorrectAnswer(q, answers[i])).length;
  const total =
    reviewingSaved && initialResult ? initialResult.total : questions.length;
  const answered = Object.values(answers).filter(hasStudentAnswer).length;
  const current = questions[index];
  const finished = stage === "result" || stage === "review";

  function finish() {
    if (submitted.current) return;
    if (!questions.length || questions.some((q) => !hasProvidedAnswer(q))) {
      window.alert(
        "Chưa có đáp án được cung cấp cho bộ đề này. Bài làm chưa được chấm điểm.",
      );
      return;
    }
    submitted.current = true;
    const elapsed = Math.min(
      900,
      Math.max(0, Math.floor((Date.now() - (deadline - 900000)) / 1000)),
    );
    setElapsedSeconds(elapsed);
    onFinish({
      id,
      title: exercise.title,
      grade,
      score,
      total: questions.length,
      date: new Date().toISOString(),
      section,
      answers,
      questions,
      elapsedSeconds: elapsed,
    });
    setStage("result");
  }

  useEffect(() => {
    if (!started || finished) return;
    onSave({ answers, index, deadline, questions });
  }, [answers, index, deadline, started, finished, onSave]);

  useEffect(() => {
    if (!started || finished) return;
    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, started, finished]);

  useEffect(() => {
    if (started && remaining === 0 && !finished) finish();
  });

  useEffect(() => {
    if (!started || finished) return;
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [started, finished]);

  const requestClose = () => {
    if (confirmLeave) setConfirmLeave(false);
    else if (started && !finished) setConfirmLeave(true);
    else onClose();
  };
  const start = () => {
    if (!questions.length) return;
    setDeadline(Date.now() + 15 * 60 * 1000);
    setRemaining(900);
    setStarted(true);
  };
  const restart = () => {
    submitted.current = false;
    setReviewingSaved(false);
    setResultUnlocked(false);
    setReviewRequested(false);
    setQuestions(getPracticeQuestions(grade, section, exercise));
    setAnswers({});
    setIndex(0);
    setStage("work");
    start();
  };

  return (
    <Dialog
      title={exercise.title}
      onClose={requestClose}
      className={`quiz-dialog ${!isPaper && stage === "result" ? "result-dialog" : ""} ${isPaper && (started || isTopic) ? "paper-dialog" : ""}`}
    >
      {!started && !isTopic ? (
        <div className="quiz-intro">
          <img
            src={publicAsset("pixel-hero")}
            alt="Cuộc phiêu lưu học tập trong thế giới pixel"
          />
          <span className="intro-kicker">Sẵn sàng khám phá chưa?</span>
          <h2>{exercise.title}</h2>
          <p>
            Mỗi câu hỏi là một bước chân trên hành trình tri thức. Bé hãy đọc kỹ
            và chọn một đáp án nhé!
          </p>
          <div className="quiz-info">
            <span>
              <Flag size={19} />
              {questions.length} câu hỏi
            </span>
            <span>
              <Clock3 size={19} />
              15 phút
            </span>
            <span>Lớp {grade}</span>
          </div>
          <p className="sample-notice">
            Nội dung được nhập từ bộ đề bạn cung cấp. Bài làm được lưu trên
            trình duyệt này.
          </p>
          <button className="start-button" onClick={start}>
            Bắt đầu làm bài
            <ArrowRight size={20} />
          </button>
        </div>
      ) : !isPaper && stage === "result" && !resultUnlocked ? (
        <div className="result-lock">
          <ParentPassword
            purpose="review"
            onCancel={onClose}
            onSetup={onSetupPassword}
            onUnlock={() => setResultUnlocked(true)}
          />
        </div>
      ) : !isPaper && stage === "result" ? (
        <div className="result-view">
          <div className="result-trophy">
            <Trophy size={64} />
          </div>
          <h2>
            {score === total
              ? "Xuất sắc lắm, nhà thám hiểm!"
              : "Bé đã hoàn thành rồi!"}
          </h2>
          <p>Mỗi lần luyện tập là một lần bé tiến bộ hơn.</p>
          <div className="result-score">
            {score}
            <span> / {total}</span>
          </div>
          <p>Câu trả lời đúng</p>
          <p className="result-duration">
            <Clock3 size={18} aria-hidden="true" /> Thời gian làm bài:{" "}
            {formatDuration(elapsedSeconds)}
          </p>
          <div className="result-facts">
            <span>
              <CheckCircle2 size={20} />
              {score} câu đúng
            </span>
            <span>
              <PencilIcon />
              {total - score} câu cần ôn lại
            </span>
          </div>
          <button
            className="start-button"
            disabled={reviewingSaved && !initialResult?.answers}
            onClick={() => {
              if (resultUnlocked) {
                setStage("review");
                setIndex(0);
              }
            }}
          >
            Xem đáp án & lời giải
            <ArrowRight size={20} />
          </button>
          {reviewingSaved && !initialResult?.answers ? (
            <p className="sample-notice">
              Kết quả cũ chưa lưu câu trả lời chi tiết. Bé có thể làm lại để lưu
              lời giải và thời gian.
            </p>
          ) : null}
          <div className="result-actions">
            <button className="text-button" onClick={restart}>
              <RotateCcw size={17} />
              Luyện tập lại
            </button>
            <button className="text-button" onClick={onClose}>
              Về danh sách đề
            </button>
          </div>
          <p className="sample-notice">Đã lưu kết quả trên trình duyệt này.</p>
        </div>
      ) : isPaper ? (
        <PaperWorkspace
          exercise={exercise}
          grade={grade}
          section={section}
          questions={questions}
          answers={answers}
          started={started}
          review={stage === "review"}
          submitted={finished}
          score={score}
          onRestart={restart}
          onReview={() => {
            if (resultUnlocked) setStage("review");
            else setReviewRequested(true);
          }}
          reviewAccess={
            reviewRequested && !resultUnlocked ? (
              <Dialog
                title="Mật khẩu phụ huynh"
                className="parent-dialog password-settings-dialog"
                onClose={() => setReviewRequested(false)}
              >
                <ParentPassword
                  purpose="review"
                  onCancel={() => setReviewRequested(false)}
                  onSetup={onSetupPassword}
                  onUnlock={() => {
                    setResultUnlocked(true);
                    setReviewRequested(false);
                    setStage("review");
                  }}
                />
              </Dialog>
            ) : null
          }
          elapsed={finished ? elapsedSeconds : 900 - remaining}
          inert={confirmLeave}
          onAnswer={(q, a) => setAnswers((prev) => ({ ...prev, [q]: a }))}
          hasDraft={Boolean(draft)}
          onStart={() => {
            if (draft && !started) setStarted(true);
            else if (!started) start();
          }}
          onSubmit={finish}
          onClose={requestClose}
          onConfigure={onConfigure}
        />
      ) : (
        <div
          className={`quiz-workspace ${stage === "review" ? "is-review" : ""}`}
          inert={confirmLeave}
        >
          <div className="quiz-header">
            <div>
              <span className="quiz-eyebrow">Lớp {grade} · Bài tập</span>
              <h2>{exercise.title}</h2>
            </div>
            <span
              className={`timer ${remaining < 120 ? "warning" : ""}`}
              aria-label="Thời gian còn lại"
            >
              <Clock3 size={18} />
              {finished
                ? "Lời giải"
                : `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`}
            </span>
          </div>
          <div className="quiz-progress">
            <span
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
          </div>
          <div className="quiz-review-row">
            <div className="quiz-review-question">
              <div className="question-heading">
                <strong>
                  Câu {index + 1}
                  <span> / {total}</span>
                </strong>
                <span>
                  {stage === "review"
                    ? "Cùng xem lại nhé!"
                    : `Đã trả lời ${answered}/${questions.length}`}
                </span>
              </div>
              <h3 className="question-text">{current.text}</h3>
              <div className="answers">
                {current.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={stage === "review"}
                    className={`answer ${answers[index] === i ? "selected-answer" : ""} ${stage === "review" && current.correct === i ? "correct-answer" : ""} ${stage === "review" && answers[index] === i && current.correct !== i ? "wrong-answer" : ""}`}
                    onClick={() => setAnswers((a) => ({ ...a, [index]: i }))}
                  >
                    <span className="answer-letter">{"ABCD"[i]}</span>
                    <span>{option}</span>
                    {stage === "review" && current.correct === i ? (
                      <Check size={22} />
                    ) : answers[index] === i ? (
                      <span className="answer-check">
                        <Check size={17} />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
            {stage === "review" ? (
              <div className="explanation">
                <strong>
                  <Sparkles size={18} />
                  Lời giải
                </strong>
                <p>{current.explanation}</p>
                {!hasStudentAnswer(answers[index]) ? (
                  <small>Bé chưa trả lời câu này.</small>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="quiz-bottom">
            <button
              className="secondary-button"
              onClick={() => setIndex((i) => i - 1)}
              disabled={index === 0}
            >
              <ArrowLeft size={17} />
              Câu trước
            </button>
            {index < questions.length - 1 ? (
              <button
                className="primary-button"
                onClick={() => setIndex((i) => i + 1)}
              >
                Câu tiếp
                <ArrowRight size={17} />
              </button>
            ) : stage === "review" ? (
              <button className="primary-button" onClick={onClose}>
                Hoàn tất
                <Check size={18} />
              </button>
            ) : (
              <button className="primary-button" onClick={finish}>
                Nộp bài
                <Send size={17} />
              </button>
            )}
          </div>
          <div className="question-navigator" aria-label="Chọn câu hỏi">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`${hasStudentAnswer(answers[i]) ? "answered" : ""} ${i === index ? "current-question" : ""}`}
                aria-label={`Đến câu ${i + 1}`}
                aria-current={i === index ? "step" : undefined}
                onClick={() => setIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {stage !== "review" ? (
            <button className="text-button submit-link" onClick={finish}>
              Nộp bài sớm
              <Send size={15} />
            </button>
          ) : null}
        </div>
      )}
      {confirmLeave ? (
        <div className="quiz-confirm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="leave-title"
          >
            <h3 id="leave-title">Tạm dừng cuộc phiêu lưu?</h3>
            <p>
              Câu trả lời đã được lưu. Đồng hồ vẫn tiếp tục chạy, bé nhớ quay
              lại trước khi hết giờ nhé.
            </p>
            <button className="primary-button" autoFocus onClick={onClose}>
              Lưu và về danh sách
            </button>
            <button
              className="text-button"
              onClick={() => setConfirmLeave(false)}
            >
              Tiếp tục làm bài
            </button>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

function PencilIcon() {
  return <X size={19} />;
}
