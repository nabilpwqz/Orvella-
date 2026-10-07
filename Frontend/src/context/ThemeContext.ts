import { createContext } from "react";

export interface ThemeContextType {
  isDarkMode: boolean;
  themeToggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
