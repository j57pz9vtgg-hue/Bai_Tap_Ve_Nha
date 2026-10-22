import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  QuestionIllustration,
  hasSolutionDiagram,
  ShapeIcon,
} from "./QuestionIllustration";
import type { Exercise } from "./data";
export function TopicExample({
  exercise,
  showSignal = 0,
  hasDraft,
  questionCount,
  practicing = false,
  onPractice,
}: {
  exercise: Exercise;
  showSignal?: number;
  hasDraft: boolean;
  questionCount: number;
  practicing?: boolean;
  onPractice: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (showSignal) setExpanded(true);
  }, [showSignal]);
  const examples =
    exercise.examples ?? (exercise.example ? [exercise.example] : []);
  if (!examples.length) return null;
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
          {examples.map((example, index) => (
            <div
              className="topic-example-columns"
              key={`${example.sourcePaper}:${example.sourceNumber}`}
            >
              <section>
                <h3>Ví dụ{examples.length > 1 ? ` ${index + 1}` : ""}</h3>
                <p>{example.text}</p>
                <p className="question-translation">{example.translation}</p>
                <QuestionIllustration diagram={example.diagram} />
                <div className="topic-example-options">
                  {example.options.map((option, i) => (
                    <span key={i}>
                      {"ABCD"[i]}.{" "}
                      {example.diagram === "shape-pattern" ? (
                        <svg
                          className="option-shape"
                          viewBox="-17 -17 34 34"
                          role="img"
                          aria-label={option}
                        >
                          <ShapeIcon index={i} />
                        </svg>
                      ) : (
                        option
                      )}
                    </span>
                  ))}
                </div>
              </section>
              <section>
                <h3>
                  Lời giải ví dụ{examples.length > 1 ? ` ${index + 1}` : ""}
                </h3>
                {hasSolutionDiagram(example.diagram) && (
                  <QuestionIllustration diagram={example.diagram} solution />
                )}
                <p className="supplied-explanation">{example.explanation}</p>
              </section>
            </div>
          ))}
          <p>
            {questionCount} câu luyện tập cùng dạng từ bộ đề bạn
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
