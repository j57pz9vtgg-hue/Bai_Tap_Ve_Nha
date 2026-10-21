import { SourceDrawing, SourceCube, SymbolStrip } from "./Paper4Illustration";
export function Paper5Illustration({
  name,
  solution = false,
}: {
  name: string;
  solution?: boolean;
}) {
  if (name === "inverse")
    return solution ? (
      <SourceDrawing
        label="Sơ đồ tính ngược: 11 cộng42 bằng53, rồi trừ38 bằng15"
        viewBox="0 0 570 160"
      >
        <g fill="white" stroke="#555">
          {[20, 225, 430].map((x) => (
            <rect key={x} x={x} y="35" width="110" height="70" />
          ))}
          <path
            d="M130 60H225m-9-5 9 5-9 5M335 60H430m-9-5 9 5-9 5"
            fill="none"
          />
        </g>
        <g fontSize="18" textAnchor="middle">
          <text x="75" y="60">
            Số cần tìm
          </text>
          <text x="75" y="88" fill="#e24a4a">
            15
          </text>
          <text x="280" y="60">
            ?
          </text>
          <text x="280" y="88" fill="#e24a4a">
            53
          </text>
          <text x="485" y="78">
            11
          </text>
          <text x="177" y="48">
            +38
          </text>
          <text x="382" y="48">
            −42
          </text>
          <text x="177" y="145" fill="#e24a4a">
            ← −38
          </text>
          <text x="382" y="145" fill="#e24a4a">
            ← +42
          </text>
        </g>
      </SourceDrawing>
    ) : null;
  if (name === "max-squares")
    return solution ? (
      <SourceDrawing
        label="Sáu đường thẳng tạo bốn hình vuông đơn vị và một hình vuông lớn"
        viewBox="0 0 190 185"
      >
        <path
          d="M45 15V165M90 15V165M135 15V165M20 55H160M20 100H160M20 145H160"
          fill="none"
          stroke="#888"
        />
        <path
          d="M45 55H135V145H45Z"
          fill="none"
          stroke="#f45b65"
          strokeWidth="2"
        />
        <g fontSize="17" textAnchor="middle">
          {[
            [67, 84, 1],
            [112, 84, 2],
            [112, 129, 3],
            [67, 129, 4],
            [126, 38, 5],
          ].map(([x, y, n]) => (
            <text key={n} x={x} y={y}>
              {n}
            </text>
          ))}
        </g>
        <path d="m122 43-18 15" stroke="#f45b65" />
      </SourceDrawing>
    ) : null;
  if (name === "flowers-table")
    return solution ? (
      <table className="national-number-table">
        <caption>Các cách cắm hoa</caption>
        <thead>
          <tr>
            {["Cách", "Lọ 1", "Lọ 2", "Lọ 3"].map((t) => (
              <th key={t}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            [1, 1, 4],
            [1, 2, 3],
            [1, 3, 2],
            [1, 4, 1],
            [2, 1, 3],
            [2, 2, 2],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1],
            [4, 1, 1],
          ].map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {r.map((n, j) => (
                <td key={j}>{n}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  if (
    [
      "sequence",
      "sequence10",
      "sequence11",
      "numbers14",
      "equation",
      "numbers22",
    ].includes(name)
  )
    return (
      <div className="diagram-number-line">
        {
          (
            {
              sequence: "50, 3, 45, 6, 40, 9, 35, 12, …",
              sequence10: "1, 1, 2, 3, 5, 8, …",
              sequence11: "3, 7, 11, 15, …",
              numbers14: "12, 15, 28, 93, 35, 41, 90",
              equation: "____ + 27 = 19 + 48 − 23",
              numbers22: "23, 91, 73, 39, 46, 82, 50",
            } as Record<string, string>
          )[name]
        }
      </div>
    );
  if (name === "shapes")
    return (
      <SymbolStrip
        label="Dãy tam giác, hoa thị, tròn rỗng và vuông rỗng theo đề"
        symbols={["△", "✱", "○", "□", "△", "✱", "○", "□", "△", "✱"]}
      />
    );
  if (name === "addition")
    return (
      <div
        className="letter-addition"
        role="img"
        aria-label="Phép cộng dọc XY cộng Y bằng 48"
      >
        <span>X Y</span>
        <span>+　 Y</span>
        <span>4 8</span>
      </div>
    );
  if (name === "cubes-count")
    return (
      <SourceDrawing
        label="Các khối lập phương trắng chồng và nhô ra theo đề5"
        viewBox="0 0 240 200"
      >
        <SourceCube x={64} y={65} />
        <SourceCube x={140} y={65} />
        <SourceCube x={110} y={32} />
        <SourceCube x={50} y={119} />
        <SourceCube x={50} y={79} />
        <SourceCube x={130} y={119} />
        <SourceCube x={130} y={79} />
        <SourceCube x={78} y={93} />
        {solution && (
          <g fontSize="15" textAnchor="middle">
            {[
              [160, 61, 1],
              [150, 105, 2],
              [150, 145, 3],
              [130, 57, 4],
              [98, 120, 5],
              [80, 61, 6],
              [62, 100, 7],
              [70, 145, 8],
            ].map(([x, y, n]) => (
              <text key={n} x={x} y={y}>
                {n}
              </text>
            ))}
          </g>
        )}
      </SourceDrawing>
    );
  if (name === "cubes-top")
    return (
      <SourceDrawing
        label="Chồng khối lập phương để quan sát từ phía trên"
        viewBox="0 0 230 225"
      >
        <SourceCube x={110} y={35} />
        <SourceCube x={70} y={49} />
        <SourceCube x={100} y={89} />
        <SourceCube x={140} y={103} />
        <SourceCube x={100} y={129} />
        {solution && (
          <g fontSize="15" textAnchor="middle">
            {[
              [140, 31, 1],
              [122, 45, 2],
              [98, 45, 3],
              [127, 85, 4],
              [167, 99, 5],
            ].map(([x, y, n]) => (
              <text key={n} x={x} y={y}>
                {n}
              </text>
            ))}
          </g>
        )}
      </SourceDrawing>
    );
  if (name === "triangles")
    return (
      <SourceDrawing
        label="Hình ngôi sao năm cánh tạo bởi năm đoạn thẳng cắt nhau"
        viewBox="0 0 220 190"
      >
        <path
          d="M110 15 175 170 20 65H200L45 170Z"
          fill="none"
          stroke="#111"
          strokeWidth="1.8"
        />
        {solution && (
          <g fontSize="17" textAnchor="middle">
            {[
              [110, 48, 1],
              [164, 83, 2],
              [145, 132, 3],
              [78, 132, 4],
              [57, 83, 5],
              [110, 98, 6],
            ].map(([x, y, n]) => (
              <text key={n} x={x} y={y}>
                {n}
              </text>
            ))}
          </g>
        )}
      </SourceDrawing>
    );
  if (name === "circles")
    return (
      <SymbolStrip
        label="Dãy hai hình vuông, tam giác và hai hình tròn lặp lại như đề"
        symbols={[
          "□",
          "□",
          "▲",
          "○",
          "○",
          "□",
          "□",
          "▲",
          "○",
          "○",
          "□",
          "□",
          "▲",
          "○",
          "○",
          "□",
          "□",
        ]}
      />
    );
  if (name === "stars")
    return (
      <SymbolStrip
        label="Chín ngôi sao"
        continuation={false}
        symbols={Array(9).fill("★")}
      />
    );
  return null;
}
