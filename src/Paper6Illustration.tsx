import { SourceDrawing, SourceCube, SymbolStrip } from "./Paper4Illustration";
export function Paper6Illustration({ name }: { name: string }) {
  if (
    [
      "sequence2",
      "equation9",
      "sequence12",
      "operators",
      "sequence23",
    ].includes(name)
  )
    return (
      <div className="diagram-number-line">
        {
          (
            {
              sequence2: "2、6、10、14、18、22、____",
              equation9: "____ : 6 = 12",
              sequence12: "101、103、105、107、109、…",
              operators: "1 __ 3 __ 5 __ 7 __ 11 = 11",
              sequence23: "2, 5, 8, 11, 14, 17, …",
            } as Record<string, string>
          )[name]
        }
      </div>
    );
  if (name === "cross-groups")
    return (
      <SourceDrawing
        label="Bốn nhóm hình chữ thập gồm các ô ⊗ và # xen kẽ theo đề"
        viewBox="0 0 640 290"
      >
        {[1, 3, 5, 7].map((n, i) => {
          const x = [20, 100, 235, 420][i],
            cell = 24,
            y = 125 - (n * cell) / 2,
            mid = Math.floor(n / 2);
          const cells = Array.from({ length: n }, (_, k) => [k, mid]);
          for (let k = 0; k < n; k++) if (k !== mid) cells.push([mid, k]);
          return (
            <g key={n} transform={`translate(${x} ${y})`}>
              {cells.map(([c, r], j) => (
                <g key={j}>
                  <rect
                    x={c * cell}
                    y={r * cell}
                    width={cell}
                    height={cell}
                    fill="white"
                    stroke="#777"
                  />
                  <text
                    x={(c + 0.5) * cell}
                    y={(r + 0.5) * cell + 6}
                    fontSize="18"
                    textAnchor="middle"
                  >
                    {(c === mid ? r : c) % 2 === 0 ? "⊗" : "#"}
                  </text>
                </g>
              ))}
              <text
                x={(n * cell) / 2}
                y={252 - y}
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
  if (name === "squares") {
    const cells = [
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ];
    return (
      <SourceDrawing
        label="Hai hàng ô vuông lệch nhau, hàng trên bốn ô và hàng dưới năm ô"
        viewBox="0 0 330 130"
      >
        {cells.map(([x, y], i) => (
          <rect
            key={i}
            x={30 + x * 40}
            y={20 + y * 40}
            width="40"
            height="40"
            fill="white"
            stroke="#888"
          />
        ))}
      </SourceDrawing>
    );
  }
  if (name === "shapes")
    return (
      <SymbolStrip
        label="Dãy tam giác, vuông, tròn và thoi rỗng theo đề, có một dấu hỏi"
        symbols={[
          "△",
          "□",
          "○",
          "◇",
          "△",
          "△",
          "□",
          "○",
          "◇",
          "△",
          "△",
          "?",
          "○",
        ]}
      />
    );
  if (name === "cubes-side")
    return (
      <SourceDrawing
        label="Hình chồng khối lập phương để nhìn từ bên cạnh"
        viewBox="0 0 250 210"
      >
        <SourceCube x={50} y={70} />
        <SourceCube x={118} y={84} />
        <SourceCube x={66} y={84} />
        <SourceCube x={100} y={50} />
        <SourceCube x={100} y={90} />
        <SourceCube x={140} y={90} />
      </SourceDrawing>
    );
  return null;
}
