import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  QuestionIllustration,
  hasSolutionDiagram,
} from "./QuestionIllustration";
import { QuestionPreview } from "./QuestionPreview";
import type { Exercise } from "./data";
export function TopicExample({
  exercise,
  showSignal = 0,
  defaultExpanded = false,
  hasDraft,
  practicing = false,
  onPractice,
}: {
  exercise: Exercise;
  showSignal?: number;
  defaultExpanded?: boolean;
  hasDraft: boolean;
  practicing?: boolean;
  onPractice: () => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
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
                <QuestionPreview question={example} />
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
          {!practicing && (exercise.questionCount ?? 0) > 0 && (
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
