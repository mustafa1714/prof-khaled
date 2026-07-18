import { StructureBuilder } from "sanity/structure";
import { LOCALES } from "../lib/languages";

const localizedSingletons = [
  { typeName: "siteSettings", title: "إعدادات الموقع", icon: "⚙️" },
  { typeName: "contactInfo", title: "بيانات التواصل", icon: "📞" },
  { typeName: "cv", title: "السيرة الذاتية", icon: "📄" },
];

function createLocalizedSingleton(S: StructureBuilder, typeName: string, title: string, icon: string) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .title(`${title} (${locale.id.toUpperCase()})`)
              .icon(icon)
              .child(
                S.document()
                  .schemaType(typeName)
                  .documentId(`${typeName}-${locale.id}`)
                  .title(`${title} — ${locale.title}`)
              )
          )
        )
    );
}

const localizedPageSingleton = (S: StructureBuilder) =>
  S.listItem()
    .title("الصفحات")
    .icon("📄")
    .child(
      S.list()
        .title("الصفحات")
        .items([
          S.listItem()
            .title("الصفحات (ar)")
            .icon("📄")
            .child(
              S.documentList()
                .title("الصفحات (ar)")
                .filter('_type == "page" && language == "ar"')
            ),
          S.listItem()
            .title("الصفحات (en)")
            .icon("📄")
            .child(
              S.documentList()
                .title("الصفحات (en)")
                .filter('_type == "page" && language == "en"')
            ),
          S.listItem()
            .title("الصفحات (tr)")
            .icon("📄")
            .child(
              S.documentList()
                .title("الصفحات (tr)")
                .filter('_type == "page" && language == "tr"')
            ),
        ])
    );

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("المحتوى")
    .items([
      ...localizedSingletons.map((s) => createLocalizedSingleton(S, s.typeName, s.title, s.icon)),
      S.divider(),
      localizedPageSingleton(S),
      S.listItem()
        .title("الكتب والمحاضرات")
        .icon("📚")
        .child(
          S.list()
            .title("الكتب والمحاضرات")
            .items([
              S.listItem()
                .title("ar — العربية")
                .child(S.documentList().title("الكتب والمحاضرات (ar)").filter('_type == "publication" && language == "ar"')),
              S.listItem()
                .title("en — English")
                .child(S.documentList().title("الكتب والمحاضرات (en)").filter('_type == "publication" && language == "en"')),
              S.listItem()
                .title("tr — Türkçe")
                .child(S.documentList().title("الكتب والمحاضرات (tr)").filter('_type == "publication" && language == "tr"')),
            ])
        ),
      S.listItem()
        .title("الفعاليات والندوات")
        .icon("🎯")
        .child(
          S.list()
            .title("الفعاليات والندوات")
            .items([
              S.listItem()
                .title("ar — العربية")
                .child(S.documentList().title("الفعاليات (ar)").filter('_type == "event" && language == "ar"')),
              S.listItem()
                .title("en — English")
                .child(S.documentList().title("الفعاليات (en)").filter('_type == "event" && language == "en"')),
              S.listItem()
                .title("tr — Türkçe")
                .child(S.documentList().title("الفعاليات (tr)").filter('_type == "event" && language == "tr"')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("📩 الرسائل الواردة")
        .icon("📩")
        .child(
          S.list()
            .title("الرسائل الواردة")
            .items([
              S.listItem()
                .title("📩 غير مقروءة")
                .child(
                  S.documentList()
                    .title("غير مقروءة")
                    .filter('_type == "contactMessage" && status == "unread"')
                    .defaultOrdering([{ field: "sentAt", direction: "desc" }])
                ),
              S.listItem()
                .title("📖 مقروءة")
                .child(
                  S.documentList()
                    .title("مقروءة")
                    .filter('_type == "contactMessage" && status == "read"')
                    .defaultOrdering([{ field: "sentAt", direction: "desc" }])
                ),
              S.listItem()
                .title("✅ تمت الإجابة")
                .child(
                  S.documentList()
                    .title("تمت الإجابة")
                    .filter('_type == "contactMessage" && status == "replied"')
                    .defaultOrdering([{ field: "sentAt", direction: "desc" }])
                ),
              S.listItem()
                .title("📁 الأرشيف")
                .child(
                  S.documentList()
                    .title("الأرشيف")
                    .filter('_type == "contactMessage" && status == "archived"')
                    .defaultOrdering([{ field: "sentAt", direction: "desc" }])
                ),
              S.listItem()
                .title("الكل")
                .child(S.documentList().title("كل الرسائل").filter('_type == "contactMessage"').defaultOrdering([{ field: "sentAt", direction: "desc" }])),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("اللغات")
        .icon("🌐")
        .child(S.documentTypeList("locale").title("اللغات").filter('_type == "locale"')),
    ]);
