import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog } from "./components";

// Transcribed exclusively from the owner's supplied Age problem example.
export function TopicExample({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <Dialog
      title="Bài toán về tuổi (Age problem)"
      className="topic-example-dialog"
      onClose={onClose}
    >
      <p className="topic-source">TIMO · Lớp 2 · Luyện theo chủ đề</p>
      <h1>
        Bài toán về tuổi <span>(Age problem)</span>
      </h1>
      <section aria-labelledby="age-example-title">
        <h2 id="age-example-title">
          <BookOpen size={23} /> Ví dụ
        </h2>
        <p lang="en" className="age-example-question">
          The age of Amy 7 years later is equal to the age of John 3 years
          later. Given that John is 25 years old now, how old is Amy now?
        </p>
        <p className="age-example-translation">
          Tuổi của Amy 7 năm sau bằng tuổi của John 3 năm sau. Biết rằng hiện
          tại John 25 tuổi. Hỏi hiện tại Amy bao nhiêu tuổi?
        </p>
        <button
          className="age-solution-toggle"
          aria-expanded={expanded}
          aria-controls="age-solution"
          onClick={() => setExpanded(!expanded)}
        >
          Lời giải của bài ví dụ{" "}
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expanded && (
          <div id="age-solution" className="age-solution" lang="en">
            <section aria-labelledby="age-method-one">
              <h3 id="age-method-one">Method 1</h3>
              <p>The age of John 3 years later is:</p>
              <p>25 + 3 = 28 (years old)</p>
              <p>
                Since the age of Amy 7 years later is equal to the age of John 3
                years later, Amy’s age 7 years later is 28 years old.
              </p>
              <p>The age of Amy now is: 28 − 7 = 21 (years old).</p>
            </section>
            <section aria-labelledby="age-method-two">
              <h3 id="age-method-two">Method 2</h3>
              <p>
                Since the age of Amy 7 years later is equal to the age of John 3
                years later, Amy is younger than John 4 years old.
              </p>
              <p>Moreover, John is 25 years old now.</p>
              <p>Therefore, Amy is: 25 − 4 = 21 (years old).</p>
            </section>
          </div>
        )}
      </section>
      <p className="topic-awaiting">
        Chưa có câu luyện tập cho chủ đề này. Các câu phù hợp sẽ được bổ sung từ
        bộ đề bạn gửi.
      </p>
      <button className="primary-button" onClick={onClose}>
        Về danh sách chủ đề
      </button>
    </Dialog>
  );
}
