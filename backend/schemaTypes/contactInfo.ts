import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

const socialLinkType = defineType({
  name: "socialLink",
  title: "رابط اجتماعي",
  type: "object",
  fields: [
    defineField({ name: "label", title: "الاسم", type: "string" }),
    defineField({ name: "url", title: "الرابط", type: "url" }),
    defineField({
      name: "platform",
      title: "المنصة",
      type: "string",
      options: {
        list: ["Google Scholar", "ResearchGate", "ORCID", "LinkedIn", "Twitter/X", "Academia.edu", "YouTube", "Other"],
      },
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "platform" },
  },
});

export const contactInfoType = defineType({
  name: "contactInfo",
  title: "بيانات التواصل",
  type: "document",
  groups: [
    { name: "basic", title: "البيانات الأساسية", default: true },
    { name: "whatsapp", title: "الواتساب" },
    { name: "social", title: "الحسابات الأكاديمية" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true, options: { list: lang } }),
    defineField({ name: "email", title: "البريد الإلكتروني", type: "string", group: "basic", validation: (r) => r.required() }),
    defineField({ name: "phone", title: "الهاتف", type: "string", group: "basic" }),
    defineField({ name: "office", title: "المكتب", type: "string", group: "basic" }),
    defineField({ name: "address", title: "العنوان", type: "string", group: "basic" }),
    defineField({ name: "hours", title: "ساعات الاستقبال", type: "string", group: "basic" }),
    defineField({ name: "mapEmbedUrl", title: "رابط خرائط جوجل", type: "url", group: "basic" }),
    defineField({ name: "whatsappNumber", title: "رقم الواتساب", type: "string", group: "whatsapp", description: "الرقم الدولي مع كود الدولة مثال: 201000000000", validation: (r) => r.regex(/^\d{10,15}$/, { name: "رقم دولي صحيح" }) }),
    defineField({ name: "whatsappDefaultMsg", title: "الرسالة الافتراضية", type: "string", group: "whatsapp", initialValue: "مرحباً، أتواصل مع البروفيسور" }),
    defineField({ name: "socialLinks", title: "الحسابات الأكاديمية", type: "array", of: [socialLinkType], group: "social" }),
    defineField({ name: "seoTitle", title: "عنوان SEO", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "وصف SEO", type: "text", rows: 3, group: "seo" }),
  ],
  preview: {
    select: { language: "language", email: "email" },
    prepare({ language, email }) {
      return { title: "بيانات التواصل", subtitle: `${language?.toUpperCase() || ""} — ${email || ""}` };
    },
  },
});
