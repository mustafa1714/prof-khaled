"use client";

type WhatsAppButtonProps = {
  whatsappNumber?: string;
  whatsappDefaultMsg?: string;
};

export function WhatsAppButton({ whatsappNumber, whatsappDefaultMsg }: WhatsAppButtonProps) {
  if (!whatsappNumber) return null;

  const num = whatsappNumber.replace(/[^0-9]/g, "");
  const msg = encodeURIComponent(whatsappDefaultMsg || "");
  const href = `https://wa.me/${num}${msg ? `?text=${msg}` : ""}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed bottom-6 end-7 z-[9000] flex size-[54px] items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.45)] transition-all hover:scale-110 hover:shadow-[0_8px_28px_rgba(37,211,102,0.55)] dark:bg-[#1ebe5d] dark:shadow-[0_6px_20px_rgba(37,211,102,0.35)] sm:bottom-7 sm:end-[100px] sm:size-[60px]"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="size-7">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.2l6.044-1.946A15.906 15.906 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.34 22.608c-.39 1.098-1.932 2.008-3.152 2.27-.836.18-1.93.324-5.626-1.208-4.734-1.958-7.776-6.766-8.01-7.08-.226-.314-1.892-2.52-1.892-4.808s1.2-3.41 1.628-3.878c.39-.428.918-.57 1.22-.57h.886c.282 0 .664-.106 1.036.796.39.946 1.336 3.244 1.452 3.474.116.23.194.498.038.812-.156.314-.234.51-.468.786-.234.276-.492.618-.702.828-.194.194-.396.402-.168.786.228.384 1.014 1.674 2.174 2.712 1.492 1.336 2.75 1.75 3.166 1.944.316.15.672.112.922-.156.254-.27 1.078-1.256 1.366-1.69.288-.428.582-.356.986-.214.41.14 2.59 1.22 3.034 1.444.444.224.74.334.846.52.106.186.106 1.08-.284 2.178z" />
      </svg>
    </a>
  );
}
