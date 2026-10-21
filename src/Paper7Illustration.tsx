import { SourceDrawing, SourceCube, SymbolStrip } from "./Paper4Illustration";
function Book({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill="white"
      stroke="#555"
      strokeWidth=".9"
    >
      <path d="M0 3Q6-1 12 3Q18-1 24 3v17q-6-3-12 0-6-3-12 0ZM12 3v17M2 5q4-2 8 0v12q-4-2-8 0ZM14 5q4-2 8 0v12q-4-2-8 0Z" />
    </g>
  );
}
export function Paper7Illustration({ name }: { name: string }) {
  if (["letters", "sequence3", "sequence13", "flowers"].includes(name))
    return (
      <div className="diagram-number-line">
        {
          (
            {
              letters: "A、Z、B、___、C、X、D、W、…",
              sequence3: "50、49、47、44、40、♫、…",
              sequence13: "419、398、377、356、…",
              flowers: "❀ + ❀ − 22 = ❀ + 24",
            } as Record<string, string>
          )[name]
        }
      </div>
    );
  if (name === "arrow-groups") {
    const groups = [
      {
        n: 2,
        cells: [
          [0, 0],
          [1, 0],
          [0, 1],
        ],
      },
      {
        n: 3,
        cells: [
          [0, 0],
          [1, 0],
          [2, 0],
          [0, 1],
          [0, 2],
          [2, 2],
        ],
      },
      {
        n: 4,
        cells: [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
          [0, 1],
          [0, 2],
          [2, 2],
          [3, 2],
          [0, 3],
          [2, 3],
        ],
      },
      {
        n: 5,
        cells: [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [0, 1],
          [0, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [0, 3],
          [2, 3],
          [0, 4],
          [2, 4],
          [4, 4],
        ],
      },
    ];
    return (
      <SourceDrawing
        label="Bốn nhóm mũi tên trong lưới vuông theo đề"
        viewBox="0 0 650 240"
      >
        {groups.map(({ n, cells }, i) => {
          const x = [15, 115, 255, 425][i],
            cell = 28,
            y = 160 - n * cell;
          return (
            <g key={n} transform={`translate(${x} ${y})`}>
              <rect
                width={n * cell}
                height={n * cell}
                fill="white"
                stroke="#777"
              />
              {Array.from({ length: n - 1 }, (_, j) => (
                <path
                  key={j}
                  d={`M${(j + 1) * cell} 0v${n * cell}M0 ${(j + 1) * cell}h${n * cell}`}
                  stroke="#888"
                  strokeWidth=".8"
                />
              ))}
              {cells.map(([c, r], j) => (
                <text
                  key={j}
                  x={(c + 0.5) * cell}
                  y={(r + 0.5) * cell + 6}
                  fontSize="21"
                  textAnchor="middle"
                >
                  ⇨
                </text>
              ))}
              <text
                x={(n * cell) / 2}
                y={210 - y}
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
  }
  if (name === "addition")
    return (
      <div
        className="letter-addition"
        role="img"
        aria-label="Phép cộng dọc ABA cộng BB bằng 530"
      >
        <span>A B A</span>
        <span>+　 B B</span>
        <span>5 3 0</span>
      </div>
    );
  if (name === "squares") {
    const cells = [
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [0, 2],
      [3, 2],
      [0, 3],
      [3, 3],
      [1, 4],
      [2, 4],
      [3, 4],
    ];
    return (
      <SourceDrawing
        label="Hình lưới vuông bậc thang có khoảng trống ở giữa"
        viewBox="0 0 230 230"
      >
        {cells.map(([x, y], i) => (
          <rect
            key={i}
            x={25 + x * 33}
            y={25 + y * 33}
            width="33"
            height="33"
            fill="white"
            stroke="#888"
          />
        ))}
      </SourceDrawing>
    );
  }
  if (name === "cubes-right")
    return (
      <SourceDrawing
        label="Hình cầu khối lập phương với hai chân để quan sát từ bên phải"
        viewBox="0 0 310 165"
      >
        {[70, 110, 150, 190].map((x) => (
          <SourceCube key={x} x={x} y={35} />
        ))}
        <SourceCube x={70} y={75} />
        <SourceCube x={190} y={75} />
        <SourceCube x={30} y={75} />
        <SourceCube x={230} y={75} />
      </SourceDrawing>
    );
  if (name === "cube")
    return (
      <SourceDrawing
        label="Khối lập phương màu xanh, các cạnh nhìn thấy theo hình đề"
        viewBox="0 0 220 175"
      >
        <g stroke="#294c84" strokeWidth="1.5">
          <path d="M55 50h85v85H55Z" fill="#91a9dd" />
          <path d="m55 50 25-25h85l-25 25Z" fill="#abc1e6" />
          <path d="m140 50 25-25v85l-25 25Z" fill="#718fbf" />
        </g>
      </SourceDrawing>
    );
  if (name === "segments") {
    const cells = [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      points = [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [1, 3],
        [2, 3],
      ];
    return (
      <SourceDrawing
        label="Hình dấu cộng ghép năm hình vuông với các đỉnh được đánh dấu"
        viewBox="0 0 230 230"
      >
        {cells.map(([x, y], i) => (
          <rect
            key={i}
            x={40 + x * 45}
            y={25 + y * 45}
            width="45"
            height="45"
            fill="white"
            stroke="#111"
            strokeWidth="1.5"
          />
        ))}
        {points.map(([x, y], i) => (
          <circle key={i} cx={40 + x * 45} cy={25 + y * 45} r="2.6" />
        ))}
      </SourceDrawing>
    );
  }
  if (name === "shapes")
    return (
      <SymbolStrip
        label="Dãy sao, tròn rỗng, tam giác rỗng và vuông đen theo đề"
        symbols={[
          "★",
          "○",
          "▽",
          "■",
          "▽",
          "★",
          "○",
          "▽",
          "■",
          "▽",
          "★",
          "○",
          "▽",
          "■",
          "▽",
          "★",
        ]}
      />
    );
  if (name === "books")
    return (
      <SourceDrawing
        label="Ba ngăn sách, bảy quyển ở ngăn trên, tám quyển ở ngăn giữa và ba quyển ở ngăn dưới"
        viewBox="0 0 330 140"
      >
        <rect
          x="15"
          y="10"
          width="300"
          height="110"
          fill="white"
          stroke="#111"
          strokeWidth="2.5"
        />
        <path d="M15 47h300M15 84h300" stroke="#111" strokeWidth="2" />
        {[7, 8, 3].map((n, row) =>
          Array.from({ length: n }, (_, i) => (
            <Book
              key={`${row}-${i}`}
              x={165 - (n * 28) / 2 + i * 28}
              y={18 + row * 36}
            />
          )),
        )}
      </SourceDrawing>
    );
  if (name === "magic-grid") {
    const values = ["A", "1", "B", "3", "C", "7", "D", "9", "E"];
    return (
      <SourceDrawing
        label="Bảng3×3: hàng1 A,1,B; hàng2 3,C,7; hàng3 D,9,E"
        viewBox="0 0 240 180"
      >
        {values.map((v, i) => (
          <g key={i}>
            <rect
              x={40 + (i % 3) * 50}
              y={12 + Math.floor(i / 3) * 50}
              width="50"
              height="50"
              fill="white"
              stroke="#555"
            />
            <text
              x={65 + (i % 3) * 50}
              y={44 + Math.floor(i / 3) * 50}
              fontSize="23"
              textAnchor="middle"
            >
              {v}
            </text>
          </g>
        ))}
      </SourceDrawing>
    );
  }
  return null;
}
