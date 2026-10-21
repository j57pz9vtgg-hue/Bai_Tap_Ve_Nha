import { publicAsset } from "./components";

// Positions, animal counts and the −4 annotation reproduce the supplied diagrams.
export function FarmIllustration({ solution = false }: { solution?: boolean }) {
  const rabbits = solution
    ? [
        [18, 24],
        [40, 9],
        [69, 14],
        [46, 39],
        [76, 42],
        [21, 57],
      ]
    : [
        [22, 18],
        [38, 10],
        [10, 43],
        [38, 43],
        [26, 64],
        [48, 80],
      ];
  const chickens = solution
    ? [
        [41, 74],
        [69, 72],
      ]
    : [
        [57, 8],
        [71, 27],
        [86, 31],
        [55, 43],
        [68, 72],
        [86, 69],
      ];
  return (
    <figure
      className={`farm-illustration ${solution ? "farm-solution" : ""}`}
      aria-label={
        solution
          ? "Hình lời giải: sáu con thỏ và hai con gà trong vòng bầu dục; mũi tên xuống ghi trừ 4, dấu hỏi và một con gà bên dưới, theo tài liệu gốc."
          : "Hình đề bài: sáu con thỏ bên trái và sáu con gà bên phải trong vòng bầu dục, theo tài liệu gốc."
      }
    >
      <div className="farm-oval" aria-hidden="true">
        {rabbits.map(([left, top], i) => (
          <img
            className="farm-animal"
            key={`rabbit-${i}`}
            src={publicAsset("workbook-rabbit")}
            alt=""
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
        {chickens.map(([left, top], i) => (
          <img
            className="farm-animal"
            key={`hen-${i}`}
            src={publicAsset("workbook-hen")}
            alt=""
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
      {solution && (
        <div className="farm-replacement" aria-hidden="true">
          <div className="farm-arrow">
            <span>↓</span>
            <strong>− 4</strong>
          </div>
          <div className="farm-question">
            <span>?</span>
            <img src={publicAsset("workbook-hen")} alt="" />
          </div>
        </div>
      )}
    </figure>
  );
}
