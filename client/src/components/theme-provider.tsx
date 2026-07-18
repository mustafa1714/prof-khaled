"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useServerInsertedHTML } from "next/navigation";

type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "theme";
const CLASS = "dark";
const MEDIA = "(prefers-color-scheme: dark)";

interface ThemeCtx {
  theme: Theme;
  resolvedTheme: Resolved;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

function resolveFromStorage(): Resolved {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia(MEDIA).matches ? "dark" : "light";
}

function applyToDOM(resolved: Resolved) {
  document.documentElement.classList[resolved === "dark" ? "add" : "remove"](CLASS);
}

function antiFOUCScript() {
  return {
    __html: `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t==='light'?false:t==='dark'?true:window.matchMedia('${MEDIA}').matches;if(d)document.documentElement.classList.add('${CLASS}');}catch(e){}})();`,
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<Resolved>("dark");

  useServerInsertedHTML(() => (
    <script suppressHydrationWarning dangerouslySetInnerHTML={antiFOUCScript()} />
  ));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration gate: must not read localStorage on server
    setResolved(resolveFromStorage());
  }, []);

  useEffect(() => {
    applyToDOM(resolved);
  }, [resolved]);

  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia(MEDIA);
    const handler = () => {
      if ((document.cookie || "").includes("theme=system") || !localStorage.getItem(STORAGE_KEY)) {
        setResolved(mql.matches ? "dark" : "light");
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      if (theme !== "system") return;
      setResolved(resolveFromStorage());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    setResolved(
      t === "system" ? (window.matchMedia(MEDIA).matches ? "dark" : "light") : t
    );
  }, []);

  const value = useMemo(() => ({ theme, resolvedTheme: resolved, setTheme }), [theme, resolved, setTheme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
