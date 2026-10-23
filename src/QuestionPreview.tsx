import { Paper2Shape } from "./Paper2Illustration";
import { QuestionIllustration, ShapeIcon } from "./QuestionIllustration";
import type { Question } from "./data";

/** Read-only source question; deliberately contains no answer key or solution. */
export function QuestionPreview({ question }: { question: Question }) {
  return (
    <div className="source-question-preview">
      <p>{question.text}</p>
      <p className="question-translation">{question.translation}</p>
      <QuestionIllustration diagram={question.diagram} />
      <div className="topic-example-options">
        {question.options.map((option, i) => (
          <span key={i}>
            {"ABCD"[i]}.{" "}
            {question.diagram === "shape-pattern" || question.diagram === "p2-shapes" ? (
              <svg className="option-shape" viewBox="-17 -17 34 34" role="img" aria-label={option}>
                {question.diagram === "p2-shapes" ? <Paper2Shape index={[1, 2, 0, 3][i]} /> : <ShapeIcon index={i} />}
              </svg>
            ) : option}
          </span>
        ))}
      </div>
    </div>
  );
}
