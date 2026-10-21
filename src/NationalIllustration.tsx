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
          <SourceCube x={70} y={48} />
          <SourceCube x={70} y={88} />
          <SourceCube x={70} y={128} />
          <SourceCube x={136} y={62} />
          <SourceCube x={136} y={102} />
          <SourceCube x={164} y={76} />
          <SourceCube x={164} y={116} />
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
  return null;
}
