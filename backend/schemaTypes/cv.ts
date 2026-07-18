import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

const cvSectionType = defineType({
  name: "cvSection",
  title: "قسم",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "العنوان", type: "string" }),
    defineField({ name: "body", title: "المحتوى", type: "text", rows: 4 }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "قسم" };
    },
  },
});

export const cvType = defineType({
  name: "cv",
  title: "السيرة الذاتية",
  type: "document",
  groups: [
    { name: "sections", title: "أقسام السيرة", default: true },
    { name: "qualifications", title: "المؤهلات" },
    { name: "experience", title: "الخبرة" },
    { name: "research", title: "الاهتمامات البحثية" },
    { name: "file", title: "ملف PDF" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true, options: { list: lang } }),
    defineField({ name: "bio", title: "السيرة المختصرة", type: "text", rows: 4, group: "sections" }),
    defineField({ name: "sections", title: "أقسام السيرة الذاتية", type: "array", of: [cvSectionType], group: "sections" }),
    defineField({
      name: "qualifications",
      title: "المؤهلات العلمية",
      type: "array",
      group: "qualifications",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "degree", title: "الدرجة", type: "string" }),
            defineField({ name: "institution", title: "الجامعة", type: "string" }),
            defineField({ name: "year", title: "السنة", type: "string" }),
          ],
          preview: { select: { title: "degree", subtitle: "institution" } },
        },
      ],
    }),
    defineField({
      name: "experience",
      title: "الخبرة الأكاديمية",
      type: "array",
      group: "experience",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "position", title: "المنصب", type: "string" }),
            defineField({ name: "institution", title: "المؤسسة", type: "string" }),
            defineField({ name: "period", title: "الفترة", type: "string" }),
          ],
          preview: { select: { title: "position", subtitle: "institution" } },
        },
      ],
    }),
    defineField({
      name: "researchInterests",
      title: "الاهتمامات البحثية",
      type: "array",
      group: "research",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "pdfFile", title: "ملف السيرة الذاتية PDF", type: "file", group: "file" }),
    defineField({ name: "lastUpdated", title: "آخر تحديث", type: "datetime", group: "file" }),
  ],
  preview: {
    select: { language: "language" },
    prepare({ language }) {
      return { title: "السيرة الذاتية", subtitle: language?.toUpperCase() || "" };
    },
  },
});
