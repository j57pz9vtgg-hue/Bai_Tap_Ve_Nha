import { SourceDrawing, SourceCube, SymbolStrip } from "./Paper4Illustration";
export function Paper5Illustration({ name }: { name: string }) {
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
        <SourceCube x={50} y={79} />
        <SourceCube x={50} y={119} />
        <SourceCube x={130} y={79} />
        <SourceCube x={130} y={119} />
        <SourceCube x={78} y={93} />
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
