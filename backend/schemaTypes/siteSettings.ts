import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "إعدادات الموقع",
  type: "document",
  groups: [
    { name: "basic", title: "البيانات الأساسية", default: true },
    { name: "hero", title: "الهيرو" },
    { name: "home", title: "الصفحة الرئيسية" },
    { name: "about", title: "نبذة عني" },
    { name: "cta", title: "دعوة للتواصل" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true, options: { list: lang } }),
    defineField({ name: "siteName", title: "اسم الموقع", type: "string", group: "basic", validation: (r) => r.required() }),
    defineField({ name: "siteTitle", title: "اللقب الوظيفي", type: "string", group: "basic" }),
    defineField({ name: "profilePhoto", title: "صورة البروفيسور", type: "image", group: "basic", options: { hotspot: true } }),
    defineField({ name: "footerTagline", title: "نص الفوتر", type: "text", rows: 2, group: "basic" }),
    defineField({ name: "footerCopyright", title: "نص حقوق النشر", type: "string", group: "basic", initialValue: "جميع الحقوق محفوظة" }),
    defineField({ name: "notFoundTitle", title: "عنوان الخطأ 404", type: "string", group: "basic" }),
    defineField({ name: "notFoundText", title: "نص الخطأ 404", type: "text", rows: 2, group: "basic" }),
    defineField({ name: "heroEyebrow", title: "العنوان الفرعي العلوي", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "عنوان الهيرو", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "وصف الهيرو", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroCTA1Text", title: "نص الزر الأول", type: "string", group: "hero" }),
    defineField({ name: "heroCTA1Link", title: "رابط الزر الأول", type: "string", group: "hero", initialValue: "#/books" }),
    defineField({ name: "heroCTA2Text", title: "نص الزر الثاني", type: "string", group: "hero" }),
    defineField({ name: "heroCTA2Link", title: "رابط الزر الثاني", type: "string", group: "hero", initialValue: "#/contact" }),
    defineField({ name: "statsBooks", title: "عدد الإحصائية (كتب)", type: "number", group: "hero" }),
    defineField({ name: "statsBooksLabel", title: "تسمية الكتب", type: "string", group: "hero" }),
    defineField({ name: "statsLectures", title: "عدد الإحصائية (محاضرات)", type: "number", group: "hero" }),
    defineField({ name: "statsLecturesLabel", title: "تسمية المحاضرات", type: "string", group: "hero" }),
    defineField({ name: "statsSeminars", title: "عدد الإحصائية (ندوات)", type: "number", group: "hero" }),
    defineField({ name: "statsSeminarsLabel", title: "تسمية الندوات", type: "string", group: "hero" }),
    defineField({ name: "statsYears", title: "سنوات الخبرة", type: "string", group: "hero" }),
    defineField({ name: "statsYearsLabel", title: "تسمية الخبرة", type: "string", group: "hero" }),
    defineField({ name: "aboutEyebrow", title: "العنوان الفرعي", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "عنوان النبذة", type: "string", group: "about" }),
    defineField({ name: "aboutText", title: "النص التعريفي", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutMoreText", title: "نص رابط المزيد", type: "string", group: "about" }),
    defineField({ name: "ctaTitle", title: "عنوان الدعوة", type: "string", group: "cta" }),
    defineField({ name: "ctaText", title: "نص الدعوة", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaButtonText", title: "نص زر الدعوة", type: "string", group: "cta" }),
    defineField({ name: "homeBooksTitle", title: "عنوان قسم الكتب", type: "string", group: "home" }),
    defineField({ name: "homeBooksSubtitle", title: "وصف قسم الكتب", type: "text", rows: 2, group: "home" }),
    defineField({ name: "homeBooksAllBtn", title: "نص زر كل الكتب", type: "string", group: "home" }),
    defineField({ name: "homeSeminarsTitle", title: "عنوان قسم الندوات", type: "string", group: "home" }),
    defineField({ name: "homeSeminarsSubtitle", title: "وصف قسم الندوات", type: "text", rows: 2, group: "home" }),
    defineField({ name: "homeSeminarsAllBtn", title: "نص زر كل الندوات", type: "string", group: "home" }),
    defineField({ name: "seoTitle", title: "عنوان SEO", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "وصف SEO", type: "text", rows: 3, group: "seo" }),
  ],
  preview: {
    select: { language: "language", title: "siteName" },
    prepare({ language, title }) {
      return { title: title || "إعدادات الموقع", subtitle: language?.toUpperCase() || "" };
    },
  },
});
