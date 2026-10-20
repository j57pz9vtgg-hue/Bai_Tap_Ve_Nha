import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "dinosaur" | "space";
const THEME_KEY = "homework-theme:v1";
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "dinosaur",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(THEME_KEY) === "space" ? "space" : "dinosaur";
    } catch {
      return "dinosaur";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Theme remains usable without storage. */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "space" ? "#eaf7ff" : "#fffbee");
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export function themeAsset(theme: Theme, name: string) {
  const spaceAssets: Record<string, string> = {
    logo: "space-logo",
    dino: "space-dino",
    triceratops: "space-triceratops",
    hero: "space-card",
  };
  return `${import.meta.env.BASE_URL}assets/${theme === "space" ? (spaceAssets[name] ?? name) : name}.webp`;
}
