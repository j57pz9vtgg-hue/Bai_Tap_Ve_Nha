import { SourceDrawing, SourceCube, SymbolStrip } from "./Paper4Illustration";
export function intersection(
  a: number[],
  b: number[],
  c: number[],
  d: number[],
) {
  const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  const p = a[0] * b[1] - a[1] * b[0],
    q = c[0] * d[1] - c[1] * d[0];
  return [
    (p * (c[0] - d[0]) - (a[0] - b[0]) * q) / den,
    (p * (c[1] - d[1]) - (a[1] - b[1]) * q) / den,
  ];
}
function SourceTable({ rows }: { rows: (number | string)[][] }) {
  return (
    <table className="national-number-table">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((v, j) => (
              <td key={j}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function Addition({
  top,
  bottom,
  total,
}: {
  top: string;
  bottom: string;
  total: string;
}) {
  return (
    <div
      className="letter-addition"
      role="img"
      aria-label={`${top} cộng ${bottom} bằng ${total}`}
    >
      <span>{top}</span>
      <span>+ {bottom}</span>
      <span>{total}</span>
    </div>
  );
}
function Mesh({
  paths,
  viewBox = "0 0 280 150",
}: {
  paths: string;
  viewBox?: string;
}) {
  return (
    <SourceDrawing label="Các đường lưới của hình trong đề" viewBox={viewBox}>
      <path d={paths} fill="none" stroke="#111" strokeWidth="1.3" />
    </SourceDrawing>
  );
}
function DotLines({
  lines,
  points,
  viewBox = "0 0 260 180",
}: {
  lines: number[][][];
  points: number[][];
  viewBox?: string;
}) {
  return (
    <SourceDrawing
      label="Đoạn thẳng và các điểm đánh dấu theo đề"
      viewBox={viewBox}
    >
      <g stroke="#111" strokeWidth="2" fill="none">
        {lines.map(([a, b], i) => (
          <path key={i} d={`M${a} ${b}`} />
        ))}
      </g>
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" />
      ))}
    </SourceDrawing>
  );
}

export function NationalIllustration({
  paper,
  name,
}: {
  paper: number;
  name: string;
}) {
  if (paper === 1) {
    if (
      [
        "sequence1",
        "letters",
        "operators",
        "sequence15",
        "sequence22",
      ].includes(name)
    )
      return (
        <div className="diagram-number-line">
          {
            (
              {
                sequence1: "20、23、27、32、38、45、53、___",
                letters: "F、S、I、Q、L、O、O、M、___",
                operators: "9 __ 10 __ 8 __ 5 = 6",
                sequence15: "200、189、178、167、156、…",
                sequence22: "3, 6, 11, 18, 27, 38, …",
              } as Record<string, string>
            )[name]
          }
        </div>
      );
    if (name === "star-groups")
      return (
        <SourceDrawing
          label="Bốn nhóm sao trong lưới, ô cuối dưới cùng bên phải để trống"
          viewBox="0 0 620 235"
        >
          {[1, 2, 3, 4].map((n, i) => {
            const x = [15, 110, 240, 410][i],
              size = 30,
              y = 155 - n * size;
            return (
              <g key={n} transform={`translate(${x} ${y})`}>
                <rect
                  width={n * size}
                  height={n * size}
                  fill="white"
                  stroke="#111"
                />
                {Array.from({ length: n - 1 }, (_, k) => (
                  <path
                    key={k}
                    d={`M${(k + 1) * size} 0v${n * size}M0 ${(k + 1) * size}h${n * size}`}
                    stroke="#111"
                  />
                ))}
                {Array.from({ length: n * n - 1 }, (_, k) => (
                  <text
                    key={k}
                    x={((k % n) + 0.5) * size}
                    y={(Math.floor(k / n) + 0.5) * size + 6}
                    fontSize="21"
                    textAnchor="middle"
                  >
                    ✱
                  </text>
                ))}
                <text
                  x={(n * size) / 2}
                  y={205 - y}
                  fontSize="15"
                  textAnchor="middle"
                >
                  {i + 1}
                  {["st", "nd", "rd", "th"][i]} Group
                </text>
              </g>
            );
          })}
        </SourceDrawing>
      );
    if (name === "addition")
      return (
        <div
          className="letter-addition"
          role="img"
          aria-label="Phép cộng dọc AA cộng BA bằng98"
        >
          <span>A A</span>
          <span>+ B A</span>
          <span>9 8</span>
        </div>
      );
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Các cột khối lập phương và hàng khối nằm ngang, quan sát từ trên"
          viewBox="0 0 410 250"
        >
          <SourceCube x={70} y={128} />
          <SourceCube x={70} y={88} />
          <SourceCube x={70} y={48} />
          <SourceCube x={136} y={102} />
          <SourceCube x={136} y={62} />
          <SourceCube x={164} y={116} />
          <SourceCube x={164} y={76} />
          <SourceCube x={245} y={76} />
          <SourceCube x={110} y={128} />
          {[204, 244, 284, 324].map((x) => (
            <SourceCube key={x} x={x} y={128} />
          ))}
        </SourceDrawing>
      );
    if (name === "segments") {
      const l = [20, 80],
        u = [160, 24],
        r = [220, 60],
        b = [152, 135],
        a = [80, 26],
        d = [184, 27];
      const points = [
        l,
        u,
        r,
        b,
        a,
        d,
        intersection(a, b, l, u),
        intersection(a, b, l, r),
        intersection(b, d, l, r),
      ];
      return (
        <SourceDrawing
          label="Các đoạn thẳng giao nhau, điểm và giao điểm theo đề"
          viewBox="0 0 250 165"
        >
          <g fill="none" stroke="#111" strokeWidth="2">
            <path d={`M${l} ${u}M${l} ${r}M${l} ${b}M${a} ${b}M${b} ${d}`} />
          </g>
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" />
          ))}
        </SourceDrawing>
      );
    }
    if (name === "polygon")
      return (
        <SourceDrawing
          label="Đa giác lõm bất quy tắc đúng các đường gấp khúc trong đề"
          viewBox="0 0 185 150"
        >
          <path
            d="M25 20 50 20 65 40 85 42 85 17 150 17 156 102 140 103 158 121 128 123 135 103 110 103 118 123 96 123 100 101 89 101 92 67 26 68Z"
            fill="white"
            stroke="#111"
            strokeWidth="1.8"
          />
        </SourceDrawing>
      );
    if (name === "shapes")
      return (
        <SymbolStrip
          label="Dãy vuông đen, sao và tròn đen với chỗ trống theo đề"
          symbols={[
            "■",
            "★",
            "●",
            "●",
            "★",
            "■",
            "★",
            "●",
            "●",
            "★",
            "＿",
            "★",
            "●",
          ]}
        />
      );
  }
  if (paper === 2) {
    if (name === "table")
      return (
        <SourceTable
          rows={[
            [2, 3, 6],
            [5, 3, 15],
            [4, 4, "?"],
            [6, 5, 30],
          ]}
        />
      );
    if (name === "letters")
      return <div className="diagram-number-line">D、H、J、N、P、___</div>;
    if (name === "sequence13")
      return <div className="diagram-number-line">89、80、71、62、…</div>;
    if (name === "operators")
      return <div className="diagram-number-line">15 __ 3 __ 7 __ 24 = 1</div>;
    if (name === "addition")
      return <Addition top="A" bottom="B A" total="1 0 4" />;
    if (name === "expressions")
      return (
        <div className="diagram-number-line">
          100÷4，15×4，6×7，3×9，2×10，4×17，60÷3
        </div>
      );
    if (name === "rectangles")
      return (
        <Mesh
          paths="M20 20H260V116H20Z M80 20V116 M140 20V116 M140 62H260 M200 20V62"
          viewBox="0 0 280 140"
        />
      );
    if (name === "segments") {
      const points = [
        [35, 20],
        [75, 20],
        [135, 20],
        [175, 20],
        [35, 60],
        [175, 60],
        [35, 120],
        [175, 120],
        [35, 160],
        [75, 160],
        [135, 160],
        [175, 160],
      ];
      return (
        <DotLines
          lines={[
            [points[0], points[3]],
            [points[3], points[11]],
            [points[11], points[8]],
            [points[8], points[0]],
            [points[4], points[1]],
            [points[2], points[5]],
            [points[7], points[10]],
            [points[9], points[6]],
          ]}
          points={points}
          viewBox="0 0 210 180"
        />
      );
    }
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Các khối lập phương, quan sát từ bên phải"
          viewBox="0 0 300 230"
        >
          {[129, 99, 69, 39].map((y) => (
            <SourceCube key={y} x={52} y={y} size={30} depth={10} />
          ))}
          {[83, 113].map((x) => (
            <SourceCube key={x} x={x} y={127} size={30} depth={10} />
          ))}
          {[128, 98, 68].map((y) => (
            <SourceCube key={y} x={140} y={y} size={30} depth={10} />
          ))}
          {[128, 98].map((y) => (
            <SourceCube key={y} x={170} y={y} size={30} depth={10} />
          ))}
          <SourceCube x={43} y={108} size={30} depth={10} />
          <SourceCube x={33} y={147} size={30} depth={10} />
          <SourceCube x={73} y={137} size={30} depth={10} />
          <SourceCube x={160} y={138} size={30} depth={10} />
          <SourceCube x={150} y={148} size={30} depth={10} />
        </SourceDrawing>
      );
  }
  return null;
}
