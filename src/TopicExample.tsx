import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { QuestionIllustration } from "./QuestionIllustration";
import type { Exercise } from "./data";
export function TopicExample({
  exercise,
  showSignal = 0,
  hasDraft,
  practicing = false,
  onPractice,
}: {
  exercise: Exercise;
  showSignal?: number;
  hasDraft: boolean;
  practicing?: boolean;
  onPractice: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
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
              <p className="supplied-explanation">{example.explanation}</p>
            </section>
          </div>
          <p>
            {exercise.questionCount ?? 0} câu luyện tập cùng dạng từ bộ đề bạn
            đã gửi.
          </p>
          {!practicing && (
            <button className="primary-button" onClick={onPractice}>
              {hasDraft ? "Tiếp tục luyện tập" : "Bắt đầu luyện tập"}{" "}
              <ArrowRight size={20} />
            </button>
          )}
        </>
      )}
    </section>
  );
}
