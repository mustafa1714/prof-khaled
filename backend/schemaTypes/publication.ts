import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

export const readBlockContent = defineType({
  name: "readBlockContent",
  type: "array",
  title: "المحتوى القابل للقراءة",
  of: [
    {
      type: "block",
      styles: [
        { title: "عادي", value: "normal" },
        { title: "عنوان 2", value: "h2" },
        { title: "عنوان 3", value: "h3" },
      ],
      lists: [
        { title: "قائمة نقطية", value: "bullet" },
        { title: "قائمة مرقمة", value: "number" },
      ],
    },
  ],
});

export const publicationType = defineType({
  name: "publication",
  title: "الكتب والمحاضرات",
  type: "document",
  groups: [
    { name: "main", title: "البيانات", default: true },
    { name: "content", title: "المحتوى" },
    { name: "files", title: "الملفات" },
    { name: "settings", title: "الإعدادات" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true, options: { list: lang } }),
    defineField({ name: "i18nId", type: "string", hidden: true, description: "المعرف المشترك بين الترجمات" }),
    defineField({
      name: "pubType",
      title: "النوع",
      type: "string",
      group: "main",
      options: { list: [{ title: "كتاب", value: "book" }, { title: "محاضرة", value: "lecture" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "العنوان", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({ name: "year", title: "السنة", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({ name: "description", title: "الوصف المختصر", type: "text", rows: 3, group: "main" }),
    defineField({ name: "coverImage", title: "صورة الغلاف", type: "image", group: "main", options: { hotspot: true } }),
    defineField({ name: "readContent", title: "المحتوى للقراءة على الموقع", type: "readBlockContent", group: "content" }),
    defineField({ name: "pdfFile", title: "ملف PDF", type: "file", group: "files" }),
    defineField({ name: "order", title: "الترتيب", type: "number", group: "settings", initialValue: 0 }),
    defineField({ name: "featured", title: "يظهر في الرئيسية", type: "boolean", group: "settings", initialValue: false }),
    defineField({ name: "seoTitle", title: "عنوان SEO", type: "string", group: "settings" }),
    defineField({ name: "seoDescription", title: "وصف SEO", type: "text", rows: 2, group: "settings" }),
  ],
  preview: {
    select: { title: "title", type: "pubType", year: "year", language: "language", media: "coverImage" },
    prepare({ title, type, year, language, media }) {
      const typeLabel = type === "book" ? "كتاب" : "محاضرة";
      return { title: title || "بدون عنوان", subtitle: `${typeLabel} — ${year || ""} [${language?.toUpperCase() || ""}]`, media };
    },
  },
  orderings: [
    { title: "الأحدث أولاً", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "الترتيب", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
