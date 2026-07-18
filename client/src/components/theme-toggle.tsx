"use client";

import { useTheme } from "./theme-provider";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration gate: must not render theme-dependent UI on server
    setMounted(true);
  }, []);

  if (!mounted) {
      return (
      <button
        className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-bg-alt"
        disabled
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-bg-alt text-foreground transition-all hover:border-gold hover:-rotate-12"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="size-[17px]" /> : <Moon className="size-[17px]" />}
    </button>
  );
}
