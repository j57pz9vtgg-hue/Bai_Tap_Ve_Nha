import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { QuestionIllustration } from "./QuestionIllustration";
import { ParentPassword } from "./ParentPassword";
import type { Exercise } from "./data";
export function TopicExample({
  exercise,
  showSignal = 0,
  hasDraft,
  onPractice,
  onSetupPassword,
}: {
  exercise: Exercise;
  showSignal?: number;
  hasDraft: boolean;
  onPractice: () => void;
  onSetupPassword: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [exampleUnlocked, setExampleUnlocked] = useState(false);
  const [showExampleGate, setShowExampleGate] = useState(false);
  useEffect(() => {
    if (showSignal) setExpanded(true);
  }, [showSignal]);
  const example = exercise.example;
  if (!example) return null;
  return (
    <section className="topic-example-intro">
      <button
        className="topic-example-heading"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <BookOpen size={26} />
        <h2>Bài mẫu · {exercise.title}</h2>
        <span>{expanded ? "Thu gọn ⌃" : "Xem ví dụ ⌄"}</span>
      </button>
      {expanded && (
        <>
          <div className="topic-example-columns">
            <section>
              <h3>Ví dụ</h3>
              <p>{example.text}</p>
              <p className="question-translation">{example.translation}</p>
              <QuestionIllustration diagram={example.diagram} />
              <div className="topic-example-options">
                {example.options.map((option, i) => (
                  <span key={i}>
                    {"ABCD"[i]}. {option}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h3>Lời giải ví dụ</h3>
              {exampleUnlocked ? (
                <p className="supplied-explanation">{example.explanation}</p>
              ) : showExampleGate ? (
                <ParentPassword
                  purpose="review"
                  onCancel={() => setShowExampleGate(false)}
                  onSetup={onSetupPassword}
                  onUnlock={() => {
                    setExampleUnlocked(true);
                    setShowExampleGate(false);
                  }}
                />
              ) : (
                <button
                  className="primary-button"
                  onClick={() => setShowExampleGate(true)}
                >
                  Xem lời giải ví dụ
                </button>
              )}
            </section>
          </div>
          <p>
            {exercise.questionCount ?? 0} câu luyện tập cùng dạng từ bộ đề bạn
            đã gửi.
          </p>
          <button className="primary-button" onClick={onPractice}>
            {hasDraft ? "Tiếp tục luyện tập" : "Bắt đầu luyện tập"}{" "}
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </section>
  );
}
