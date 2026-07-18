import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

const blockContent = defineType({
  name: "blockContent",
  type: "array",
  title: "المحتوى",
  of: [
    {
      type: "block",
      styles: [
        { title: "عادي", value: "normal" },
        { title: "عنوان 2", value: "h2" },
        { title: "عنوان 3", value: "h3" },
        { title: "اقتباس", value: "blockquote" },
      ],
      lists: [
        { title: "قائمة نقطية", value: "bullet" },
        { title: "قائمة مرقمة", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "عريض", value: "strong" },
          { title: "مائل", value: "em" },
        ],
        annotations: [
          {
            title: "رابط",
            name: "link",
            type: "object",
            fields: [{ name: "href", type: "url", title: "الرابط" }],
          },
        ],
      },
    },
  ],
});

export const pageType = defineType({
  name: "page",
  title: "الصفحات",
  type: "document",
  groups: [
    { name: "content", title: "المحتوى", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true, options: { list: lang } }),
    defineField({
      name: "slug",
      title: "الرابط",
      type: "slug",
      group: "content",
      options: { source: "pageTitle" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "pageTitle", title: "عنوان الصفحة", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "heroEyebrow", title: "العنوان الفرعي", type: "string", group: "content" }),
    defineField({ name: "heroTitle", title: "عنوان الهيرو", type: "string", group: "content" }),
    defineField({ name: "heroSubtitle", title: "وصف الهيرو", type: "text", rows: 2, group: "content" }),
    defineField({ name: "pageBuilder", title: "محتوى الصفحة", type: "blockContent", group: "content" }),
    defineField({ name: "seoTitle", title: "عنوان SEO", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "وصف SEO", type: "text", rows: 3, group: "seo" }),
  ],
  preview: {
    select: { title: "pageTitle", language: "language", slug: "slug" },
    prepare({ title, language, slug }) {
      return { title: title || "صفحة", subtitle: `${language?.toUpperCase() || ""} — /${slug?.current || ""}` };
    },
  },
});

export { blockContent };
