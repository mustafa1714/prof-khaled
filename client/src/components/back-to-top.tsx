"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-7 end-7 z-[60] flex size-[46px] items-center justify-center rounded-full bg-navy text-white shadow-lg transition-all hover:bg-gold hover:text-[#2a1f05] animate-in fade-in slide-in-from-bottom-2"
      aria-label="Back to top"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
