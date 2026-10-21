import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog } from "./components";

// Transcribed exclusively from the owner's supplied Age problem example.
export function TopicExample({
  exerciseId,
  onClose,
}: {
  exerciseId: string;
  onClose: () => void;
}) {
  return exerciseId === "date-problem" ? (
    <DateTopicExample onClose={onClose} />
  ) : (
    <AgeTopicExample onClose={onClose} />
  );
}
function AgeTopicExample({ onClose }: { onClose: () => void }) {
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

// Both examples and solutions below are transcribed from the owner's images.
const dateExamples = [
  {
    question:
      "If the day after tomorrow will be Wednesday, which day of the week will 17 days later be?",
    translation: "Nếu ngày kia là Thứ Tư. Hỏi 17 ngày sau là thứ mấy?",
    solution: [
      "Since the day after tomorrow will be Wednesday, today is Monday.",
      "We have: 17 : 7 get the remainder 3.",
      "Therefore, 17 days later be is Thursday.",
    ],
  },
  {
    question:
      "Given that 17th February 2020 is Monday, which day of the week will it be on 27th April 2020?",
    translation:
      "Biết rằng ngày 17 tháng 2 năm 2020 là Thứ Hai. Hỏi ngày 27 tháng 4 năm 2020 là thứ mấy?",
    solution: [
      "First, we need to find out how many days from 17th February 2020 to 27th April 2020.",
      "- From 17/02/2020 to 17/03/2020, there are 29 days (note that 2020 is a leap year);",
      "- From 17/03/2020 to 17/04/2020, there are 31 days;",
      "- From 17/04/2020 to 27/04/2020, there are 10 days;",
      "⇒ Therefore, from 17/02/2020 to 27/04/2020, there are: 29 + 31 + 10 = 70 (days)",
      "Next, we have: 70 : 7 has no remainder.",
      "So, 27th April 2020 is Monday.",
    ],
  },
];
function DateTopicExample({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState([true, true]);
  return (
    <Dialog
      title="Bài toán về ngày tháng (Date Problem)"
      className="topic-example-dialog"
      onClose={onClose}
    >
      <p className="topic-source">TIMO · Lớp 2 · Luyện theo chủ đề</p>
      <h1>
        Bài toán về ngày tháng <span>(Date Problem)</span>
      </h1>
      {dateExamples.map((example, index) => (
        <section
          className="date-example"
          key={index}
          aria-labelledby={`date-example-${index}`}
        >
          <h2 id={`date-example-${index}`}>
            <BookOpen size={23} /> Ví dụ {index + 1}
          </h2>
          <p lang="en" className="age-example-question">
            {example.question}
          </p>
          <p className="age-example-translation">{example.translation}</p>
          <button
            className="age-solution-toggle"
            aria-expanded={expanded[index]}
            aria-controls={`date-solution-${index}`}
            onClick={() =>
              setExpanded((current) =>
                current.map((value, i) => (i === index ? !value : value)),
              )
            }
          >
            Lời giải ví dụ {index + 1}{" "}
            {expanded[index] ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          {expanded[index] && (
            <div
              id={`date-solution-${index}`}
              className="age-solution date-solution"
              lang="en"
            >
              <section>
                <h3>Solution</h3>
                {example.solution.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </section>
            </div>
          )}
        </section>
      ))}
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
