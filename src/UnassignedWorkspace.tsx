import { useState } from "react";
import { matchesQuestionSearch } from "./questionSearch";
import { ClassifyQuestion } from "./ClassifyQuestion";
import { Dialog } from "./components";
import { getExercises, getQuestions } from "./data";
import type { Question, Section } from "./data";
import { PaperWorkspace } from "./PaperWorkspace";
export default function UnassignedWorkspace({
  grade,
  section,
  onClose,
  onChanged,
}: {
  grade: number;
  section: Section;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [query, setQuery] = useState("");
  const [classifying, setClassifying] = useState<Question | null>(null);
  const exercise = getExercises(section, "topic", grade).find(
    (topic) => topic.id === "unassigned",
  ) ?? {
    id: "unassigned",
    title: "Chưa có chủ đề",
    category: "topic" as const,
    questionCount: 0,
    questionIds: [],
  };
  const questions = getQuestions(grade, section, exercise);
  return (
    <Dialog
      title="Chưa có chủ đề"
      className="quiz-dialog paper-dialog"
      onClose={onClose}
    >
      <PaperWorkspace
        exercise={exercise}
        grade={grade}
        section={section}
        questions={questions.filter((question) => matchesQuestionSearch(question, query))}
        questionSearch={{ value: query, onChange: setQuery, total: questions.length }}
        answers={{}}
        started={false}
        review={false}
        elapsed={0}
        inert={false}
        onAnswer={() => {}}
        onStart={() => {}}
        onSubmit={() => {}}
        onClose={onClose}
        classificationOnly
        onClassify={setClassifying}
      />
      {classifying && <ClassifyQuestion question={classifying} onClose={() => setClassifying(null)} onSaved={onChanged} />}
    </Dialog>
  );
}
