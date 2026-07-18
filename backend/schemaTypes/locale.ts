import { defineType, defineField } from "sanity";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const languages = SUPPORTED_LANGUAGES.map((l) => ({
  title: l.title,
  value: l.id,
}));

export const localeType = defineType({
  name: "locale",
  title: "اللغات",
  type: "document",
  fields: [
    defineField({ name: "name", title: "الاسم", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", title: "الكود", type: "string", validation: (r) => r.required() }),
    defineField({ name: "isDefault", title: "الافتراضية", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "tag" } },
});

export const localeDocuments = SUPPORTED_LANGUAGES.map((l) => ({
  _type: "locale" as const,
  _id: `locale-${l.id}`,
  name: l.title,
  tag: l.id,
  isDefault: l.isDefault,
}));
