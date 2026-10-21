import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog } from "./components";
import { FarmIllustration } from "./FarmIllustration";

// Transcribed exclusively from the owner's supplied Age problem example.
export function TopicExample({
  exerciseId,
  onClose,
}: {
  exerciseId: string;
  onClose: () => void;
}) {
  if (exerciseId === "problem-type-1")
    return <ProblemTypeOneExample onClose={onClose} />;
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

// Exact question, bilingual steps and answer supplied by the owner.
const animalSolution = [
  ["Assume that all animals are rabbits", "Giả sử tất cả con vật đều là thỏ."],
  [
    "The number of legs in total are 36 x 4 = 144 (legs)",
    "Khi đó, tổng số chân là: 36 x 4 = 144 (chân)",
  ],
  [
    "Therefore, the excessive legs are 144 − 100 = 44 (legs)",
    "Như vậy, số chân thừa là: 144 − 100 = 44 (chân)",
  ],
  [
    "The number of chickens are 44 : 2 = 22 (chickens)",
    "Số gà sẽ là: 44 : 2 = 22 (con gà)",
  ],
  [
    "The number of rabbits are 36 − 22 = 14 (rabbits)",
    "Số thỏ sẽ là: 36 − 22 = 14 (con thỏ)",
  ],
];
function ProblemTypeOneExample({ onClose }: { onClose: () => void }) {
  const [activeExample, setActiveExample] = useState(1);
  const [expanded, setExpanded] = useState(true);
  const [secondExpanded, setSecondExpanded] = useState(true);
  return (
    <Dialog
      title="Dạng bài 1 (Problem type 1)"
      className="topic-example-dialog compact-topic-dialog"
      onClose={onClose}
    >
      <p className="topic-source">TIMO · Lớp 2 · Luyện theo chủ đề</p>
      <h1>
        Dạng bài 1 <span>(Problem type 1)</span>
      </h1>
      <div className="example-tabs" role="group" aria-label="Chọn ví dụ">
        <button
          aria-pressed={activeExample === 1}
          onClick={() => setActiveExample(1)}
        >
          Ví dụ 1 · Problem type 1
        </button>
        <button
          aria-pressed={activeExample === 2}
          onClick={() => setActiveExample(2)}
        >
          Ví dụ 2 · Problem type 2
        </button>
      </div>
      <section
        className="compact-example-layout"
        hidden={activeExample !== 1}
        aria-labelledby="animal-example-title"
      >
        <div className="compact-example-question">
          <h2 id="animal-example-title">
            <BookOpen size={23} /> Ví dụ 1 · Problem type 1
          </h2>
          <div className="age-example-question" lang="en">
            <p>
              There are 36 animals including chickens and rabbits on a farm.
              They can count 100 legs in total.
            </p>
            <p>
              How many chickens are there?
              <br />
              How many rabbits are there?
            </p>
          </div>
          <div className="age-example-translation">
            <p>
              Có 36 con vật bao gồm con gà và thỏ trong một nông trại. Người ta
              đếm được tổng số 100 cái chân.
            </p>
            <p>
              Hỏi có bao nhiêu con gà?
              <br />
              Hỏi có bao nhiêu con thỏ?
            </p>
          </div>
          <FarmIllustration />
        </div>
        <div className="compact-example-answer">
          <button
            className="age-solution-toggle"
            aria-expanded={expanded}
            aria-controls="animal-solution"
            onClick={() => setExpanded(!expanded)}
          >
            Lời giải ví dụ 1{" "}
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expanded && (
            <div
              id="animal-solution"
              className="age-solution animal-illustrated-solution"
            >
              <section>
                <h3>Solution</h3>
                {animalSolution.map(([english, vietnamese], i) => (
                  <div className="bilingual-solution-step" key={i}>
                    <p lang="en">{english}</p>
                    <p className="solution-translation">{vietnamese}</p>
                  </div>
                ))}
                <p lang="en">
                  <strong>Ans. 22 chickens. 14 rabbits</strong>
                </p>
              </section>
              <FarmIllustration solution />
            </div>
          )}
        </div>
      </section>
      <section
        className="compact-example-layout"
        hidden={activeExample !== 2}
        aria-labelledby="animal-example-two-title"
      >
        <div className="compact-example-question">
          <h2 id="animal-example-two-title">
            <BookOpen size={23} /> Ví dụ 2 · Problem type 2
          </h2>
          <p className="age-example-question" lang="en">
            There are some chickens and rabbits on the farm. The number of
            chickens is 14 more than the number of rabbits. If there are 172
            legs in total, how many rabbits are there?
          </p>
          <p className="age-example-translation">
            Có một số con gà và thỏ trên một trang trại. Số gà nhiều hơn số thỏ
            14 con. Nếu tổng số chân là 172 thì hỏi có bao nhiêu con thỏ?
          </p>
        </div>
        <div className="compact-example-answer">
          <button
            className="age-solution-toggle"
            aria-expanded={secondExpanded}
            aria-controls="animal-solution-two"
            onClick={() => setSecondExpanded(!secondExpanded)}
          >
            Lời giải ví dụ 2{" "}
            {secondExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          {secondExpanded && (
            <div
              id="animal-solution-two"
              className="age-solution date-solution"
            >
              <section>
                <h3>Solution</h3>
                <div className="bilingual-solution-step">
                  <p lang="en">Let a be the number of rabbits.</p>
                  <p className="solution-translation">Gọi a là số thỏ.</p>
                </div>
                <div className="bilingual-solution-step">
                  <p lang="en">The number of chickens: a + 14 (chickens)</p>
                  <p className="solution-translation">
                    Số gà là a + 14 (con gà)
                  </p>
                </div>
                <div className="bilingual-solution-step">
                  <p lang="en">The number of rabbit’s legs: a x 4 (legs)</p>
                  <p className="solution-translation">
                    Số chân thỏ là a x 4 (chân)
                  </p>
                </div>
                <div className="bilingual-solution-step">
                  <p lang="en">
                    The number of chicken’s legs: 2 x (a + 14) (legs)
                  </p>
                  <p className="solution-translation">
                    Số chân gà là 2 x (a + 14) (chân)
                  </p>
                </div>
                <div lang="en">
                  <p>We have: a x 4 + 2 x (a + 14) = 172</p>
                  <p>a x 4 + 2 x a + 2 x 14 = 172</p>
                  <p>6 x a = 172 − 28</p>
                  <p>6 x a = 144</p>
                  <p>a = 24</p>
                  <p>
                    <strong>Ans. 24 rabbits</strong>
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
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
