type EmptyStateProps = {
  type: "books" | "seminars";
  message: string;
};

function BookIllustration() {
  return (
    <svg className="mx-auto mb-4 size-20 text-muted/40" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect x="20" y="25" width="80" height="70" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="28" y="33" width="64" height="54" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <line x1="60" y1="25" x2="60" y2="95" stroke="currentColor" strokeWidth="2" />
      <rect x="35" y="42" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      <rect x="35" y="50" width="14" height="2.5" rx="1.25" fill="currentColor" opacity="0.2" />
      <rect x="35" y="57" width="16" height="2.5" rx="1.25" fill="currentColor" opacity="0.2" />
      <rect x="67" y="42" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      <rect x="67" y="50" width="14" height="2.5" rx="1.25" fill="currentColor" opacity="0.2" />
      <rect x="67" y="57" width="16" height="2.5" rx="1.25" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function SeminarIllustration() {
  return (
    <svg className="mx-auto mb-4 size-20 text-muted/40" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect x="15" y="20" width="90" height="75" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="15" y1="38" x2="105" y2="38" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="29" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="42" cy="29" r="4" fill="currentColor" opacity="0.15" />
      <circle cx="54" cy="29" r="4" fill="currentColor" opacity="0.1" />
      <rect x="25" y="48" width="30" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="25" y="58" width="22" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="25" y="66" width="26" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="25" y="74" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="70" y="48" width="25" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <line x1="75" y1="58" x2="90" y2="58" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="75" y1="65" x2="87" y2="65" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}

export function EmptyState({ type, message }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      {type === "books" ? <BookIllustration /> : <SeminarIllustration />}
      <p className="text-lg text-muted">{message}</p>
    </div>
  );
}
