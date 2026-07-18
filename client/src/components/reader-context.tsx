"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { X } from "lucide-react";

const READER_QUERY = defineQuery(`*[_id == $id][0]{ title, readContent }`);

type PubContent = {
  title?: string;
  readContent?: unknown[];
};

type ReaderContextType = {
  openReader: (id: string) => void;
};

const ReaderContext = createContext<ReaderContextType>({
  openReader: () => {},
});

export function useReader() {
  return useContext(ReaderContext);
}

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<PubContent | null>(null);

  const openReader = useCallback(async (id: string) => {
    setLoading(true);
    setOpen(true);
    try {
      const pub = await sanityFetch<PubContent>({
        query: READER_QUERY,
        params: { id },
        revalidate: 300,
      });
      setContent(pub);
    } catch {
      console.error("Failed to load publication");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ReaderContext.Provider value={{ openReader }}>
      {children}
      {open && (
        <ReaderDialog
          content={content}
          loading={loading}
          onClose={() => {
            setOpen(false);
            setContent(null);
          }}
        />
      )}
    </ReaderContext.Provider>
  );
}

function ReaderDialog({
  content,
  loading,
  onClose,
}: {
  content: PubContent | null;
  loading: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={content?.title || "Publication reader"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="relative max-h-[88vh] w-[min(820px,100%)] overflow-hidden rounded-2xl border border-line bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-xl font-bold text-navy dark:text-gold-soft">
            {content?.title || ""}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-full bg-bg-alt text-foreground transition-colors hover:bg-line"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="size-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
            </div>
          ) : content?.readContent ? (
            <PortableText
              value={content.readContent as never}
              components={portableTextComponents as never}
            />
          ) : (
            <p className="py-12 text-center text-muted">No content available</p>
          )}
        </div>
      </div>
    </div>
  );
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children: ReactNode }) => (
      <h3 className="mt-5 mb-2.5 font-display text-xl font-bold text-navy dark:text-gold-soft">{children}</h3>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h4 className="mt-4 mb-2 text-lg font-bold text-navy dark:text-gold-soft">{children}</h4>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="border-s-4 border-gold ps-4 italic text-muted">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: ReactNode }) => <strong>{children}</strong>,
    em: ({ children }: { children: ReactNode }) => <em>{children}</em>,
  },
};
