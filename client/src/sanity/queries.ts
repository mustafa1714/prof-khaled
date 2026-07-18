import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && language == $lang][0]{
    siteName, siteTitle, profilePhoto, footerTagline, footerCopyright,
    notFoundTitle, notFoundText,
    heroEyebrow, heroTitle, heroSubtitle,
    heroCTA1Text, heroCTA1Link, heroCTA2Text, heroCTA2Link,
    statsBooks, statsBooksLabel, statsLectures, statsLecturesLabel,
    statsSeminars, statsSeminarsLabel, statsYears, statsYearsLabel,
    homeBooksTitle, homeBooksSubtitle, homeBooksAllBtn,
    homeSeminarsTitle, homeSeminarsSubtitle, homeSeminarsAllBtn,
    aboutEyebrow, aboutTitle, aboutText, aboutMoreText,
    ctaTitle, ctaText, ctaButtonText
  }`
);

export const PUBLICATIONS_QUERY = defineQuery(
  `*[_type == "publication" && language == $lang && !(_id in path("drafts.**"))] | order(order asc, year desc){
    _id, pubType, title, year, description, order, featured,
    coverImage, pdfFile, readContent
  }`
);

export const EVENTS_QUERY = defineQuery(
  `*[_type == "event" && language == $lang && !(_id in path("drafts.**"))] | order(date desc){
    _id, title, eventType, date, place, description,
    externalUrl, recordingUrl, isLive, liveUrl, liveDate
  }`
);

export const CONTACT_INFO_QUERY = defineQuery(
  `*[_type == "contactInfo" && language == $lang][0]{
    email, phone, office, address, hours,
    whatsappNumber, whatsappDefaultMsg,
    socialLinks, mapEmbedUrl
  }`
);

export const CV_QUERY = defineQuery(
  `*[_type == "cv" && language == $lang][0]{
    bio, sections, qualifications, experience,
    researchInterests, pdfFile, lastUpdated
  }`
);
