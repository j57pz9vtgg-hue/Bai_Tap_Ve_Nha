import { NationalIllustration } from "./NationalIllustration";
import { Paper7Illustration } from "./Paper7Illustration";
import { Paper6Illustration } from "./Paper6Illustration";
import { Paper5Illustration } from "./Paper5Illustration";
import { Paper4Illustration } from "./Paper4Illustration";
import { Paper3Illustration } from "./Paper3Illustration";
import { Paper2Illustration } from "./Paper2Illustration";
import type { QuestionDiagram } from "./data";

type DiagramProps = { diagram?: QuestionDiagram; solution?: boolean };
export function BellIcon() {
  return (
    <svg
      className="inline-bell"
      viewBox="0 0 70 85"
      role="img"
      aria-label="Cái chuông che số"
    >
      <g stroke="#25251d" strokeWidth="2.4" fill="#ffda56">
        <circle cx="35" cy="8" r="5" fill="white" />
        <circle cx="35" cy="74" r="7" />
        <path d="M13 60c5-8 2-21 5-32 5-20 30-20 35 0 3 11 0 24 5 32l5 7c2 4-1 7-5 7H12c-4 0-7-3-5-7z" />
        <path d="M16 64h36" fill="none" />
      </g>
    </svg>
  );
}
function Hat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#392b21" strokeWidth="1.3">
      <path d="M-14 4c-8 1-4 10 14 10S22 5 14 4" fill="#e9a373" />
      <path d="M-10 6l2-16c4-5 12-5 16 0l2 16c-7 4-13 4-20 0z" fill="#df9060" />
      <path d="M-9 1c6 4 12 4 18 0v5c-6 4-12 4-18 0z" fill="#9f5633" />
      <path d="M-8-10c4 4 12 4 16 0" fill="none" />
    </g>
  );
}
function HatGroups() {
  const groups = [
    {
      cols: 3,
      rows: 2,
      hats: [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ],
    },
    {
      cols: 5,
      rows: 3,
      hats: [
        [0, 0],
        [2, 0],
        [4, 0],
        [1, 1],
        [2, 1],
        [3, 1],
        [2, 2],
      ],
    },
    {
      cols: 7,
      rows: 4,
      hats: [
        [0, 0],
        [3, 0],
        [6, 0],
        [1, 1],
        [3, 1],
        [5, 1],
        [2, 2],
        [3, 2],
        [4, 2],
        [3, 3],
      ],
    },
  ];
  return (
    <div className="hat-groups">
      {groups.map((g, i) => (
        <figure key={i}>
          <svg
            viewBox={`0 0 ${g.cols * 46 + 4} ${g.rows * 46 + 4}`}
            role="img"
            aria-label={`Nhóm ${i + 1}: hình chiếc mũ trong lưới ${g.cols} cột, ${g.rows} hàng`}
          >
            <g stroke="#111" strokeWidth="2" fill="none">
              <rect x="2" y="2" width={g.cols * 46} height={g.rows * 46} />
              {Array.from({ length: g.cols - 1 }, (_, n) => (
                <path
                  key={`v${n}`}
                  d={`M${(n + 1) * 46 + 2} 2v${g.rows * 46}`}
                />
              ))}
              {Array.from({ length: g.rows - 1 }, (_, n) => (
                <path
                  key={`h${n}`}
                  d={`M2 ${(n + 1) * 46 + 2}h${g.cols * 46}`}
                />
              ))}
            </g>
            {g.hats.map(([x, y], n) => (
              <Hat key={n} x={x * 46 + 25} y={y * 46 + 24} />
            ))}
          </svg>
          <figcaption>
            {i + 1}
            <sup>{i === 0 ? "st" : i === 1 ? "nd" : "rd"}</sup> group
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
function OperationChain({ solution }: { solution: boolean }) {
  return (
    <svg
      viewBox={`0 0 730 ${solution ? 160 : 120}`}
      role="img"
      aria-label={
        solution
          ? "Chuỗi lời giải: 8 cộng 2 được 10, cộng 7 được 17, trừ 5 được 12; chiều ngược lại: cộng 5, trừ 7, trừ 2."
          : "Tam giác có dấu hỏi, cộng 2 tới hình vuông trống, cộng 7 tới ngũ giác trống, trừ 5 tới lục giác ghi 12."
      }
    >
      <defs>
        <marker
          id={solution ? "chain-s-arrow" : "chain-q-arrow"}
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M0 0L8 3 0 6z" />
        </marker>
      </defs>
      <g fill="#fff3ce" stroke="#191919" strokeWidth="2">
        <path d="M10 110L60 16l50 94z" />
        <rect x="211" y="16" width="90" height="94" />
        <path d="M415 16l48 35-19 59h-59l-19-59z" />
        <path d="M600 16h65l30 47-30 47h-65l-30-47z" />
      </g>
      <g
        stroke="#111"
        strokeWidth="4"
        markerEnd={`url(#${solution ? "chain-s-arrow" : "chain-q-arrow"})`}
      >
        <path d="M120 64h74" />
        <path d="M317 64h34" />
        <path d="M479 64h74" />
      </g>
      <g className="diagram-text" textAnchor="middle" fontSize="27">
        <text x="158" y="48">
          + 2
        </text>
        <text x="335" y="48">
          + 7
        </text>
        <text x="516" y="48">
          − 5
        </text>
      </g>
      <g className="diagram-text" textAnchor="middle" fontSize="42">
        <text x="60" y="92">
          {solution ? "8" : "?"}
        </text>
        {solution && (
          <>
            <text x="256" y="78">
              10
            </text>
            <text x="415" y="80">
              17
            </text>
          </>
        )}
        <text x="632" y="80">
          12
        </text>
      </g>
      {solution && (
        <>
          <g stroke="#111" strokeWidth="3" markerEnd="url(#chain-s-arrow)">
            <path d="M194 127h-74" />
            <path d="M350 127h-33" />
            <path d="M553 127h-74" />
          </g>
          <g className="diagram-text" textAnchor="middle" fontSize="23">
            <text x="158" y="154">
              − 2
            </text>
            <text x="335" y="154">
              − 7
            </text>
            <text x="516" y="154">
              + 5
            </text>
          </g>
        </>
      )}
    </svg>
  );
}
function SquareLines({ solution = false }: { solution?: boolean }) {
  const grid = (
    <g fill="none" stroke="#111" strokeWidth="2">
      <path d="M0 0h120v90H0zM60 0v90M0 60h120M30 30h60v60H30z" />
    </g>
  );
  if (!solution)
    return (
      <svg
        viewBox="-8 -8 136 106"
        role="img"
        aria-label="Hình chữ nhật ngoài, đường dọc giữa, đường ngang phía dưới và hình vuông ở giữa theo đề"
      >
        {grid}
      </svg>
    );
  return (
    <svg
      viewBox="-8 -8 436 112"
      role="img"
      aria-label="Ba hình trong lời giải: đánh số các hình vuông 1 đến 6, tô hai hình 7 và 8, tô hình 9 ở giữa"
    >
      {[0, 150, 300].map((x, i) => (
        <g key={i} transform={`translate(${x} 0)`}>
          {i === 1 && (
            <>
              <rect width="60" height="60" fill="#bfc0be" />
              <rect x="60" width="60" height="60" fill="#bfc0be" />
            </>
          )}
          {i === 2 && (
            <rect x="30" y="30" width="60" height="60" fill="#bfc0be" />
          )}
          {i === 0 ? (
            grid
          ) : (
            <g fill="none" stroke="#111" strokeWidth="2">
              <path
                d={
                  i === 1
                    ? "M0 0h120v90H0zM60 0v90M0 60h120M30 60v30M90 60v30"
                    : "M0 0h120v90H0zM60 0v30M0 60h30M90 60h30M30 30h60v60H30z"
                }
              />
            </g>
          )}
          <g fontSize="18" className="diagram-text" textAnchor="middle">
            {i === 0 ? (
              <>
                {[
                  [45, 46],
                  [75, 46],
                  [15, 77],
                  [45, 77],
                  [75, 77],
                  [105, 77],
                ].map(([x, y], n) => (
                  <text key={n} x={x} y={y}>
                    {n + 1}
                  </text>
                ))}
              </>
            ) : i === 1 ? (
              <>
                <text x="30" y="36">
                  7
                </text>
                <text x="90" y="36">
                  8
                </text>
              </>
            ) : (
              <text x="60" y="66">
                9
              </text>
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}
export function ShapeIcon({
  index,
  x = 0,
  y = 0,
}: {
  index: number;
  x?: number;
  y?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#050505">
      {index === 0 ? (
        <path d="M0-14L4-4h11L6 3l4 12L0 8l-10 7 4-12-9-7h11z" />
      ) : index === 1 ? (
        <path d="M0-14L14 0 0 14-14 0z" />
      ) : index === 2 ? (
        <circle r="13" />
      ) : (
        <path d="M0-15L15 14h-30z" />
      )}
    </g>
  );
}
function ShapePattern({ solution = false }: { solution?: boolean }) {
  const indices = [0, 1, 2, 0, 3, 2, 0, 1, 2, 0, -1, 2, 0, 1, 2, 0, 3, 2];
  return (
    <svg
      viewBox="0 0 648 52"
      role="img"
      aria-label={
        solution
          ? "Ba nhóm sáu hình theo lời giải; chỗ trống được điền hình tam giác."
          : "Dãy ngôi sao, hình thoi, hình tròn, ngôi sao, tam giác, hình tròn lặp lại; một hình bị che bởi dấu hỏi."
      }
    >
      {solution &&
        [0, 1, 2].map((i) => (
          <rect
            key={i}
            x={i * 216 + 1}
            y="5"
            width="215"
            height="40"
            fill="none"
            stroke="#111"
          />
        ))}
      {indices.map((n, i) =>
        n === -1 && !solution ? (
          <text
            key={i}
            x={18 + i * 36}
            y="36"
            textAnchor="middle"
            fontSize="28"
          >
            ?
          </text>
        ) : (
          <ShapeIcon key={i} index={n === -1 ? 3 : n} x={18 + i * 36} y={25} />
        ),
      )}
    </svg>
  );
}
function Cubes({
  count = false,
  solution = false,
}: {
  count?: boolean;
  solution?: boolean;
}) {
  // Explicit visible face positions and annotations traced from the supplied figures.
  const faces = count
    ? [
        { x: 126, y: 38, label: "3", top: true },
        { x: 126, y: 78 },
        { x: 126, y: 118 },
        { x: 166, y: 78, label: "2", top: true },
        { x: 166, y: 118 },
        { x: 46, y: 78, label: "2", top: true },
        { x: 46, y: 118 },
        { x: 86, y: 118, label: "1", top: true },
        { x: 34, y: 132, label: "1", top: true },
        { x: 20, y: 146, label: "1", top: true },
        { x: 112, y: 132, label: "1", top: true },
        { x: 152, y: 132, label: "1", top: true },
      ]
    : [
        { x: 126, y: 38, label: "6" },
        { x: 166, y: 78, label: "8" },
        { x: 32, y: 92, label: "2" },
        { x: 112, y: 92, label: "5" },
        { x: 72, y: 132, label: "3" },
        { x: 152, y: 132, label: "7" },
        { x: 20, y: 146, label: "1" },
        { x: 88, y: 158, label: "4" },
      ];
  return (
    <svg
      viewBox="0 10 235 210"
      role="img"
      aria-label={
        count
          ? solution
            ? "Hình khối lập phương, ghi số khối mỗi chồng theo lời giải: 1, 1, 1, 1, 1, 2, 2, 3."
            : "Các khối lập phương xếp thành các cột theo hình của đề."
          : solution
            ? "Hình khối trong lời giải, tám mặt nhìn từ phía trước được đánh số 1 đến 8."
            : "Hình các khối lập phương theo đề, nhìn nghiêng từ phía trước."
      }
    >
      {faces.map((f, i) => (
        <g key={i} stroke="#17212a" strokeWidth="1.5">
          <path d={`M${f.x} ${f.y}l14-14h40l-14 14z`} fill="#e6f1f7" />
          <path d={`M${f.x + 40} ${f.y}l14-14v40l-14 14z`} fill="#b3c6d1" />
          <rect x={f.x} y={f.y} width="40" height="40" fill="#deedf7" />
          {solution && f.label && (
            <text
              className="diagram-text"
              x={f.x + 20 + (count ? 7 : 0)}
              y={f.y + (count ? -2 : 26)}
              fontSize="16"
              textAnchor="middle"
              stroke="none"
              fill="#111"
            >
              {f.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
function Boat({ solution = false }: { solution?: boolean }) {
  const points = [
    [130, 10],
    [156, 69],
    [171, 104],
    [128, 128],
    [25, 128],
    [242, 128],
    [64, 173],
    [199, 173],
  ];
  return (
    <svg
      viewBox="10 0 250 190"
      role="img"
      aria-label={
        solution
          ? "Hình thuyền, các đoạn thẳng đơn được đánh số từ 1 đến 10 theo lời giải."
          : "Hình thuyền gồm thân, cột buồm, cánh buồm và các điểm nối theo đề."
      }
    >
      <g fill="none" stroke="#181818" strokeWidth="2">
        <path d="M130 10L128 128 156 69 171 104 128 128M130 10l26 59M25 128h217l-43 45H64z" />
      </g>
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#111" />
      ))}
      {solution &&
        [
          [118, 70],
          [150, 39],
          [170, 87],
          [143, 96],
          [158, 122],
          [76, 119],
          [188, 119],
          [47, 160],
          [130, 187],
          [225, 161],
        ].map(([x, y], i) => (
          <text key={i} className="diagram-text" x={x} y={y} fontSize="17">
            {i + 1}
          </text>
        ))}
    </svg>
  );
}
function Food({ type }: { type: number }) {
  return (
    <g stroke="#2e3026" strokeWidth="1.5">
      {type === 0 ? (
        <>
          <path
            d="M-16 12c-9-15 1-31 13-30 19-3 28 16 16 29-8 11-24 10-29 1z"
            fill="#d76a59"
          />
          <path
            d="M-10 7c-6-8-1-19 7-18 12-4 19 9 12 17-6 8-15 9-19 1z"
            fill="#a83e31"
          />
          <path
            d="M-2-10l4 13 7-4"
            stroke="#fff4cb"
            strokeWidth="4"
            fill="none"
          />
        </>
      ) : type === 1 ? (
        <>
          <path
            d="M-1 2c-18-5-12-23 0-20 15-6 23 15 9 21l-8 7-8-2z"
            fill="#d98e2a"
          />
          <path d="M-7 7l-8 9c-6-4-10 2-5 5 0 7 7 6 8 1l9-11" fill="#fff6db" />
        </>
      ) : type === 2 ? (
        <>
          <path
            d="M-21-3c10-15 15-8 24-7 21-8 23 13 6 17-12-2-18-1-26-1z"
            fill="#cb7357"
          />
          <path
            d="M-15-1c9-8 13-2 22-3s12 4 1 5c-12-3-15 1-23-2z"
            fill="#974634"
          />
          <path
            d="M-15-6c11-10 16-1 25-1M-16 4c10-3 15 3 26 0"
            stroke="#f5d4a0"
            fill="none"
          />
        </>
      ) : type === 3 ? (
        <>
          <ellipse
            cx="-5"
            cy="-3"
            rx="12"
            ry="19"
            fill="#c4a16b"
            transform="rotate(35)"
          />
          <ellipse
            cx="8"
            cy="8"
            rx="11"
            ry="15"
            fill="#d4b987"
            transform="rotate(35)"
          />
          <path d="M-7-13l2 2M-9 0l2 1M6 6l2 2M7 15l2 1" fill="none" />
        </>
      ) : type === 4 ? (
        <>
          <circle cy="4" r="17" fill="#e74d39" />
          <path d="M0-17l3 8 9-3-5 7-6-2-7 5 1-9-7-3 10 1z" fill="#64a24d" />
        </>
      ) : (
        <>
          <circle r="20" fill="#b5de7b" />
          <path
            d="M0-18c-13 9 4 14-3 24M13-12C-1-7 9 5 3 17M-17-4C-7-7-8 6-13 12M17 1c-8-4-7 6-6 10M-5-16C8-9-2-4 1 0M-15 7c5 1 6 5 6 10"
            fill="none"
            stroke="#45823d"
          />
        </>
      )}
    </g>
  );
}
function FoodChoices({ solution = false }: { solution?: boolean }) {
  if (solution)
    return (
      <svg
        viewBox="0 0 405 165"
        role="img"
        aria-label="Chín cách kết hợp trong lời giải: mỗi loại thịt bò, gà, lợn kết hợp với mỗi loại khoai tây, cà chua, bắp cải."
      >
        {[0, 1, 2].flatMap((row) =>
          [0, 1, 2].map((col) => (
            <g
              key={`${row}-${col}`}
              transform={`translate(${col * 135} ${row * 55})`}
            >
              <rect
                x="2"
                y="2"
                width="129"
                height="51"
                rx="8"
                fill="#e2eef5"
                stroke="#333"
              />
              <g transform="translate(28 28)">
                <Food type={row} />
              </g>
              <text x="58" y="34" fontSize="24">
                +
              </text>
              <g transform="translate(101 28)">
                <Food type={col + 3} />
              </g>
            </g>
          )),
        )}
      </svg>
    );
  return (
    <svg
      viewBox="0 0 180 175"
      role="img"
      aria-label="Một nhóm gồm thịt bò, gà, lợn; dấu cộng; một nhóm gồm khoai tây, cà chua, bắp cải."
    >
      <rect
        x="8"
        y="4"
        width="58"
        height="164"
        rx="9"
        fill="#e2eef5"
        stroke="#333"
      />
      <rect
        x="112"
        y="4"
        width="58"
        height="164"
        rx="9"
        fill="#e2eef5"
        stroke="#333"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <g transform={`translate(37 ${32 + i * 52})`}>
            <Food type={i} />
          </g>
          <g transform={`translate(141 ${32 + i * 52})`}>
            <Food type={i + 3} />
          </g>
        </g>
      ))}
      <text x="79" y="94" fontSize="28">
        +
      </text>
    </svg>
  );
}
export const hasSolutionDiagram = (diagram?: QuestionDiagram) =>
  diagram !== undefined &&
  [
    "n3-squares",
    "n3-segments",
    "n3-cubes",
    "n2-segments",
    "n2-cubes",
    "n2-rectangles",
    "n1-cubes",
    "n1-segments",
    "n1-polygon",
    "p7-arrow-groups",
    "p7-squares",
    "p7-cubes-right",
    "p7-segments",
    "p6-squares",
    "p6-cubes-side",
    "p5-inverse",
    "p5-cubes-count",
    "p5-cubes-top",
    "p5-triangles",
    "p5-max-squares",
    "p5-flowers-table",
    "p4-chess",
    "p4-shapes",
    "p4-cubes-count",
    "p4-cubes-right",
    "p4-squares",
    "p4-segments",
    "p4-arrows",
    "p4-cakes",
    "p3-backpack",
    "p3-chain",
    "p3-squares",
    "p3-shapes",
    "p3-cubes-right",
    "p3-segments",
    "p3-cubes-count",
    "bell-equation",
    "operation-chain",
    "square-lines",
    "shape-pattern",
    "p2-flowers",
    "p2-tree",
    "p2-chain",
    "p2-squares",
    "p2-shapes",
    "p2-cubes-front",
    "p2-segments",
    "p2-cubes-count",
    "cubes-front",
    "boat-segments",
    "cubes-count",
    "food-choices",
  ].includes(diagram);
export function QuestionIllustration({
  diagram,
  solution = false,
}: DiagramProps) {
  if (!diagram) return null;
  if (/^n\d+-/.test(diagram)) {
    if (solution && !hasSolutionDiagram(diagram)) return null;
    const dash = diagram.indexOf("-");
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <NationalIllustration
          paper={Number(diagram.slice(1, dash))}
          name={diagram.slice(dash + 1)}
          solution={solution}
        />
      </div>
    );
  }
  if (diagram.startsWith("p7-")) {
    if (solution && !hasSolutionDiagram(diagram)) return null;
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <Paper7Illustration name={diagram.slice(3)} solution={solution} />
      </div>
    );
  }
  if (diagram.startsWith("p6-")) {
    if (solution && !hasSolutionDiagram(diagram)) return null;
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <Paper6Illustration name={diagram.slice(3)} solution={solution} />
      </div>
    );
  }
  if (diagram.startsWith("p5-")) {
    if (
      ["p5-inverse", "p5-max-squares", "p5-flowers-table"].includes(diagram) &&
      !solution
    )
      return null;
    if (solution && !hasSolutionDiagram(diagram)) return null;
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <Paper5Illustration name={diagram.slice(3)} solution={solution} />
      </div>
    );
  }
  if (diagram.startsWith("p4-")) {
    if (diagram === "p4-chess" && !solution) return null;
    if (solution && !hasSolutionDiagram(diagram)) return null;
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <Paper4Illustration name={diagram.slice(3)} solution={solution} />
      </div>
    );
  }
  if (diagram.startsWith("p3-")) {
    if (solution && !hasSolutionDiagram(diagram)) return null;
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <Paper3Illustration name={diagram.slice(3)} solution={solution} />
      </div>
    );
  }
  if (diagram.startsWith("p2-")) {
    if (
      solution &&
      ![
        "p2-flowers",
        "p2-tree",
        "p2-chain",
        "p2-squares",
        "p2-shapes",
        "p2-cubes-front",
        "p2-segments",
        "p2-cubes-count",
      ].includes(diagram)
    )
      return null;
    return (
      <div className={`question-illustration illustration-${diagram}`}>
        <Paper2Illustration name={diagram.slice(3)} solution={solution} />
      </div>
    );
  }
  if (solution && !hasSolutionDiagram(diagram)) return null;
  return (
    <div className={`question-illustration illustration-${diagram}`}>
      {diagram === "sequence-1" ? (
        <div className="diagram-number-line">2、6、11、17、___、32、41</div>
      ) : diagram === "hat-groups" ? (
        <HatGroups />
      ) : diagram === "bell-equation" ? (
        <div className="bell-equations">
          {solution ? (
            <>
              <div>
                5 + <BellIcon /> = 29 − 6
              </div>
              <div>
                5 + <BellIcon /> = 23
              </div>
              <div>
                <BellIcon /> = 23 − 5
              </div>
              <div>
                <BellIcon /> = 18
              </div>
            </>
          ) : (
            <div>
              5 + <BellIcon /> = 29 − 6
            </div>
          )}
        </div>
      ) : diagram === "operation-chain" ? (
        <OperationChain solution={solution} />
      ) : diagram === "letter-addition" ? (
        <div
          className="letter-addition"
          role="img"
          aria-label="Phép cộng dọc: AB cộng A bằng 52"
        >
          <span>A B</span>
          <span>+　 A</span>
          <span>5 2</span>
        </div>
      ) : diagram === "sequence-12" ? (
        <div className="diagram-number-line">34, 41, 48, 55, …</div>
      ) : diagram === "operation-boxes" ? (
        <div className="operation-boxes">
          {["13 + 6", "22 − 10 + 7", "25 − 11", "8 + 3", "27 − 4", "5 + 7"].map(
            (text) => (
              <span key={text}>{text}</span>
            ),
          )}
        </div>
      ) : diagram === "missing-operators" ? (
        <div className="diagram-number-line">3 __ 9 __ 5 __ 1 = 8</div>
      ) : diagram === "square-lines" ? (
        <SquareLines solution={solution} />
      ) : diagram === "shape-pattern" ? (
        <ShapePattern solution={solution} />
      ) : diagram === "cubes-front" ? (
        <Cubes solution={solution} />
      ) : diagram === "boat-segments" ? (
        <Boat solution={solution} />
      ) : diagram === "cubes-count" ? (
        <Cubes count solution={solution} />
      ) : diagram === "descending-numbers" ? (
        <div className="diagram-number-line">
          19, 33, 71, 48, 65, 97, 39, 56, 77
        </div>
      ) : diagram === "food-choices" ? (
        <FoodChoices solution={solution} />
      ) : null}
    </div>
  );
}
