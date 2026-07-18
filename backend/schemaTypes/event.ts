import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

const eventTypes = [
  { title: "مؤتمر دولي", value: "conference" },
  { title: "ندوة علمية", value: "seminar" },
  { title: "ورشة عمل", value: "workshop" },
  { title: "ملتقى أكاديمي", value: "forum" },
  { title: "محاضرة", value: "lecture" },
];

export const eventType = defineType({
  name: "event",
  title: "الفعاليات والندوات",
  type: "document",
  groups: [
    { name: "main", title: "البيانات", default: true },
    { name: "links", title: "الروابط والمحتوى" },
    { name: "live", title: "البث المباشر" },
    { name: "settings", title: "الإعدادات" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true, options: { list: lang } }),
    defineField({ name: "i18nId", type: "string", hidden: true }),
    defineField({ name: "title", title: "العنوان", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({ name: "eventType", title: "نوع الفعالية", type: "string", group: "main", options: { list: eventTypes }, validation: (r) => r.required() }),
    defineField({ name: "date", title: "التاريخ", type: "date", group: "main", validation: (r) => r.required() }),
    defineField({ name: "place", title: "المكان", type: "string", group: "main" }),
    defineField({ name: "description", title: "الوصف", type: "text", rows: 3, group: "main" }),
    defineField({ name: "externalUrl", title: "رابط الفعالية", type: "url", group: "links", description: "الرابط الأصلي للفعالية على الإنترنت" }),
    defineField({ name: "recordingUrl", title: "رابط التسجيل", type: "url", group: "links", description: "رابط فيديو التسجيل بعد الفعالية" }),
    defineField({ name: "isLive", title: "بث مباشر الآن", type: "boolean", group: "live", initialValue: false }),
    defineField({ name: "liveUrl", title: "رابط البث المباشر", type: "url", group: "live" }),
    defineField({ name: "liveDate", title: "موعد البث المباشر", type: "datetime", group: "live" }),
    defineField({ name: "order", title: "الترتيب", type: "number", group: "settings", initialValue: 0 }),
    defineField({ name: "seoTitle", title: "عنوان SEO", type: "string", group: "settings" }),
    defineField({ name: "seoDescription", title: "وصف SEO", type: "text", rows: 2, group: "settings" }),
  ],
  preview: {
    select: { title: "title", date: "date", eventType: "eventType", language: "language", isLive: "isLive" },
    prepare({ title, date, eventType, language, isLive }) {
      const typeObj = eventTypes.find((t) => t.value === eventType);
      const liveTag = isLive ? " 🔴 مباشر" : "";
      return {
        title: title || "فعالية",
        subtitle: `${typeObj?.title || eventType || ""} — ${date || ""} [${language?.toUpperCase() || ""}]${liveTag}`,
      };
    },
  },
  orderings: [{ title: "الأحدث أولاً", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});
