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
  if (paper === 3) {
    if (name === "table")
      return (
        <SourceTable
          rows={[
            [5, 3, 15],
            [4, 5, 20],
            [3, 7, "?"],
            [2, 9, 18],
          ]}
        />
      );
    if (name === "letters")
      return <div className="diagram-number-line">D、G、I、L、N、___</div>;
    if (name === "sequence13")
      return <div className="diagram-number-line">96、89、82、75、…</div>;
    if (name === "operators")
      return <div className="diagram-number-line">17 __ 9 __ 6 __ 12 = 14</div>;
    if (name === "addition")
      return <Addition top="B" bottom="B A" total="5 3" />;
    if (name === "expressions")
      return (
        <div className="diagram-number-line">
          99÷3，19×2，51÷3，6×8，24×3，5×5，62÷2
        </div>
      );
    if (name === "squares")
      return (
        <Mesh
          paths="M50 20H220V54H254V122H50Z M16 54H50 M16 54V88H186 M50 20V122 M84 20V122 M118 20V122 M152 20V54 M152 88V122 M186 20V88 M220 20V122 M118 54H254 M220 88H254"
          viewBox="0 0 275 145"
        />
      );
    if (name === "segments") {
      const l = [20, 45],
        r = [220, 85],
        a = [108, 20],
        b = [55, 125],
        t = [155, 25],
        d = [140, 150];
      return (
        <DotLines
          lines={[
            [l, r],
            [a, b],
            [t, d],
            [b, d],
            [d, r],
          ]}
          points={[
            l,
            r,
            a,
            b,
            t,
            d,
            intersection(l, r, a, b),
            intersection(l, r, t, d),
          ]}
        />
      );
    }
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Các khối lập phương, quan sát từ bên phải"
          viewBox="0 0 300 240"
        >
          {[154, 119, 84, 49].map((y) => (
            <SourceCube key={y} x={45} y={y} size={35} depth={12} />
          ))}
          {[115, 150].map((x) => (
            <SourceCube key={x} x={x} y={142} size={35} depth={12} />
          ))}
          {[142, 107, 72].map((y) => (
            <SourceCube key={y} x={165} y={y} size={35} depth={12} />
          ))}
          {[142, 107].map((y) => (
            <SourceCube key={y} x={200} y={y} size={35} depth={12} />
          ))}
          <SourceCube x={150} y={119} size={35} depth={12} />
          <SourceCube x={70} y={130} size={35} depth={12} />
          <SourceCube x={58} y={177} size={35} depth={12} />
          <SourceCube x={93} y={177} size={35} depth={12} />
        </SourceDrawing>
      );
  }
  if (paper === 4) {
    if (name === "table")
      return (
        <SourceTable
          rows={[
            [3, 2, 6],
            [5, 4, 20],
            [7, 6, "?"],
            [9, 8, 72],
          ]}
        />
      );
    if (name === "letters")
      return <div className="diagram-number-line">K、N、P、S、U、___</div>;
    if (name === "sequence13")
      return <div className="diagram-number-line">94、86、78、70、62、…</div>;
    if (name === "operators")
      return <div className="diagram-number-line">9 __ 18 __ 3 __ 7 = 23</div>;
    if (name === "addition")
      return <Addition top="A" bottom="B B" total="7 3" />;
    if (name === "expressions")
      return (
        <div className="diagram-number-line">
          99÷3，19+19，51−34，6×8，24+48，5×5，15+16
        </div>
      );
    if (name === "squares")
      return (
        <Mesh
          paths="M94 15H196V83H230V117H60V83H26V49H94Z M60 49V117 M94 15V117 M128 15V117 M162 15V83 M196 15V117 M26 49H196 M26 83H162 M196 83H230"
          viewBox="0 0 255 140"
        />
      );
    if (name === "segments") {
      const l = [25, 50],
        r = [225, 90],
        t = [112, 28],
        b = [145, 145],
        a = [56, 123];
      return (
        <DotLines
          lines={[
            [l, r],
            [t, a],
            [l, b],
            [t, b],
            [a, b],
          ]}
          points={[
            l,
            r,
            t,
            b,
            a,
            intersection(l, r, t, a),
            intersection(l, b, t, a),
            intersection(l, r, t, b),
          ]}
        />
      );
    }
    if (name === "polygon")
      return (
        <SourceDrawing
          label="Đa giác lõm theo hình trong đề"
          viewBox="0 0 205 155"
        >
          <path
            d="M20 20 40 46 60 20 142 20 162 46 182 33 182 132 130 102 138 88 72 88 61 104 34 104 20 80Z"
            fill="white"
            stroke="#111"
            strokeWidth="1.3"
          />
        </SourceDrawing>
      );
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Các khối lập phương, quan sát từ bên phải"
          viewBox="0 0 300 240"
        >
          {[149, 109].map((y) => (
            <SourceCube key={y} x={35} y={y} />
          ))}
          {[109, 149].map((x) => (
            <SourceCube key={x} x={x} y={135} />
          ))}
          {[135, 95, 55].map((y) => (
            <SourceCube key={y} x={169} y={y} />
          ))}
          {[135, 95].map((y) => (
            <SourceCube key={y} x={209} y={y} />
          ))}
          <SourceCube x={62} y={122} />
          <SourceCube x={48} y={176} />
          <SourceCube x={88} y={176} />
          <SourceCube x={195} y={149} />
        </SourceDrawing>
      );
  }
  if (paper === 5) {
    if (name === "table")
      return (
        <SourceTable
          rows={[
            [1, 2, 2],
            [3, 4, 12],
            [5, 6, 30],
            [7, 8, "?"],
          ]}
        />
      );
    if (name === "letters")
      return <div className="diagram-number-line">B、D、G、I、L、N、___</div>;
    if (name === "sequence11")
      return <div className="diagram-number-line">99、92、85、78、71、…</div>;
    if (name === "operators")
      return <div className="diagram-number-line">23 __ 7 __ 11 __ 3 = 22</div>;
    if (name === "addition")
      return <Addition top="B A" bottom="C B" total="1 6 2" />;
    if (name === "expressions")
      return (
        <div className="diagram-number-line">
          2×4，42÷7，36÷3，7×2，9×9，39÷3，72÷9
        </div>
      );
    if (name === "hash-groups")
      return (
        <SourceDrawing
          label="Bốn nhóm ô vuông chứa dấu thăng theo đề"
          viewBox="0 0 630 270"
        >
          {[2, 4, 6, 8].map((n, i) => {
            const x = [10, 90, 230, 410][i],
              u = 23,
              y = 220 - n * u;
            return (
              <g key={n} transform={`translate(${x} ${y})`}>
                {Array.from({ length: n * n }, (_, k) => {
                  const r = Math.floor(k / n),
                    c = k % n;
                  return (
                    <g key={k}>
                      <rect
                        x={c * u}
                        y={r * u}
                        width={u}
                        height={u}
                        fill="white"
                        stroke="#333"
                        strokeWidth=".8"
                      />
                      {(r === n - 1 ||
                        (r < n - 1 && (c === r || c === n - 2 - r))) && (
                        <text
                          x={(c + 0.5) * u}
                          y={(r + 0.5) * u + 5}
                          textAnchor="middle"
                          fontSize="16"
                        >
                          #
                        </text>
                      )}
                    </g>
                  );
                })}
                <text
                  x={(n * u) / 2}
                  y={250 - y}
                  textAnchor="middle"
                  fontSize="14"
                >
                  Group {i + 1}
                </text>
              </g>
            );
          })}
        </SourceDrawing>
      );
    if (name === "squares")
      return (
        <SourceDrawing
          label="Các ô vuông ghép hình bậc thang theo đề"
          viewBox="0 0 220 185"
        >
          {[
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 2],
            [3, 3],
            [4, 3],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={20 + x * 34}
              y={20 + y * 34}
              width="34"
              height="34"
              fill="white"
              stroke="#333"
              strokeWidth="1"
            />
          ))}
        </SourceDrawing>
      );
    if (name === "segments") {
      const a = [20, 120],
        b = [80, 35],
        c = [155, 120],
        d = [225, 32],
        e = [285, 120],
        m1 = [50, 77.5],
        m4 = [255, 76];
      const h1 = intersection(m1, m4, b, c),
        h2 = intersection(m1, m4, c, d);
      return (
        <DotLines
          lines={[
            [a, b],
            [b, c],
            [c, d],
            [d, e],
            [m1, m4],
          ]}
          points={[a, b, c, d, e, m1, h1, h2, m4]}
          viewBox="0 0 310 155"
        />
      );
    }
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Các khối lập phương, quan sát từ phía trên"
          viewBox="0 0 300 245"
        >
          {[127, 92, 57].map((y) => (
            <SourceCube key={y} x={167} y={y} size={35} depth={12} />
          ))}
          <SourceCube x={105} y={142} size={35} depth={12} />
          <SourceCube x={70} y={133} size={35} depth={12} />
          <SourceCube x={70} y={98} size={35} depth={12} />
          <SourceCube x={202} y={127} size={35} depth={12} />
          <SourceCube x={58} y={145} size={35} depth={12} />
          <SourceCube x={81} y={157} size={35} depth={12} />
          <SourceCube x={155} y={139} size={35} depth={12} />
          <SourceCube x={143} y={151} size={35} depth={12} />
        </SourceDrawing>
      );
  }
  if (paper === 6) {
    if (name === "sequence3")
      return (
        <div className="diagram-number-line">12、15、21、30、42、57、___</div>
      );
    if (name === "letters")
      return <div className="diagram-number-line">P、M、J、G、___</div>;
    if (name === "operators12")
      return <div className="diagram-number-line">15 __ 8 __ 6 __ 1 = 16</div>;
    if (name === "operators13")
      return <div className="diagram-number-line">6 __ 4 __ 3 __ 2 = 29</div>;
    if (name === "blank")
      return <div className="diagram-number-line">_____ ÷ 2 + 9 = 19</div>;
    if (name === "addition9")
      return <Addition top="A A" bottom="A B" total="7 2" />;
    if (name === "addition15")
      return <Addition top="B A" bottom="A B" total="C 8 7" />;
    if (name === "numbers")
      return (
        <div className="diagram-number-line">
          20196951、20186421、2020345、20198462
        </div>
      );
    if (name === "shapes")
      return (
        <SymbolStrip
          label="Dãy hình tròn đen, tam giác đen và vuông rỗng có chỗ trống"
          symbols={[
            "●",
            "▲",
            "●",
            "□",
            "●",
            "▲",
            "●",
            "□",
            "●",
            "▲",
            "●",
            "＿",
            "●",
            "▲",
            "●",
            "□",
          ]}
        />
      );
    if (name === "cross-groups")
      return (
        <SourceDrawing
          label="Bốn nhóm hình thoi gồm các ô vuông và dấu ※ theo đề"
          viewBox="0 0 630 255"
        >
          {[1, 2, 3, 4].map((n, i) => {
            const u = 24,
              m = n - 1,
              size = 2 * n - 1,
              x = [25, 115, 260, 445][i],
              y = 205 - size * u;
            return (
              <g key={n} transform={`translate(${x} ${y})`}>
                {Array.from({ length: size * size }, (_, k) => {
                  const r = Math.floor(k / size),
                    c = k % size;
                  if (Math.abs(r - m) + Math.abs(c - m) > m) return null;
                  return (
                    <g key={k}>
                      <rect
                        x={c * u}
                        y={r * u}
                        width={u}
                        height={u}
                        fill="white"
                        stroke="#555"
                        strokeWidth=".8"
                      />
                      {(r + c) % 2 === m % 2 && (
                        <text
                          x={(c + 0.5) * u}
                          y={(r + 0.5) * u + 5}
                          textAnchor="middle"
                          fontSize="16"
                        >
                          ※
                        </text>
                      )}
                    </g>
                  );
                })}
                <text
                  x={(size * u) / 2}
                  y={235 - y}
                  textAnchor="middle"
                  fontSize="14"
                >
                  {i + 1}
                  {["st", "nd", "rd", "th"][i]} Group
                </text>
              </g>
            );
          })}
        </SourceDrawing>
      );
    if (name === "squares")
      return (
        <SourceDrawing
          label="Các ô vuông ghép theo hình trong đề"
          viewBox="0 0 235 220"
        >
          {[
            [3, 0],
            [4, 0],
            [0, 1],
            [3, 1],
            [0, 2],
            [1, 2],
            [2, 2],
            [3, 2],
            [0, 3],
            [1, 3],
            [2, 3],
            [0, 4],
            [2, 4],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={30 + x * 34}
              y={20 + y * 34}
              width="34"
              height="34"
              fill="white"
              stroke="#333"
              strokeWidth="1"
            />
          ))}
        </SourceDrawing>
      );
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Khối lập phương xếp dạng chữ U, quan sát từ bên cạnh"
          viewBox="0 0 300 230"
        >
          {[110, 150].map((x) => (
            <SourceCube key={x} x={x} y={138} />
          ))}
          {[138, 98].map((y) => (
            <SourceCube key={y} x={190} y={y} />
          ))}
          {[138, 98, 58].map((y) => (
            <SourceCube key={y} x={110} y={y} />
          ))}
          {[152, 112, 72].map((y) => (
            <SourceCube key={y} x={96} y={y} />
          ))}
          {[56, 96, 136].map((x) => (
            <SourceCube key={x} x={x} y={166} />
          ))}
          <SourceCube x={150} y={152} />
        </SourceDrawing>
      );
  }
  if (paper === 7) {
    if (name === "shapes")
      return (
        <SymbolStrip
          label="Dãy hình tròn rỗng, tam giác rỗng, vuông rỗng lặp lại"
          symbols={["○", "△", "□", "○", "△", "□", "○", "△", "□"]}
        />
      );
    if (name === "letters")
      return <div className="diagram-number-line">A、E、I、M、___</div>;
    if (name === "sequence13")
      return <div className="diagram-number-line">12、21、30、39、48、…</div>;
    if (name === "operators")
      return <div className="diagram-number-line">7 __ 4 __ 5 __ 3 = 13</div>;
    if (name === "addition")
      return <Addition top="B" bottom="A B" total="6 6" />;
    if (name === "expressions")
      return (
        <div className="diagram-number-line">
          15+13，19−7，14−9，5+9，19−10，11−8，17−9，3+7，18−7
        </div>
      );
    if (name === "squares")
      return (
        <SourceDrawing
          label="Hàng trên năm ô vuông, hàng dưới bốn ô vuông thẳng bên trái"
          viewBox="0 0 240 125"
        >
          {Array.from({ length: 9 }, (_, i) => (
            <rect
              key={i}
              x={20 + (i < 5 ? i : i - 5) * 38}
              y={20 + (i < 5 ? 0 : 38)}
              width="38"
              height="38"
              fill="white"
              stroke="#333"
              strokeWidth="1"
            />
          ))}
        </SourceDrawing>
      );
    if (name === "segments") {
      const a = [25, 45],
        b = [20, 120],
        c = [230, 28],
        d = [225, 126],
        o = intersection(a, d, b, c),
        e = [170, 28 + ((120 - 28) * (230 - 170)) / (230 - 20)];
      return (
        <DotLines
          lines={[
            [a, d],
            [b, c],
          ]}
          points={[a, b, c, d, o, e]}
          viewBox="0 0 260 155"
        />
      );
    }
    if (name === "cubes")
      return (
        <SourceDrawing
          label="Các khối lập phương, quan sát từ bên cạnh"
          viewBox="0 0 245 220"
        >
          <SourceCube x={75} y={108} size={38} depth={13} />
          <SourceCube x={75} y={70} size={38} depth={13} />
          <SourceCube x={113} y={108} size={38} depth={13} />
          <SourceCube x={62} y={121} size={38} depth={13} />
          <SourceCube x={100} y={134} size={38} depth={13} />
          <SourceCube x={138} y={134} size={38} depth={13} />
        </SourceDrawing>
      );
  }
  return null;
}
