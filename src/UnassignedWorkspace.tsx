import { Dialog } from "./components";
import { getExercises, getQuestions } from "./data";
import type { Section } from "./data";
import { PaperWorkspace } from "./PaperWorkspace";
export default function UnassignedWorkspace({
  grade,
  section,
  onClose,
}: {
  grade: number;
  section: Section;
  onClose: () => void;
}) {
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
        questions={questions}
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
      />
    </Dialog>
  );
}
