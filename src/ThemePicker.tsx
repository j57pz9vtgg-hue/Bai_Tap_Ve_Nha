import { Dialog, publicAsset } from "./components";
import { THEMES, useLearningTheme } from "./theme";
export function ThemePicker({ onClose }: { onClose: () => void }) {
  const { theme, setTheme, error } = useLearningTheme();
  return (
    <Dialog
      title="Chọn giao diện"
      className="theme-picker-dialog"
      onClose={onClose}
    >
      <h2>Chọn giao diện cho bé</h2>
      <fieldset className="learning-theme-picker">
        <legend className="visually-hidden">Giao diện ứng dụng</legend>
        {THEMES.map((t) => (
          <label key={t.id} className={theme === t.id ? "selected-theme" : ""}>
            <img src={publicAsset(t.hero)} alt="" />
            <span>
              <input
                type="radio"
                name="learning-theme"
                value={t.id}
                checked={theme === t.id}
                onChange={() => setTheme(t.id)}
              />
              {t.name}
            </span>
          </label>
        ))}
      </fieldset>
      {error && (
        <p className="storage-warning" role="alert">
          Không thể lưu giao diện trên trình duyệt này. Lựa chọn chỉ áp dụng
          trong phiên hiện tại.
        </p>
      )}
      <button className="primary-button" onClick={onClose}>
        Áp dụng
      </button>
    </Dialog>
  );
}
