import { useMemo, useState } from "react";
import { QuestionPreview } from "./QuestionPreview";
import { TopicExample } from "./TopicExample";
import { Dialog } from "./components";
import { getExercises, getQuestions } from "./data";
import type { Question } from "./data";
import { questionId, readUserTopics, saveUserTopics } from "./topicStore";

export function ClassifyQuestion({
  question,
  onClose,
  onSaved,
}: {
  question: Question;
  onClose: () => void;
  onSaved: () => void;
}) {
  const sources = useMemo(
    () =>
      ["qualifier", "national"].flatMap((category) =>
        getExercises("timo", category as "qualifier" | "national", 2).flatMap(
          (paper) => getQuestions(2, "timo", paper),
        ),
      ),
    [],
  );
  const [loaded] = useState(() => {
    try {
      return { topics: readUserTopics(sources) ?? [], error: "" };
    } catch {
      return {
        topics: [],
        error:
          "Không đọc được chủ đề đã lưu. Vui lòng kiểm tra bộ nhớ trình duyệt.",
      };
    }
  });
  const [topicId, setTopicId] = useState(loaded.topics.length ? "" : "__new__");
  const [title, setTitle] = useState("");
  const [example, setExample] = useState(false);
  const [error, setError] = useState(loaded.error);
  const selectedTopic = loaded.topics.find((topic) => topic.id === topicId);
  function assign() {
    try {
      const latest = readUserTopics(sources) ?? [];
      let target = latest.find((topic) => topic.id === topicId);
      if (topicId === "__new__") {
        if (!title.trim()) {
          setError("Vui lòng nhập tên chủ đề mới.");
          return;
        }
        if (
          latest.some(
            (topic) =>
              topic.title.toLocaleLowerCase() ===
              title.trim().toLocaleLowerCase(),
          )
        ) {
          setError("Tên chủ đề đã có. Hãy chọn chủ đề đó trong danh sách.");
          return;
        }
        target = {
          id: `user-topic-v2-${crypto.randomUUID()}`,
          title: title.trim(),
          questionIds: [],
          examples: [],
        };
        latest.push(target);
      }
      if (!target) {
        setError(
          "Vui lòng chọn chủ đề. Nếu chủ đề vừa bị xóa, hãy đóng và mở lại cửa sổ này.",
        );
        return;
      }
      const id = questionId(question);
      const updated = {
        ...target,
        questionIds: [...new Set([...target.questionIds, id])],
        examples:
          example && !target.examples.some((q) => questionId(q) === id)
            ? [...target.examples, question]
            : target.examples,
      };
      saveUserTopics(
        latest.map((topic) => (topic.id === updated.id ? updated : topic)),
      );
      onSaved();
      onClose();
    } catch {
      setError(
        "Không lưu được phân loại. Câu hỏi vẫn được giữ trong danh sách chưa có chủ đề.",
      );
    }
  }
  return (
    <Dialog
      title="Phân loại chủ đề"
      className="classify-question-dialog"
      onClose={onClose}
    >
      <h2>Phân loại chủ đề</h2>
      <p className="classification-source">
        {question.sourcePaper} · Câu {question.sourceNumber}
      </p>
      <section className="classification-question" aria-label="Câu hỏi đang phân loại">
        <QuestionPreview question={question} />
      </section>
      <label className="topic-field">
        Chọn chủ đề
        <select
          aria-label="Chọn chủ đề để phân loại"
          className="classification-topic-list"
          size={Math.min(6, Math.max(3, loaded.topics.length + 2))}
          value={topicId}
          onChange={(event) => {
            setTopicId(event.target.value);
            setError(loaded.error);
          }}
        >
          <option value="" disabled>
            Chọn một chủ đề
          </option>
          {loaded.topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
          <option value="__new__">+ Tạo chủ đề mới</option>
        </select>
      </label>
      {topicId === "__new__" && (
        <label className="topic-field">
          Tên chủ đề mới
          <input
            maxLength={120}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      )}
      <section className="classification-topic-example" aria-label="Bài mẫu của chủ đề đã chọn">
        {selectedTopic?.examples.length ? (
          <TopicExample
            key={selectedTopic.id}
            exercise={{ id: selectedTopic.id, title: selectedTopic.title, category: "topic", questionCount: 0, examples: selectedTopic.examples }}
            defaultExpanded
            hasDraft={false}
            onPractice={() => {}}
          />
        ) : (
          <p className="classification-source">{selectedTopic || topicId === "__new__" ? "Chủ đề này chưa có bài mẫu." : "Chọn chủ đề để xem bài mẫu."}</p>
        )}
      </section>
      <label className="classify-example">
        <input
          type="checkbox"
          checked={example}
          onChange={(event) => setExample(event.target.checked)}
        />{" "}
        Gắn câu này làm bài mẫu
      </label>
      {example && (
        <p className="classification-source">
          Bài mẫu và lời giải được xem công khai trong chủ đề.
        </p>
      )}
      {error && (
        <p role="alert" className="topic-error">
          {error}
        </p>
      )}
      <div className="topic-editor-footer">
        <button
          className="primary-button"
          disabled={Boolean(loaded.error)}
          onClick={assign}
        >
          Gắn vào chủ đề
        </button>
        <button className="secondary-button" onClick={onClose}>
          Hủy
        </button>
      </div>
    </Dialog>
  );
}
