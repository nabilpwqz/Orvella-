import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "../components/common/Icons";

export default function UseTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("UseTheme must be used inside ThemeProvider");
  }

  const { isDarkMode, themeToggle } = context;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        themeToggle();
      }}
      type="button"
      className="relative flex items-center justify-between w-14 h-7 rounded-full p-1 border border-perf-border bg-perf-input-bg transition-colors duration-300 cursor-pointer select-none group pointer-events-auto shrink-0 active:scale-95"
      aria-label="Toggle Atmosphere"
      title={isDarkMode ? "Switch to Ivory Maison" : "Switch to Noir Atelier"}
    >
      {/* Background Track Icons */}
      <span className="flex items-center justify-center w-5 h-5 text-perf-gold">
        <SunIcon size={12} />
      </span>

      <span className="flex items-center justify-center w-5 h-5 text-perf-gold">
        <MoonIcon size={11} />
      </span>

      {/* Sliding Pill Thumb */}
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-perf-gold shadow-sm flex items-center justify-center text-white transition-transform duration-300 ease-out ${
          isDarkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDarkMode ? <MoonIcon size={11} /> : <SunIcon size={12} />}
      </span>
    </button>
  );
}
