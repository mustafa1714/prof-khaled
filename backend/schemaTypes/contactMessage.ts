import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const lang = SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.id }));

export const contactMessageType = defineType({
  name: "contactMessage",
  title: "رسائل التواصل",
  type: "document",
  groups: [
    { name: "sender", title: "المرسل", default: true },
    { name: "content", title: "المحتوى" },
    { name: "status", title: "الحالة" },
  ],
  fields: [
    defineField({ name: "name", title: "الاسم", type: "string", group: "sender", validation: (r) => r.required() }),
    defineField({ name: "email", title: "البريد الإلكتروني", type: "string", group: "sender", validation: (r) => r.required().email() }),
    defineField({ name: "phone", title: "الهاتف", type: "string", group: "sender" }),
    defineField({ name: "subject", title: "الموضوع", type: "string", group: "content" }),
    defineField({ name: "message", title: "الرسالة", type: "text", rows: 6, group: "content", validation: (r) => r.required() }),
    defineField({ name: "language", title: "اللغة", type: "string", group: "sender", options: { list: lang }, initialValue: "ar" }),
    defineField({ name: "sentAt", title: "وقت الإرسال", type: "datetime", group: "sender", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "status",
      title: "الحالة",
      type: "string",
      group: "status",
      options: {
        list: [
          { title: "غير مقروءة", value: "unread" },
          { title: "مقروءة", value: "read" },
          { title: "تمت الإجابة", value: "replied" },
          { title: "أرشيف", value: "archived" },
        ],
      },
      initialValue: "unread",
    }),
    defineField({ name: "adminNotes", title: "ملاحظات داخلية", type: "text", rows: 3, group: "status" }),
  ],
  preview: {
    select: { name: "name", email: "email", subject: "subject", status: "status", sentAt: "sentAt" },
    prepare({ name, email, subject, status, sentAt }) {
      const statusMap = { unread: "📩 غير مقروءة", read: "📖 مقروءة", replied: "✅ تمت الإجابة", archived: "📁 أرشيف" };
      return {
        title: name || "مرسل مجهول",
        subtitle: `${subject || "بدون موضوع"} — ${statusMap[status] || status || ""}`,
      };
    },
  },
  orderings: [{ title: "الأحدث", name: "sentAtDesc", by: [{ field: "sentAt", direction: "desc" }] }],
});
