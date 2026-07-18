import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaTypes, initialDocuments } from "./schemaTypes";
import { structure } from "./structure";
import { SUPPORTED_LANGUAGES } from "./lib/languages";

export default defineConfig({
  name: "prof-khaled-website",
  title: "موقع البروفيسور خالد",
  projectId: "8f7avvop",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    internationalizedArray({
      languages: SUPPORTED_LANGUAGES,
      fieldTypes: ["string", "text"],
    }),
    documentInternationalization({
      supportedLanguages: SUPPORTED_LANGUAGES,
      schemaTypes: ["publication", "event", "page"],
      languageField: "language",
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const localizedTemplates = [
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `siteSettings-${locale.id}`,
          title: `إعدادات الموقع (${locale.title})`,
          schemaType: "siteSettings",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id },
        })),
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `contactInfo-${locale.id}`,
          title: `بيانات التواصل (${locale.title})`,
          schemaType: "contactInfo",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id },
        })),
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `cv-${locale.id}`,
          title: `السيرة الذاتية (${locale.title})`,
          schemaType: "cv",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id },
        })),
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `page-about-${locale.id}`,
          title: `صفحة نبذة عنّي (${locale.title})`,
          schemaType: "page",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id, slug: { _type: "slug", current: "about" }, pageTitle: "نبذة عنّي" },
        })),
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `page-books-${locale.id}`,
          title: `صفحة الكتب والمحاضرات (${locale.title})`,
          schemaType: "page",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id, slug: { _type: "slug", current: "books" }, pageTitle: "الكتب والمحاضرات" },
        })),
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `page-seminars-${locale.id}`,
          title: `صفحة الندوات (${locale.title})`,
          schemaType: "page",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id, slug: { _type: "slug", current: "seminars" }, pageTitle: "الندوات" },
        })),
        ...SUPPORTED_LANGUAGES.map((locale) => ({
          id: `page-contact-${locale.id}`,
          title: `صفحة التواصل (${locale.title})`,
          schemaType: "page",
          parameters: [{ name: "language", type: "string" }],
          value: { language: locale.id, slug: { _type: "slug", current: "contact" }, pageTitle: "التواصل" },
        })),
      ];
      return [...prev, ...localizedTemplates];
    },
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((item) =>
          !["siteSettings", "contactInfo", "cv"].includes(item.schemaType)
        );
      }
      return prev;
    },
  },
});
