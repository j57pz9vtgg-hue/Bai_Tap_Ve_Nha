import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
export const THEMES = [
  { id: "pixel", name: "Thế giới Pixel", hero: "pixel-hero" },
  { id: "bunny", name: "Thỏ con", hero: "bunny-hero" },
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
