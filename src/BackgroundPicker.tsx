import { publicAsset } from "./components";

const BACKGROUNDS = [
  { id: "pixel", title: "Thế giới Pixel", image: "pixel-hero" },
  { id: "dinosaur", title: "Khủng long", image: "dinosaur-hero" },
  { id: "rabbit", title: "Thỏ học bài", image: "rabbit-hero" },
  { id: "purple", title: "Góc học tập tím", image: "purple-hero" },
  { id: "robot", title: "Robot", image: "robot-hero" },
  { id: "space", title: "Vũ trụ", image: "space-hero" },
] as const;
export type Background = (typeof BACKGROUNDS)[number]["id"];
const BACKGROUND_KEY = "homework-background:v1";
export function readBackground(): Background {
  try {
    const stored = localStorage.getItem(BACKGROUND_KEY);
    return (
      BACKGROUNDS.find((background) => background.id === stored)?.id ?? "pixel"
    );
  } catch {
    return "pixel";
  }
}
export function saveBackground(background: Background) {
  localStorage.setItem(BACKGROUND_KEY, background);
}
export function BackgroundPicker({
  value,
  onChange,
}: {
  value: Background;
  onChange: (background: Background) => void;
}) {
  return (
    <fieldset className="background-picker">
      <legend>Chọn hình nền cho bé</legend>
      <p>Nút bấm, câu hỏi và khung bài làm A4 được giữ nguyên.</p>
      <div className="background-options">
        {BACKGROUNDS.map((background) => (
          <label
            key={background.id}
            className={`background-option ${value === background.id ? "is-selected" : ""}`}
          >
            <img src={publicAsset(background.image)} alt="" />
            <span>
              <input
                type="radio"
                name="app-background"
                value={background.id}
                checked={value === background.id}
                onChange={() => onChange(background.id)}
              />
              {background.title}
            </span>
          </label>
        ))}
      </div>
      <p className="sample-notice">
        Lựa chọn hình nền được lưu trên trình duyệt này.
      </p>
    </fieldset>
  );
}
