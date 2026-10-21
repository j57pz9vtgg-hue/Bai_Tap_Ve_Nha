import type { ReactNode } from "react";
export function SourceDrawing({
  label,
  children,
  viewBox = "0 0 600 200",
}: {
  label: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {children}
    </svg>
  );
}
export function SourceCube({
  x,
  y,
  size = 40,
  depth = 14,
  fill = "white",
}: {
  x: number;
  y: number;
  size?: number;
  depth?: number;
  fill?: string;
}) {
  return (
    <g stroke="#333" strokeWidth="1.5">
      <path d={`M${x} ${y}h${size}v${size}h-${size}Z`} fill={fill} />
      <path
        d={`m${x} ${y} ${depth}-${depth}h${size}l-${depth} ${depth}Z`}
        fill="#f7f7f7"
      />
      <path
        d={`m${x + size} ${y} ${depth}-${depth}v${size}l-${depth} ${depth}Z`}
        fill="#d6d6d6"
      />
    </g>
  );
}
export function SymbolStrip({
  symbols,
  label,
  continuation = true,
}: {
  symbols: string[];
  label: string;
  continuation?: boolean;
}) {
  return (
    <SourceDrawing label={label} viewBox={`0 0 ${symbols.length * 34 + 28} 65`}>
      {symbols.map((s, i) => (
        <text key={i} x={i * 34 + 12} y="43" fontSize="29" textAnchor="middle">
          {s}
        </text>
      ))}
      {continuation && (
        <text x={symbols.length * 34 + 2} y="43" fontSize="24">
          …
        </text>
      )}
    </SourceDrawing>
  );
}
function Bird() {
  return (
    <svg
      width="48"
      height="44"
      viewBox="0 0 70 60"
      role="img"
      aria-label="Con chim che số"
    >
      <path
        d="M12 15c8-22 32-9 35 5 10 7 14 3 20 0-2 15-14 25-32 25C16 45 8 29 12 15Z"
        fill="#7fd8f1"
      />
      <path d="M12 19 3 23l10 5" fill="#ffc85c" />
      <path d="M25 25c10-7 20 4 17 10-10 4-17 0-17-10Z" fill="#4bbbe3" />
      <circle cx="21" cy="13" r="2" />
      <path
        d="M30 45v9m9-9v9m-14 0h10m0 0h10"
        stroke="#e8b04c"
        strokeWidth="2"
      />
    </svg>
  );
}
function Flower() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="-30 -30 60 60"
      role="img"
      aria-label="Bông hoa che số"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-14"
          rx="3"
          ry="12"
          fill="#7cd6ed"
          transform={`rotate(${i * 30})`}
        />
      ))}
      <circle r="6" fill="#ffd55d" />
    </svg>
  );
}
function Cake({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      stroke="#555"
      strokeWidth="1.2"
      fill="white"
    >
      <path d="m0 17 20-13 23 15v24L0 34Z" />
      <path d="m0 17 43 2M0 24l43 4M0 29l43 6" fill="none" />
      <path d="M13 12c-4-9 5-10 8-6 2-8 11-3 8 2 8-2 11 5 4 7" />
      <path d="M8 18q4-6 8 0t8 0 8 0 8 0" fill="none" />
    </g>
  );
}
export function Paper4Illustration({
  name,
  solution = false,
}: {
  name: string;
  solution?: boolean;
}) {
  if (
    name === "sequence" ||
    name === "sequence11" ||
    name === "numbers14" ||
    name === "numbers22" ||
    name === "operators"
  )
    return (
      <div className="diagram-number-line">
        {
          {
            sequence: "1, 20, 2, 18, 3, 16, 4, 14, 5, …",
            sequence11: "1, 4, 7, 10, …",
            numbers14: "14, 31, 22, 19, 52, 93, 70, 54",
            numbers22: "11, 73, 27, 16, 34, 45, 67, 22",
            operators: "5 __ 3 __ 2 __ 4 = 6",
          }[name]
        }
      </div>
    );
  if (solution && name === "shapes")
    return (
      <SourceDrawing
        label="Nhóm bốn hình vuông, cộng, tam giác, vuông lặp lại"
        viewBox="0 0 590 80"
      >
        {Array.from({ length: 4 }, (_, i) => (
          <g key={i} transform={`translate(${12 + i * 140} 15)`}>
            <rect width="130" height="46" rx="9" fill="none" stroke="#111" />
            <text x="65" y="32" textAnchor="middle" fontSize="26">
              □ ✚ ▲ □
            </text>
          </g>
        ))}
      </SourceDrawing>
    );
  if (name === "shapes")
    return (
      <SymbolStrip
        label="Dãy hình vuông rỗng, dấu cộng và tam giác đen theo đề"
        symbols={[
          "□",
          "✚",
          "▲",
          "□",
          "□",
          "✚",
          "▲",
          "□",
          "□",
          "✚",
          "▲",
          "□",
          "□",
          "✚",
          "▲",
        ]}
      />
    );
  if (name === "bird" || name === "flower")
    return (
      <div className="bell-equations">
        <div>
          {name === "bird" ? (
            <>
              21 + <Bird /> = 32
            </>
          ) : (
            <>
              <Flower /> − 10 = 15 + 4
            </>
          )}
        </div>
      </div>
    );
  if (name === "addition")
    return (
      <div
        className="letter-addition"
        role="img"
        aria-label="Phép cộng dọc XX cộng Y bằng 30"
      >
        <span>X X</span>
        <span>+　 Y</span>
        <span>3 0</span>
      </div>
    );
  if (name === "cubes-count")
    return (
      <SourceDrawing
        label="Chồng khối lập phương của Lucy, theo hình đề số 4"
        viewBox="0 0 250 210"
      >
        <SourceCube x={78} y={40} />
        <SourceCube x={64} y={54} />
        <SourceCube x={130} y={68} />
        <SourceCube x={50} y={108} />
        <SourceCube x={90} y={108} />
        {solution && (
          <g fontSize="16" textAnchor="middle">
            {[
              [70, 135, "1"],
              [110, 135, "2"],
              [84, 82, "3"],
              [111, 101, "4"],
              [118, 60, "5"],
              [124, 100, "6"],
              [141, 64, "7"],
              [150, 96, "8"],
            ].map(([x, y, t]) => (
              <text key={t} x={x} y={y}>
                {t}
              </text>
            ))}
          </g>
        )}
      </SourceDrawing>
    );
  if (name === "cubes-right")
    return (
      <SourceDrawing
        label="Chồng khối lập phương nhìn từ phía bên phải theo đề"
        viewBox="0 0 260 240"
      >
        <SourceCube x={100} y={35} />
        <SourceCube x={60} y={75} />
        <SourceCube x={140} y={75} />
        <SourceCube x={100} y={115} />
        <SourceCube x={46} y={135} />
        <SourceCube x={86} y={135} />
        {solution && (
          <g fontSize="16" textAnchor="middle">
            {[
              [130, 161, "1"],
              [107, 95, "2"],
              [108, 135, "3"],
              [147, 139, "4"],
              [123, 111, "5"],
              [147, 53, "6"],
              [187, 95, "7"],
            ].map(([x, y, t]) => (
              <text key={t} x={x} y={y}>
                {t}
              </text>
            ))}
          </g>
        )}
      </SourceDrawing>
    );
  if (name === "squares") {
    const cells = [
      [2, 0],
      [0, 1],
      [1, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [1, 5],
      [3, 5],
    ];
    return (
      <SourceDrawing
        label="Hình vuông ghép theo lưới, có phần nhô ở trên và hai cột bên dưới"
        viewBox="0 0 210 245"
      >
        {cells.map(([x, y], i) => (
          <g key={i}>
            <rect
              x={25 + x * 30}
              y={15 + y * 30}
              width="30"
              height="30"
              fill="white"
              stroke="#111"
              strokeWidth="1.5"
            />
            {solution && (
              <text
                x={40 + x * 30}
                y={36 + y * 30}
                fontSize="18"
                textAnchor="middle"
              >
                {i + 1}
              </text>
            )}
          </g>
        ))}
      </SourceDrawing>
    );
  }
  if (name === "segments")
    return (
      <SourceDrawing
        label="Ba đường thẳng cắt nhau với tám điểm đánh dấu"
        viewBox="0 0 300 200"
      >
        <g stroke="#111" strokeWidth="1.5" fill="none">
          <path d="M100 170 190 20M110 45 210 95M80 95 180 145" />
        </g>
        {[
          [100, 170],
          [130, 120],
          [160, 70],
          [190, 20],
          [110, 45],
          [210, 95],
          [80, 95],
          [180, 145],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" />
        ))}
        {solution && (
          <g fontSize="16" textAnchor="middle">
            {[
              [130, 52, "1"],
              [187, 78, "2"],
              [100, 114, "3"],
              [157, 141, "4"],
              [180, 46, "5"],
              [146, 101, "6"],
              [112, 150, "7"],
            ].map(([x, y, t]) => (
              <text key={t} x={x} y={y}>
                {t}
              </text>
            ))}
          </g>
        )}
      </SourceDrawing>
    );
  if (name === "arrows")
    return (
      <SymbolStrip
        label="Mũi tên sang phải và lên trên theo thứ tự đã cho"
        symbols={
          solution
            ? ["⇨", "⇧", "⇨", "⇨", "⇧", "⇨", "⇨", "⇧", "⇨", "⇨"]
            : ["⇨", "⇧", "⇨", "⇨", "⇧", "⇨", "⇨", "⇧"]
        }
        continuation={!solution}
      />
    );
  if (name === "cakes")
    return (
      <SourceDrawing
        label="Mười hai miếng bánh, hai hàng mỗi hàng sáu miếng"
        viewBox="0 0 390 140"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <Cake key={i} x={20 + (i % 6) * 58} y={8 + Math.floor(i / 6) * 58} />
        ))}
        {solution && (
          <path
            d="M188 0V133M5 62H377"
            fill="none"
            stroke="#4663ee"
            strokeWidth="3"
          />
        )}
      </SourceDrawing>
    );
  return null;
}
