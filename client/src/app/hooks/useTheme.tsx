import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export type FontSize = "normal" | "large" | "xl";

interface ThemeContextType {
  isDark: boolean;
  setDark: (dark: boolean) => void;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isScreenReader: boolean;
  toggleScreenReader: () => void;
  announce: (message: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setDark: () => {},
  toggleTheme: () => {},
  fontSize: "normal",
  setFontSize: () => {},
  isHighContrast: false,
  toggleHighContrast: () => {},
  isScreenReader: false,
  toggleScreenReader: () => {},
  announce: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("city-explorer-theme") === "dark";
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const stored = localStorage.getItem("city-explorer-font-size");
    return (stored as FontSize) || "normal";
  });

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem("city-explorer-high-contrast") === "true";
  });

  const [isScreenReader, setIsScreenReader] = useState<boolean>(() => {
    return localStorage.getItem("city-explorer-screen-reader") === "true";
  });

  const announceRef = useRef<((msg: string) => void) | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("city-explorer-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-large", "font-xl");
    if (fontSize === "large") root.classList.add("font-large");
    if (fontSize === "xl") root.classList.add("font-xl");
    localStorage.setItem("city-explorer-font-size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    isHighContrast ? root.classList.add("high-contrast") : root.classList.remove("high-contrast");
    localStorage.setItem("city-explorer-high-contrast", String(isHighContrast));
  }, [isHighContrast]);

  useEffect(() => {
    localStorage.setItem("city-explorer-screen-reader", String(isScreenReader));
  }, [isScreenReader]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const setDark = (dark: boolean) => setIsDark(dark);

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => !prev);
  }, []);

  const toggleScreenReader = useCallback(() => {
    setIsScreenReader((prev) => !prev);
  }, []);

  const announce = useCallback((message: string) => {
    if (announceRef.current) announceRef.current(message);
  }, []);

  return (
    <ThemeContext.Provider value={{
      isDark, setDark, toggleTheme,
      fontSize, setFontSize,
      isHighContrast, toggleHighContrast,
      isScreenReader, toggleScreenReader,
      announce,
    }}>
      {children}
      <AriaAnnouncer isActive={isScreenReader} registerAnnounce={(fn) => { announceRef.current = fn; }} />
    </ThemeContext.Provider>
  );
}

function AriaAnnouncer({
  isActive,
  registerAnnounce,
}: {
  isActive: boolean;
  registerAnnounce: (fn: (msg: string) => void) => void;
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    registerAnnounce((msg: string) => {
      setMessage("");
      setTimeout(() => setMessage(msg), 50);
    });
  }, [registerAnnounce]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-hidden={!isActive}
      className="sr-only"
    >
      {message}
    </div>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
