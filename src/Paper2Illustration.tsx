import type { ReactNode } from "react";

function Drawing({
  label,
  viewBox = "0 0 640 180",
  children,
}: {
  label: string;
  viewBox?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{ fontFamily: "Georgia, serif", color: "#111" }}
    >
      {children}
    </svg>
  );
}
function Flower({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#8c7544" strokeWidth=".8">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-5"
          rx="3.8"
          ry="5"
          transform={`rotate(${a})`}
          fill="#ffdf85"
        />
      ))}
      <circle r="3" fill="#e5ad3e" />
    </g>
  );
}
function FlowerGrid({
  n,
  x,
  y,
  cell = 25,
}: {
  n: number;
  x: number;
  y: number;
  cell?: number;
}) {
  const cells = Array.from({ length: n }, (_, c) => [c, 0]);
  if (n === 2) cells.push([0, 1], [1, 1]);
  else
    for (let r = 1; r < n; r++) {
      cells.push([n - 1, r]);
      cells.push([n - 1 - r, r]);
    }
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={n * cell} height={n * cell} fill="white" stroke="#777" />
      {Array.from({ length: n - 1 }, (_, i) => (
        <g key={i} stroke="#777" strokeWidth=".8">
          <path d={`M${(i + 1) * cell} 0v${n * cell}`} />
          <path d={`M0 ${(i + 1) * cell}h${n * cell}`} />
        </g>
      ))}
      {cells.map(([c, r], i) => (
        <Flower key={i} x={(c + 0.5) * cell} y={(r + 0.5) * cell} />
      ))}
    </g>
  );
}
function Tree({
  x = 0,
  y = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      stroke="#192f1a"
      strokeWidth="2"
    >
      <path
        d="M25 43C7 47 2 32 10 25 0 10 15 1 25 8 32-4 49 2 49 12 65 13 67 31 54 35 56 48 39 53 33 43"
        fill="#249d20"
      />
      <path d="M27 63l2-24-8-10 4-3 8 10 6-12 4 3-8 18 2 18z" fill="#b76c2d" />
    </g>
  );
}
export function Paper2Shape({
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
        <path d="M0 12C-25-2-12-22 0-10 12-22 25-2 0 12z" />
      ) : index === 1 ? (
        <path
          d={
            Array.from({ length: 24 }, (_, i) => {
              const a = (i * Math.PI) / 12 - Math.PI / 2,
                r = i % 2 ? 10 : 15;
              return `${i ? "L" : "M"}${Math.cos(a) * r} ${Math.sin(a) * r}`;
            }).join(" ") + "Z"
          }
        />
      ) : index === 2 ? (
        <path d="M0-15L15 13H-15z" />
      ) : index === 3 ? (
        <path d="M0-15L4-5 15-5 6 2 10 14 0 7-10 14-6 2-15-5-4-5z" />
      ) : (
        <circle r="14" />
      )}
    </g>
  );
}
function Cubes({ count, solution }: { count: boolean; solution: boolean }) {
  // Visible face coordinates traced from the source; labels only appear in the supplied solution.
  const faces = count
    ? [
        { x: 90, y: 48, top: true, label: "2" },
        { x: 50, y: 60, top: true, label: "2" },
        { x: 130, y: 88, top: true, label: "1" },
        { x: 170, y: 48, top: true, label: "2" },
        { x: 170, y: 88, label: "" },
        { x: 50, y: 100, label: "" },
        { x: 90, y: 88, top: true, label: "1" },
        { x: 38, y: 112, top: true, label: "1" },
        { x: 78, y: 112, top: true, label: "1" },
        { x: 118, y: 100, top: true, label: "1" },
      ]
    : [
        { x: 170, y: 24, label: "9" },
        { x: 170, y: 64, label: "8" },
        { x: 170, y: 104, label: "7" },
        { x: 90, y: 64, label: "5" },
        { x: 50, y: 64, label: "3" },
        { x: 90, y: 104, label: "4" },
        { x: 0, y: 116, label: "1" },
        { x: 26, y: 128, label: "2" },
        { x: 106, y: 128, label: "6" },
      ];
  return (
    <Drawing
      label={
        count
          ? "Các khối lập phương màu xanh theo đề; lời giải ghi số khối trên mỗi chồng."
          : "Hình khối màu xanh nhìn từ phía trước theo đề."
      }
      viewBox="-10 0 240 185"
    >
      {faces.map((f, i) => (
        <g key={i} stroke="#263f54" strokeWidth="1.5">
          {!faces.some((above) => above.x === f.x && above.y === f.y - 40) && (
            <path d={`M${f.x} ${f.y}l13-13h40l-13 13z`} fill="#c1dca7" />
          )}
          <path d={`M${f.x + 40} ${f.y}l13-13v40l-13 13z`} fill="#94b77e" />
          <rect x={f.x} y={f.y} width="40" height="40" fill="#adce88" />
          {solution && f.label && (
            <text
              x={f.x + (count ? 26 : f.label === "4" ? 8 : 20)}
              y={f.y + (count ? -2 : f.label === "4" ? 18 : 27)}
              stroke="none"
              fontSize="19"
              textAnchor="middle"
              fill="#111"
            >
              {f.label}
            </text>
          )}
        </g>
      ))}
    </Drawing>
  );
}
function Squares({ solution }: { solution: boolean }) {
  function figure(x: number, y: number, kind: number) {
    return (
      <g
        transform={`translate(${x} ${y})`}
        stroke="#111"
        strokeWidth="1.5"
        fill="none"
      >
        <rect x="0" y="0" width="120" height="120" />
        <rect x="72" y="24" width="120" height="120" />
        <path d="M96 24v96M72 48h48M72 72h48M72 96h48" />
        {solution &&
          (kind === 0 ? (
            <g fill="#111" stroke="none" fontSize="14" textAnchor="middle">
              {Array.from({ length: 8 }, (_, i) => (
                <text
                  key={i}
                  x={84 + (i % 2) * 24}
                  y={42 + Math.floor(i / 2) * 24}
                >
                  {i + 1}
                </text>
              ))}
            </g>
          ) : kind === 1 ? (
            <g fill="#bbb">
              <rect x="72" y="24" width="48" height="48" />
              <rect x="72" y="72" width="48" height="48" />
              <g fill="#111" stroke="none" fontSize="16">
                <text x="91" y="55">
                  9
                </text>
                <text x="87" y="103">
                  10
                </text>
              </g>
            </g>
          ) : kind === 2 ? (
            <g>
              <rect x="72" y="48" width="48" height="48" fill="#bbb" />
              <text x="87" y="78" fill="#111" stroke="none" fontSize="16">
                11
              </text>
            </g>
          ) : (
            <g>
              <rect
                x={kind === 3 ? 0 : 72}
                y={kind === 3 ? 0 : 24}
                width="120"
                height="120"
                fill="#bbb"
              />
              <text
                x={kind === 3 ? 48 : 120}
                y={kind === 3 ? 65 : 89}
                fill="#111"
                stroke="none"
                fontSize="16"
              >
                {kind === 3 ? "12" : "13"}
              </text>
            </g>
          ))}
      </g>
    );
  }
  return solution ? (
    <Drawing
      label="Lời giải đếm các hình vuông, đánh số 1 đến 13"
      viewBox="-5 -5 640 330"
    >
      {[0, 1, 2].map((i) => (
        <g key={i}>{figure(i * 220, 0, i)}</g>
      ))}
      {figure(80, 175, 3)}
      {figure(350, 175, 4)}
    </Drawing>
  ) : (
    <Drawing
      label="Hai hình vuông lớn chồng lên nhau, phần giao gồm hai cột và bốn hàng ô nhỏ"
      viewBox="-10 -10 215 170"
    >
      {figure(0, 0, 0)}
    </Drawing>
  );
}
function Segments({ solution }: { solution: boolean }) {
  const pts = [
    [30, 145],
    [110, 145],
    [230, 145],
    [280, 145],
    [110, 65],
    [230, 25],
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [1, 4],
    [2, 5],
    [3, 5],
    [4, 5],
  ];
  return (
    <Drawing
      label={
        solution
          ? "Hình đoạn thẳng với các đoạn đơn được đánh số 1 đến 8"
          : "Hình gồm đáy thẳng, hai đường đứng và ba đường xiên nối các điểm"
      }
      viewBox="10 0 295 175"
    >
      <g stroke="#111" strokeWidth="1.5">
        {lines.map(([a, b], i) => (
          <path key={i} d={`M${pts[a].join(" ")}L${pts[b].join(" ")}`} />
        ))}{" "}
      </g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#111" />
      ))}
      {solution &&
        [
          [70, 163],
          [167, 163],
          [255, 163],
          [65, 101],
          [98, 109],
          [215, 92],
          [263, 88],
          [169, 42],
        ].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="18">
            {i + 1}
          </text>
        ))}
    </Drawing>
  );
}
function Routes() {
  return (
    <Drawing
      label="Ba con đường từ trường học đến trạm xe buýt và hai con đường từ trạm xe buýt về nhà"
      viewBox="0 0 560 190"
    >
      <defs>
        <marker
          id="p2-route-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0L10 5 0 10" fill="#777" />
        </marker>
      </defs>
      <g
        fill="none"
        stroke="#777"
        strokeWidth="1.5"
        markerEnd="url(#p2-route-arrow)"
      >
        <path d="M125 70h75q10 0 10 10v45" />
        <path d="M120 95l90 45" />
        <path d="M125 90v60q0 10 10 10h75" />
        <path d="M330 138l80-35" />
        <path d="M330 160h100q10 0 10-10V96" />
      </g>
      <g stroke="#34525c" strokeWidth="2">
        <path d="M25 48h105v47H25z" fill="#8caeb1" />
        <path d="M15 48L78 10l63 38z" fill="#acc4c7" />
        <rect x="64" y="65" width="24" height="30" fill="#f9f2da" />
        {[35, 51, 98, 114].map((x) => (
          <g key={x} fill="#f6f4de">
            <rect x={x} y="57" width="9" height="11" />
            <rect x={x} y="76" width="9" height="11" />
          </g>
        ))}
        <circle cx="78" cy="33" r="9" fill="#fff" />
        <path d="M78 27v7l5 2" fill="none" />
      </g>
      <g stroke="#665341" strokeWidth="2">
        <path d="M400 53h95v49h-95z" fill="#fff3d2" />
        <path d="M388 56l62-40 58 40-12 9-46-30-50 30z" fill="#b64e27" />
        <path d="M410 25V9h16v27" fill="#b25632" />
        <rect x="436" y="70" width="20" height="32" fill="#9a6239" />
        <rect x="473" y="69" width="14" height="16" fill="#97b9c5" />
        <rect x="410" y="70" width="14" height="16" fill="#97b9c5" />
      </g>
      <g transform="translate(215 115)" stroke="#5d8690" strokeWidth="1.6">
        <path d="M-10 7h130v7H-10z" fill="#a4c7d7" />
        <path d="M0 14v55M110 14v55M0 68h110" />
        <path d="M12 15h86v47H12z" fill="#d5edf4" />
        <path d="M40 15v47M70 15v47M12 38h86" />
        <path d="M16 51h77v7H16z" fill="#f4bf45" />
        <path d="M25 58v10M83 58v10" />
        <rect
          x="23"
          y="-6"
          width="67"
          height="17"
          fill="#e8a329"
          stroke="none"
        />
        <text
          x="56"
          y="6"
          fill="white"
          stroke="none"
          fontSize="9"
          textAnchor="middle"
        >
          BUS STATION
        </text>
      </g>
    </Drawing>
  );
}
export function Paper2Illustration({
  name,
  solution = false,
}: {
  name: string;
  solution?: boolean;
}) {
  if (name === "sequence")
    return <div className="diagram-number-line">1、4、9、16、___、36、49</div>;
  if (name === "sequence12")
    return <div className="diagram-number-line">77、68、59、50、…</div>;
  if (name === "numbers")
    return (
      <div className="diagram-number-line">
        24, 47, 98, 39, 62, 75, 80, 17, 33
      </div>
    );
  if (name === "operators")
    return <div className="diagram-number-line">1 __ 8 __ 3 __ 7 = 13</div>;
  if (name === "flowers")
    return (
      <Drawing
        label={
          solution
            ? "Nhóm hoa tiếp theo trong lời giải, lưới sáu hàng sáu cột"
            : "Bốn nhóm hoa trong lưới 2 × 2, 3 × 3, 4 × 4, 5 × 5 theo đề"
        }
        viewBox={solution ? "0 0 180 180" : "0 0 640 185"}
      >
        {solution ? (
          <FlowerGrid n={6} x={15} y={10} />
        ) : (
          <>
            {[2, 3, 4, 5].map((n, i) => (
              <g key={n}>
                <FlowerGrid n={n} x={[10, 115, 255, 435][i]} y={145 - n * 25} />
                <text
                  x={[35, 152, 305, 497][i]}
                  y="170"
                  fontSize="13"
                  textAnchor="middle"
                >
                  {i + 1}
                  {["st", "nd", "rd", "th"][i]} Group
                  <tspan x={[35, 152, 305, 497][i]} dy="15">
                    Nhóm {i + 1}
                  </tspan>
                </text>
              </g>
            ))}
          </>
        )}
      </Drawing>
    );
  if (name === "tree")
    return (
      <Drawing
        label={
          solution
            ? "Các bước biến đổi phương trình với số bị cây che theo lời giải"
            : "Cái cây che số trừ 12 bằng 9 cộng 20"
        }
        viewBox={solution ? "0 0 400 270" : "0 0 500 85"}
      >
        {(solution
          ? ["− 12 = 9 + 20", "− 12 = 29", "= 29 + 12", "= 41"]
          : ["− 12 = 9 + 20"]
        ).map((t, i) => (
          <g key={i}>
            <Tree x={20} y={i * 65 + 5} scale={0.85} />
            <text x="88" y={i * 65 + 47} fontSize="35" fill="#111">
              {t}
            </text>
          </g>
        ))}
      </Drawing>
    );
  if (name === "chain")
    return (
      <Drawing
        label={
          solution
            ? "Lời giải chuỗi 22 trừ 7 được 15, trừ 5 được 10, cộng 22 được 32; có mũi tên tính ngược"
            : "Chuỗi bốn hình bầu dục: dấu hỏi, trừ 7, ô trống, trừ 5, ô trống, cộng 22, 32"
        }
        viewBox="0 0 640 115"
      >
        <defs>
          <marker
            id="p2-chain-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5 0 10" fill="#111" />
          </marker>
        </defs>
        {[
          solution ? "22" : "?",
          solution ? "15" : "",
          solution ? "10" : "",
          "32",
        ].map((v, i) => (
          <g key={i}>
            <ellipse
              cx={65 + i * 165}
              cy="50"
              rx="48"
              ry="34"
              fill="#f5cdae"
              stroke="#09214b"
              strokeWidth="2"
            />
            <text
              x={65 + i * 165}
              y="60"
              textAnchor="middle"
              fontSize="30"
              fontWeight="bold"
            >
              {v}
            </text>
            {i < 3 && (
              <>
                <path
                  d={`M${114 + i * 165} 45h67`}
                  stroke="#111"
                  strokeWidth="2"
                  markerEnd="url(#p2-chain-arrow)"
                />
                <text
                  x={147 + i * 165}
                  y="35"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                >
                  {["− 7", "− 5", "+ 22"][i]}
                </text>
                {solution && (
                  <>
                    <path
                      d={`M${114 + i * 165} 60h67`}
                      stroke="#111"
                      strokeWidth="2"
                      markerStart="url(#p2-chain-arrow)"
                    />
                    <text
                      x={147 + i * 165}
                      y="89"
                      textAnchor="middle"
                      fontSize="23"
                    >
                      {["+ 7", "+ 5", "− 22"][i]}
                    </text>
                  </>
                )}
              </>
            )}
          </g>
        ))}
      </Drawing>
    );
  if (name === "addition")
    return (
      <div
        className="letter-addition"
        role="img"
        aria-label="Phép cộng dọc AB cộng B bằng 48"
      >
        <span>A B</span>
        <span>+　 B</span>
        <span>4 8</span>
      </div>
    );
  if (name === "operations")
    return (
      <Drawing
        label="Các phép tính: 7 cộng 4; 18 trừ 6; 14 cộng 23; 25 trừ 12; 21 trừ 2 trừ 9"
        viewBox="0 0 640 60"
      >
        {["7 + 4", "18 − 6", "14 + 23", "25 − 12", "21 − 2 − 9"].map((t, i) => (
          <g key={t}>
            <rect
              x={i * 128 + 3}
              y="5"
              width="122"
              height="43"
              rx="21"
              fill="white"
              stroke="#111"
              strokeWidth="2.5"
            />
            <text
              x={i * 128 + 64}
              y="34"
              textAnchor="middle"
              fontSize="21"
              fontWeight="bold"
            >
              {t}
            </text>
          </g>
        ))}
      </Drawing>
    );
  if (name === "squares") return <Squares solution={solution} />;
  if (name === "segments") return <Segments solution={solution} />;
  if (name === "cubes-front" || name === "cubes-count")
    return <Cubes count={name === "cubes-count"} solution={solution} />;
  if (name === "routes") return <Routes />;
  if (name === "shapes") {
    const shapes = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, -1, 2, 3, 4, 0, 1];
    return (
      <Drawing
        label={
          solution
            ? "Lời giải chia nhóm năm hình, điền hình tia nhọn"
            : "Dãy trái tim, hình tia nhọn, tam giác, ngôi sao, hình tròn theo đề, có một chỗ trống"
        }
        viewBox="0 0 640 48"
      >
        {solution &&
          [0, 1, 2].map((i) => (
            <rect
              key={i}
              x={i * 185 + 2}
              y="3"
              width="185"
              height="40"
              fill="none"
              stroke="#111"
            />
          ))}
        {shapes.map((v, i) =>
          v === -1 && !solution ? (
            <path
              key={i}
              d={`M${i * 37 + 3} 39h31`}
              stroke="#111"
              strokeWidth="2"
            />
          ) : (
            <Paper2Shape
              key={i}
              index={v === -1 ? 1 : v}
              x={i * 37 + 18}
              y={24}
            />
          ),
        )}
      </Drawing>
    );
  }
  return null;
}
