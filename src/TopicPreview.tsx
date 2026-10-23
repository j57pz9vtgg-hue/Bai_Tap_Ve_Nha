import { ArrowLeft } from "lucide-react";
import { Dialog } from "./components";
import { TopicExample } from "./TopicExample";
import type { Exercise } from "./data";

export default function TopicPreview({
  exercise,
  onClose,
}: {
  exercise: Exercise;
  onClose: () => void;
}) {
  return (
    <Dialog title={exercise.title} className="quiz-dialog paper-dialog" onClose={onClose}>
      <button className="text-button topic-preview-back" onClick={onClose}><ArrowLeft size={18} /> Về danh sách</button>
      <TopicExample exercise={exercise} hasDraft={false} onPractice={() => {}} />
    </Dialog>
  );
}
