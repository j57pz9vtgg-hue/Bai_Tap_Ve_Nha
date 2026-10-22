import { useMemo, useState } from "react";
import { Dialog } from "./components";
import { getExercises, getQuestions } from "./data";
import type { Question } from "./data";
import { QuestionIllustration } from "./QuestionIllustration";
import { questionId, readUserTopics, saveUserTopics } from "./topicStore";
import type { UserTopic } from "./topicStore";

export default function TopicManager({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const papers = useMemo(
    () => [
      ...getExercises("timo", "qualifier", 2),
      ...getExercises("timo", "national", 2),
    ],
    [],
  );
  const questions = useMemo(
    () => papers.flatMap((p) => getQuestions(2, "timo", p)),
    [papers],
  );
  const [loaded] = useState(() => {
    try {
      return { topics: readUserTopics(questions) ?? [], error: "" };
    } catch {
      return {
        topics: [],
        error:
          "Không đọc được dữ liệu chủ đề đã lưu. Hãy kiểm tra bộ nhớ trình duyệt trước khi chỉnh sửa.",
      };
    }
  });
  const [topics, setTopics] = useState<UserTopic[]>(loaded.topics);
  const [draft, setDraft] = useState<UserTopic | null>(null);
  const [paper, setPaper] = useState("all");
  const [search, setSearch] = useState("");
  const [onlyUnassigned, setOnlyUnassigned] = useState(false);
  const [onlySelected, setOnlySelected] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState(loaded.error);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const assigned = new Set(topics.flatMap((t) => t.questionIds));
  const inPaper =
    paper === "all"
      ? questions
      : getQuestions(
          2,
          "timo",
          papers.find((p) => p.id === paper)!,
        );
  const visible = inPaper.filter(
    (q) =>
      (!onlyUnassigned || !assigned.has(questionId(q))) &&
      (!onlySelected || Boolean(draft?.questionIds.includes(questionId(q)))) &&
      `${q.sourceNumber} ${q.text} ${q.translation ?? ""}`
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
  );
  function edit(topic: UserTopic) {
    setDraft({
      ...topic,
      questionIds: [...topic.questionIds],
      examples: [...topic.examples],
    });
    setError("");
    setDeleteRequested(false);
    setOnlyUnassigned(false);
    setOnlySelected(false);
  }
  function persist(next: UserTopic[], nextTopic?: UserTopic) {
    try {
      saveUserTopics(next);
      setTopics(next);
      if (nextTopic) edit(nextTopic);
      else setDraft(null);
      setError("");
      onSaved();
    } catch {
      setError(
        "Không lưu được chủ đề. Bộ nhớ trình duyệt có thể đã đầy. Hãy thử lại.",
      );
    }
  }
  function save(nextTopic?: UserTopic) {
    if (!draft) return;
    const title = draft.title.trim();
    if (!title) {
      setError("Vui lòng nhập tên chủ đề.");
      return;
    }
    if (
      topics.some(
        (t) =>
          t.id !== draft.id &&
          t.title.toLocaleLowerCase() === title.toLocaleLowerCase(),
      )
    ) {
      setError("Tên chủ đề này đã có. Hãy chọn tên khác.");
      return;
    }
    const next = { ...draft, title };
    persist(
      topics.some((t) => t.id === draft.id)
        ? topics.map((t) => (t.id === draft.id ? next : t))
        : [...topics, next],
      nextTopic,
    );
  }
  function toggleQuestion(q: Question) {
    if (!draft) return;
    const id = questionId(q);
    setDraft({
      ...draft,
      questionIds: draft.questionIds.includes(id)
        ? draft.questionIds.filter((x) => x !== id)
        : [...draft.questionIds, id],
    });
  }
  function toggleExample(q: Question) {
    if (!draft) return;
    const id = questionId(q);
    setDraft({
      ...draft,
      examples: draft.examples.some((e) => questionId(e) === id)
        ? draft.examples.filter((e) => questionId(e) !== id)
        : [...draft.examples, q],
    });
  }
  return (
    <Dialog title="Quản lý chủ đề" className="topic-manager" onClose={onClose}>
      <h2>Quản lý chủ đề</h2>
      <p className="topic-storage-note">
        Tự chọn câu hỏi và bài mẫu cho từng chủ đề. Các thay đổi được lưu trên
        trình duyệt này.
      </p>
      {error && (
        <p role="alert" className="topic-error">
          {error}
        </p>
      )}
      {!draft ? (
        <>
          <button
            className="primary-button"
            disabled={Boolean(loaded.error)}
            onClick={() =>
              edit({
                id: `user-topic-${crypto.randomUUID()}`,
                title: "",
                questionIds: [],
                examples: [],
              })
            }
          >
            + Tạo chủ đề
          </button>
          <div className="topic-manager-list">
            {topics.map((t) => (
              <div key={t.id}>
                <span>
                  <strong>{t.title}</strong>
                  <small>
                    {t.questionIds.length} câu hỏi · {t.examples.length} bài mẫu
                  </small>
                </span>
                <button
                  onClick={() => edit(t)}
                  aria-label={`Chỉnh sửa ${t.title}`}
                >
                  Chỉnh sửa
                </button>
              </div>
            ))}
          </div>
          {!topics.length && (
            <p>
              Chưa có chủ đề. Hãy tạo chủ đề đầu tiên và chọn câu hỏi từ các bộ
              đề.
            </p>
          )}
        </>
      ) : (
        <>
          <div className="topic-name-fields">
            <label className="topic-field">
              Chọn chủ đề
              <select
                aria-label="Chọn chủ đề để chỉnh sửa"
                value={draft.id}
                onChange={(e) => {
                  const nextTopic = topics.find((t) => t.id === e.target.value);
                  if (!nextTopic) return;
                  if (
                    !draft.title.trim() &&
                    !draft.questionIds.length &&
                    !draft.examples.length
                  )
                    edit(nextTopic);
                  else save(nextTopic);
                }}
              >
                {!topics.some((t) => t.id === draft.id) && (
                  <option value={draft.id}>Chủ đề mới</option>
                )}
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="topic-field">
              Tên chủ đề
              <input
                autoFocus
                maxLength={120}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </label>
          </div>
          <p className="topic-switch-note">
            Khi chuyển chủ đề, các thay đổi hiện tại sẽ được lưu trước.
          </p>
          <section className="topic-examples-editor">
            <h3>Bài mẫu ({draft.examples.length})</h3>
            <p>
              Chọn “Gắn làm bài mẫu” ở một câu hỏi bên dưới. Bài mẫu và lời giải
              được xem công khai trong chủ đề.
            </p>
            {draft.examples.map((q, i) => (
              <div className="topic-example-item" key={i}>
                <span>
                  <small>
                    {q.sourcePaper} · Câu {q.sourceNumber}
                  </small>
                  {q.text}
                </span>
                <button
                  onClick={() =>
                    setDraft({
                      ...draft,
                      examples: draft.examples.filter((_, n) => n !== i),
                    })
                  }
                  aria-label={`Bỏ bài mẫu ${i + 1}`}
                >
                  Bỏ bài mẫu
                </button>
              </div>
            ))}
          </section>
          <h3>Chọn câu luyện tập ({draft.questionIds.length} câu đã chọn)</h3>
          <p>
            Một câu có thể thuộc nhiều chủ đề. Việc chọn câu không thay đổi bộ
            đề gốc.
          </p>
          <div className="topic-picker-filters">
            <label className="topic-field">
              Bộ đề
              <select
                aria-label="Bộ đề"
                value={paper}
                onChange={(e) => setPaper(e.target.value)}
              >
                <option value="all">Tất cả bộ đề</option>
                {papers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="topic-field">
              Tìm câu hỏi
              <input
                placeholder="Nội dung hoặc số câu…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <div className="topic-membership-filters">
            <label className="topic-unassigned-filter">
              <input
                type="checkbox"
                checked={onlyUnassigned}
                onChange={(e) => {
                  setOnlyUnassigned(e.target.checked);
                  if (e.target.checked) setOnlySelected(false);
                }}
              />
              Chỉ hiện câu chưa có chủ đề
            </label>
            <label className="topic-unassigned-filter">
              <input
                type="checkbox"
                checked={onlySelected}
                onChange={(e) => {
                  setOnlySelected(e.target.checked);
                  if (e.target.checked) setOnlyUnassigned(false);
                }}
              />
              Chỉ hiện câu đã gắn với chủ đề
            </label>
          </div>
          <div className="topic-question-picker">
            {visible.map((q) => {
              const id = questionId(q);
              const isExample = draft.examples.some(
                (e) => questionId(e) === id,
              );
              return (
                <article key={id} className="topic-question-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={draft.questionIds.includes(id)}
                      onChange={() => toggleQuestion(q)}
                      aria-label={`Chọn ${q.sourcePaper}, câu ${q.sourceNumber}`}
                    />
                    <span>
                      <small>
                        {q.sourcePaper} · Câu {q.sourceNumber}
                      </small>
                      {q.text}
                    </span>
                  </label>
                  <div className="topic-question-actions">
                    <button
                      aria-expanded={expanded === id}
                      onClick={() => setExpanded(expanded === id ? null : id)}
                    >
                      {expanded === id ? "Thu gọn" : "Xem câu hỏi"}
                    </button>
                    <button
                      aria-pressed={isExample}
                      onClick={() => toggleExample(q)}
                    >
                      {isExample ? "Bỏ bài mẫu" : "Gắn làm bài mẫu"}
                    </button>
                  </div>
                  {expanded === id && (
                    <div className="topic-question-preview">
                      <p>{q.translation}</p>
                      <QuestionIllustration diagram={q.diagram} />
                      {q.options.map((o, i) => (
                        <p key={i}>
                          {"ABCD"[i]}. {o}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
            {!visible.length && <p>Không có câu hỏi phù hợp với bộ lọc.</p>}
          </div>
          <footer className="topic-editor-footer">
            <button className="primary-button" onClick={() => save()}>
              Lưu chủ đề
            </button>
            <button
              onClick={() => {
                setDraft(null);
                setError("");
              }}
            >
              Hủy chỉnh sửa
            </button>
            {topics.some((t) => t.id === draft.id) && (
              <button
                className="topic-delete"
                onClick={() => setDeleteRequested(true)}
              >
                Xóa chủ đề
              </button>
            )}
          </footer>
          {deleteRequested && (
            <div className="topic-delete-confirm">
              <p>
                Xóa chủ đề “{draft.title}”? Các câu hỏi và kết quả đã làm vẫn
                được giữ lại.
              </p>
              <button
                onClick={() => persist(topics.filter((t) => t.id !== draft.id))}
              >
                Xác nhận xóa chủ đề
              </button>
              <button onClick={() => setDeleteRequested(false)}>Giữ lại</button>
            </div>
          )}
        </>
      )}
    </Dialog>
  );
}
