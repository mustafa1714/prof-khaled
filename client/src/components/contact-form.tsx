"use client";

import { useState, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 150;
const MAX_MESSAGE = 2000;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [charCounts, setCharCounts] = useState({ name: 0, email: 0, subject: 0, message: 0 });

  function validateForm(form: HTMLFormElement): FieldErrors {
    const fd = new FormData(form);
    const e: FieldErrors = {};
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name) e.name = t("required");
    if (!email) {
      e.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = t("invalidEmail");
    }
    if (!message) e.message = t("required");
    return e;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);

    const form = e.currentTarget;
    const fieldErrors = validateForm(form);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const firstField = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        Object.keys(fieldErrors).map(k => `[name="${k}"]`).join(", ")
      );
      firstField?.focus();
      return;
    }

    setSubmitting(true);
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
          language: locale,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setMsg({ text: t("sent"), type: "success" });
      setErrors({});
      form.reset();
    } catch {
      setMsg({ text: t("error"), type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  function clearFieldError(name: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name as keyof FieldErrors];
      return next;
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-7" noValidate>
      <h2 className="mb-5 text-[24px] font-bold text-navy dark:text-gold-soft">{t("title")}</h2>

      <div className="mb-4 flex flex-col gap-1.5">
        <Label htmlFor="contact-name" className="text-[14px] font-semibold text-foreground">{t("name")} *</Label>
        <Input
          id="contact-name"
          name="name"
          required
          maxLength={MAX_NAME}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : "hint-name"}
          onChange={(e) => { clearFieldError("name"); setCharCounts(p => ({ ...p, name: e.target.value.length })); }}
          className={`rounded-[10px] bg-bg py-3 text-[15px] ${errors.name ? "border-error focus-visible:border-error focus-visible:ring-error/30" : "border-line"}`}
        />
        <div className="flex justify-between text-[12px]">
          {errors.name ? <p id="error-name" role="alert" className="text-error">{errors.name}</p> : <span />}
          <span id="hint-name" className="ms-auto text-muted">{charCounts.name}/{MAX_NAME}</span>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-1.5">
        <Label htmlFor="contact-email" className="text-[14px] font-semibold text-foreground">{t("email")} *</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={MAX_EMAIL}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : "hint-email"}
          onChange={(e) => { clearFieldError("email"); setCharCounts(p => ({ ...p, email: e.target.value.length })); }}
          className={`rounded-[10px] bg-bg py-3 text-[15px] ${errors.email ? "border-error focus-visible:border-error focus-visible:ring-error/30" : "border-line"}`}
        />
        <div className="flex justify-between text-[12px]">
          {errors.email ? <p id="error-email" role="alert" className="text-error">{errors.email}</p> : <span />}
          <span id="hint-email" className="ms-auto text-muted">{charCounts.email}/{MAX_EMAIL}</span>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-1.5">
        <Label htmlFor="contact-subject" className="text-[14px] font-semibold text-foreground">{t("subject")}</Label>
        <Input
          id="contact-subject"
          name="subject"
          maxLength={MAX_SUBJECT}
          aria-describedby="hint-subject"
          onChange={(e) => setCharCounts(p => ({ ...p, subject: e.target.value.length }))}
          className="rounded-[10px] border-line bg-bg py-3 text-[15px]"
        />
        <span id="hint-subject" className="ms-auto text-[12px] text-muted">{charCounts.subject}/{MAX_SUBJECT}</span>
      </div>

      <div className="mb-4 flex flex-col gap-1.5">
        <Label htmlFor="contact-message" className="text-[14px] font-semibold text-foreground">{t("message")} *</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={MAX_MESSAGE}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : "hint-message"}
          onChange={(e) => { clearFieldError("message"); setCharCounts(p => ({ ...p, message: e.target.value.length })); }}
          className={`rounded-[10px] bg-bg py-3 text-[15px] ${errors.message ? "border-error focus-visible:border-error focus-visible:ring-error/30" : "border-line"}`}
        />
        <div className="flex justify-between text-[12px]">
          {errors.message ? <p id="error-message" role="alert" className="text-error">{errors.message}</p> : <span />}
          <span id="hint-message" className={`ms-auto ${charCounts.message >= MAX_MESSAGE * 0.9 ? "text-error" : "text-muted"}`}>
            {charCounts.message}/{MAX_MESSAGE}
          </span>
        </div>
      </div>

      <Button type="submit" disabled={submitting} className="rounded-full bg-gold px-6 py-3 text-[15px] font-semibold text-[#2a1f05] hover:bg-gold-soft disabled:opacity-70">
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
              <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            {t("send")}
          </span>
        ) : t("send")}
      </Button>

      {msg && (
        <p role="alert" aria-live="polite" className={`mt-3.5 rounded-[10px] px-3.5 py-3 text-[14px] ${msg.type === "success" ? "form-success" : "form-error"}`}>
          {msg.text}
        </p>
      )}
    </form>
  );
}
