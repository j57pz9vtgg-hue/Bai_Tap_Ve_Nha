import type { ReactNode } from "react";
function Drawing({
  label,
  children,
  viewBox = "0 0 640 220",
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
      style={{ fontFamily: "Arial, sans-serif", color: "#111" }}
    >
      {children}
    </svg>
  );
}
function Sun({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#b78315" strokeWidth="1">
      <path
        d="M0-12 3-8 7-10 7-5 12-4 9 0 12 4 7 6 7 11 2 8 0 12-3 8-8 10-7 5-12 3-9-1-12-5-6-6-6-11-2-8Z"
        fill="#ffda37"
      />
      <circle r="7" fill="#ffdc44" />
      <circle cx="-2.5" cy="-1" r=".7" fill="#493a15" />
      <circle cx="2.5" cy="-1" r=".7" fill="#493a15" />
      <path d="M-3 3Q0 6 3 3" fill="none" />
    </g>
  );
}
function Backpack() {
  return (
    <svg
      width="38"
      height="56"
      viewBox="0 0 40 60"
      role="img"
      aria-label="Chiếc cặp che số"
    >
      <g stroke="#142c37" strokeWidth="2" fill="#60d5ed">
        <path d="M12 13V8C12 0 29 0 29 8v5M8 17C8 7 33 7 33 17l3 37H4Z" />
        <rect x="9" y="34" width="22" height="17" rx="3" />
        <path d="M11 29V20c0-9 18-9 18 0v9M12 38h16" fill="none" />
      </g>
    </svg>
  );
}
function Cubes({ count, solution }: { count: boolean; solution: boolean }) {
  if (!count)
    return (
      <Drawing
        label={
          solution
            ? "Các ô nhìn từ bên phải được đánh số 1 đến 7 theo lời giải"
            : "Hình các khối lập phương màu xanh nhìn từ phía bên phải"
        }
        viewBox="0 0 280 260"
      >
        <g stroke="#5c744a" strokeWidth="1.5" fill="#add18b">
          <path d="M100 46h48v48h-48zM100 94h48v48h-48zM100 142h48v48h-48z" />
          <path d="m100 46 15-16h48l-15 16z" fill="#cde6b2" />
          <path d="m148 46 15-16v144l-15 16z" fill="#8bae70" />
          <path d="m148 94 15-16m-15 64 15-16" />
          <path d="M70 126h48v48H70zM54 190h48v48H54zM118 174h48v48h-48zM166 174h48v48h-48z" />
          <path
            d="m70 126 16-16h48l-16 16zM54 190l16-16h48l-16 16zM118 174l16-16h48l-16 16zM166 174l16-16h48l-16 16z"
            fill="#cde6b2"
          />
          <path
            d="m118 126 16-16v48l-16 16zM102 190l16-16v48l-16 16zM214 174l16-16v48l-16 16z"
            fill="#8bae70"
          />
        </g>
        {solution && (
          <g fontSize="16" fill="#111">
            <text x="106" y="217">
              1
            </text>
            <text x="122" y="155">
              2
            </text>
            <text x="218" y="199">
              3
            </text>
            <text x="152" y="113">
              6
            </text>
            <text x="152" y="65">
              7
            </text>
            <path
              d="M230 74 153 151M236 115l-102 59"
              stroke="red"
              strokeWidth="2"
            />
            <text x="230" y="70">
              5
            </text>
            <text x="240" y="115">
              4
            </text>
          </g>
        )}
      </Drawing>
    );
  // Visible faces follow the supplied U-shaped stack; do not add hidden cubes.
  return (
    <Drawing
      label={
        solution
          ? "Tám khối nhìn thấy được đánh số 1 đến 8 theo hình lời giải"
          : "Chồng khối lập phương của Fiona"
      }
      viewBox="0 0 300 250"
    >
      <g stroke="#111" strokeWidth="1.7" fill="white">
        <path d="M114 120 134 100h30v20Z" fill="#fafafa" />
        <path d="M64 70h50v50H64zM164 70h50v50h-50zM45 140h50v50H45zM95 140h50v50H95zM145 140h50v50h-50zM75 160h50v50H75z" />
        <path
          d="m64 70 20-20h50l-20 20zM164 70l20-20h50l-20 20zM45 140l19-20h50l-19 20zM95 140l19-20h50l-19 20zM145 140l19-20h50l-19 20zM75 160l20-20h50l-20 20z"
          fill="#fafafa"
        />
        <path
          d="m114 70 20-20v50l-20 20zM214 70l20-20v50l-20 20zM195 140l19-20v50l-19 20zM214 120l20-20v50l-20 20zM125 160l20-20v50l-20 20z"
          fill="#d3d3d3"
        />
        <path d="M75 160h50v50H75Z" fill="white" />
        <path d="m75 160 20-20h50l-20 20Z" fill="#fafafa" />
        <path d="m125 160 20-20v50l-20 20Z" fill="#d3d3d3" />
      </g>
      {solution && (
        <g fontSize="19" textAnchor="middle">
          <text x="58" y="175">
            1
          </text>
          <text x="88" y="101">
            2
          </text>
          <text x="100" y="195">
            3
          </text>
          <text x="120" y="135">
            4
          </text>
          <text x="148" y="111">
            5
          </text>
          <text x="170" y="175">
            6
          </text>
          <text x="190" y="101">
            7
          </text>
          <text x="223" y="141">
            8
          </text>
        </g>
      )}
    </Drawing>
  );
}
export function Paper3Illustration({
  name,
  solution = false,
}: {
  name: string;
  solution?: boolean;
}) {
  if (
    name === "sequence" ||
    name === "sequence12" ||
    name === "numbers" ||
    name === "operators"
  )
    return (
      <div className="diagram-number-line">
        {name === "sequence"
          ? "2、5、9、14、20、?、…"
          : name === "sequence12"
            ? "98、86、74、62、…"
            : name === "numbers"
              ? "23, 92, 12, 37, 49, 52, 88, 45"
              : "4 __ 5 __ 3 __ 6 = 12"}
      </div>
    );
  if (name === "backpack")
    return (
      <div className="bell-equations">
        <div>
          11 + <Backpack /> = 36 − 12
        </div>
        {solution && (
          <>
            <div>
              11 + <Backpack /> = 24
            </div>
            <div>
              <Backpack /> = 24 − 11
            </div>
            <div>
              <Backpack /> = 13.
            </div>
          </>
        )}
      </div>
    );
  if (name === "suns")
    return (
      <Drawing
        label="Bốn nhóm mặt trời trong lưới 2×2, 3×3, 4×4 và 5×5"
        viewBox="0 0 650 240"
      >
        {[2, 3, 4, 5].map((n, i) => {
          const cell = 26,
            x = [12, 103, 223, 370][i],
            y = 15;
          const cells = [
            [0, 0],
            [n - 1, 0],
            ...Array.from({ length: n - 1 }, (_, r) => [0, r + 1]),
            ...Array.from({ length: n - 1 }, (_, c) => [c + 1, n - 1]),
          ];
          return (
            <g key={n} transform={`translate(${x} ${y})`}>
              <rect
                width={n * cell}
                height={n * cell}
                fill="white"
                stroke="#333"
              />
              {Array.from({ length: n - 1 }, (_, k) => (
                <g key={k} stroke="#777">
                  <path
                    d={`M${(k + 1) * cell} 0v${n * cell}M0 ${(k + 1) * cell}h${n * cell}`}
                  />
                </g>
              ))}
              {cells.map(([c, r], j) => (
                <Sun key={j} x={(c + 0.5) * cell} y={(r + 0.5) * cell} />
              ))}
              <text
                x={(n * cell) / 2}
                y="180"
                fontSize="15"
                textAnchor="middle"
              >
                Group {i + 1}
              </text>
            </g>
          );
        })}
      </Drawing>
    );
  if (name === "addition")
    return (
      <div
        className="letter-addition"
        role="img"
        aria-label="Phép cộng dọc AB cộng B bằng 24"
      >
        <span>A B</span>
        <span>+　 B</span>
        <span>2 4</span>
      </div>
    );
  if (name === "chain")
    return (
      <Drawing
        label={
          solution
            ? "Sơ đồ có nhãn A và B ở hai ô giữa, các phép tính trừ 10, cộng 7, cộng 6, kết thúc ở 23"
            : "Bốn ô ngũ giác, ô đầu dấu hỏi, lần lượt trừ 10, cộng 7, cộng 6, ô cuối là 23"
        }
        viewBox="0 0 640 140"
      >
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${35 + i * 160} 15)`}>
            <path
              d="m0 30 40-30 40 30-15 55H15Z"
              fill="#f8f8f8"
              stroke="#777"
              strokeWidth="1.5"
            />
            <text x="40" y="58" textAnchor="middle" fontSize="26">
              {i === 0
                ? "?"
                : i === 3
                  ? "23"
                  : solution
                    ? i === 1
                      ? "A"
                      : "B"
                    : ""}
            </text>
            {i < 3 && (
              <>
                <path d="M80 45h75l-8-5m8 5-8 5" fill="none" stroke="#111" />
                <text x="117" y="35" textAnchor="middle" fontSize="20">
                  {["−10", "+7", "+6"][i]}
                </text>
              </>
            )}
          </g>
        ))}
      </Drawing>
    );
  if (name === "operations")
    return (
      <Drawing
        label="12 − 3; 7 + 5; 11 − 3 + 2; 111 + 1; 20 − 17"
        viewBox="0 0 640 65"
      >
        {["12 − 3", "7 + 5", "11 − 3 + 2", "111 + 1", "20 − 17"].map((t, i) => (
          <g key={t}>
            <rect
              x={i * 128 + 3}
              y="8"
              width="120"
              height="42"
              rx="5"
              fill="white"
              stroke="#111"
            />
            <text x={i * 128 + 63} y="36" textAnchor="middle" fontSize="19">
              {t}
            </text>
          </g>
        ))}
      </Drawing>
    );
  if (name === "squares")
    return (
      <Drawing
        label={
          solution
            ? "Hình vuông được chia thành sáu mảnh ghép đánh số 1 đến 6"
            : "Một hình vuông lớn chồng lên hình vuông nhỏ hơn, với các đường chia bên trong"
        }
        viewBox="0 0 340 290"
      >
        <g fill="none" stroke="#111" strokeWidth="2">
          <rect x="50" y="15" width="160" height="160" />
          <rect x="170" y="135" width="120" height="120" />
          <path d="M130 175V95h80M170 95v80M130 135h80" />
        </g>
        {solution && (
          <g fontSize="21" textAnchor="middle">
            {[
              [90, 65],
              [150, 121],
              [190, 121],
              [150, 160],
              [190, 160],
              [245, 220],
            ].map(([x, y], i) => (
              <text key={i} x={x} y={y}>
                {i + 1}
              </text>
            ))}
          </g>
        )}
      </Drawing>
    );
  if (name === "shapes")
    return (
      <Drawing
        label={
          solution
            ? "Lời giải chia ba nhóm năm hình, điền hình tròn đen"
            : "Dãy hình tròn đen, tam giác rỗng và hình thoi đen có một chỗ trống"
        }
        viewBox="0 0 640 68"
      >
        {Array.from({ length: 15 }, (_, i) => {
          const x = i * 40 + 20;
          return (
            <g key={i}>
              {i === 11 && !solution ? (
                <path d={`M${x - 13} 43h26`} stroke="#111" />
              ) : i % 5 < 2 ? (
                <circle cx={x} cy="29" r="7" fill="#000" />
              ) : i % 5 === 3 ? (
                <path d={`m${x} 20 9 9-9 9-9-9Z`} fill="#000" />
              ) : (
                <path
                  d={`m${x} 19 8 18h-16Z`}
                  fill="white"
                  stroke="#111"
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}
        {solution &&
          [0, 1, 2].map((i) => (
            <rect
              key={i}
              x={i * 200 + 1}
              y="7"
              width="198"
              height="44"
              rx="10"
              fill="none"
              stroke="#777"
            />
          ))}
      </Drawing>
    );
  if (name === "cubes-right" || name === "cubes-count")
    return <Cubes count={name === "cubes-count"} solution={solution} />;
  if (name === "segments")
    return (
      <Drawing
        label={
          solution
            ? "Các đoạn thẳng đơn được đánh số 1 đến 11 theo lời giải"
            : "Hình thoi ngoài và hình thoi trong chung đỉnh trên và dưới, với đoạn ngang qua bốn điểm"
        }
        viewBox="0 0 420 170"
      >
        <g fill="none" stroke="#111" strokeWidth="1.6">
          <path d="M30 85 210 15 390 85 210 155ZM120 85 210 15 300 85 210 155ZM30 85h360" />
        </g>
        {[
          [30, 85],
          [120, 85],
          [210, 15],
          [300, 85],
          [390, 85],
          [210, 155],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#111" />
        ))}
        {solution && (
          <g fontSize="17">
            {[
              [100, 42],
              [166, 62],
              [242, 62],
              [321, 42],
              [75, 80],
              [200, 80],
              [342, 80],
              [100, 139],
              [166, 116],
              [242, 116],
              [321, 139],
            ].map(([x, y], i) => (
              <text key={i} x={x} y={y}>
                {i + 1}
              </text>
            ))}
          </g>
        )}
      </Drawing>
    );
  if (name === "routes")
    return (
      <Drawing
        label="Bốn đường từ siêu thị đến ga tàu và hai đường từ ga tàu đến rạp chiếu phim"
        viewBox="0 0 640 240"
      >
        <defs>
          <marker
            id="p3-route-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="m0 0 8 4-8 4" fill="#222" />
          </marker>
        </defs>
        <g
          stroke="#222"
          strokeWidth="2.5"
          fill="none"
          markerEnd="url(#p3-route-arrow)"
        >
          <path d="M102 94H187L218 172M102 94l116 90M102 94v75l116 30M102 94 40 210h178M324 183v-72l180-30M324 201h80l100-114" />
        </g>
        <g stroke="#163545" strokeWidth="3">
          <path d="M24 37h90v53H24z" fill="#d8f3ef" />
          <path d="M18 37 26 8h78l16 29Z" fill="#bcda1e" />
          <path
            d="M33 45h20v40H33zM61 45h18v40H61zM87 45h18v40H87z"
            fill="#76d9e9"
          />
          <path d="M480 26h82v58h-82z" fill="#d8e5ed" />
          <path d="M471 26h100M505 45h30v39h-30z" fill="#6294b7" />
          <path d="M480 8h82v18h-82z" fill="#ffdc6b" />
          <path d="M237 149h78v49h-78z" fill="#f2c14f" />
          <path d="M228 174h65v36h-65z" fill="#f4c84b" />
          <path
            d="M238 181h16v14h-16zM260 181h16v14h-16zM245 157h17v12h-17zM270 157h17v12h-17z"
            fill="#73c8df"
          />
          <circle cx="243" cy="212" r="7" fill="#333" />
          <circle cx="281" cy="212" r="7" fill="#333" />
        </g>
        <g textAnchor="middle" fontWeight="bold" fill="#111">
          <text x="69" y="21" fontSize="10">
            SUPER
          </text>
          <text x="69" y="32" fontSize="10">
            MARKET
          </text>
          <text x="521" y="39" fontSize="12">
            CINEMA
          </text>
        </g>
      </Drawing>
    );
  return null;
}
