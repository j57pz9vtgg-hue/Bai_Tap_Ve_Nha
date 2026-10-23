import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
export const THEMES = [
  { id: "dragon", name: "Thư viện Rồng", hero: "dragon-hero" },
  { id: "pixel", name: "Thế giới Pixel", hero: "pixel-hero" },
  { id: "bunny", name: "Thỏ con", hero: "bunny-hero" },
  { id: "crystal", name: "Đảo pha lê", hero: "crystal-hero" },
  { id: "cloud", name: "Thành phố trên mây", hero: "cloud-hero" },
  { id: "forest", name: "Rừng đom đóm", hero: "forest-hero" },
  { id: "museum", name: "Nhà khám phá khủng long", hero: "museum-hero" },
  { id: "magic", name: "Phép thuật", hero: "magic-hero" },
  { id: "treasure", name: "Kho báu", hero: "treasure-hero" },
  { id: "cars", name: "Ô tô", hero: "cars-hero" },
] as const;
export type LearningTheme = (typeof THEMES)[number]["id"];
const KEY = "homework-interface:v3";
const ThemeContext = createContext<{
  theme: LearningTheme;
  setTheme: (theme: LearningTheme) => void;
  error: boolean;
}>({ theme: "pixel", setTheme: () => {}, error: false });
export const useLearningTheme = () => useContext(ThemeContext);
export function LearningThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<LearningTheme>(() => {
    try {
      return (
        THEMES.find((t) => t.id === localStorage.getItem(KEY))?.id ?? "pixel"
      );
    } catch {
      return "pixel";
    }
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
      setError(false);
    } catch {
      setError(true);
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, error }}>
      {children}
    </ThemeContext.Provider>
  );
}
