export interface SanityImage {
  _ref?: string;
  _type?: string;
}

export interface SanityFile {
  _ref?: string;
  _type?: string;
}

export interface SiteSettings {
  siteName?: string;
  siteTitle?: string;
  profilePhoto?: SanityImage;
  footerTagline?: string;
  footerCopyright?: string;
  notFoundTitle?: string;
  notFoundText?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCTA1Text?: string;
  heroCTA1Link?: string;
  heroCTA2Text?: string;
  heroCTA2Link?: string;
  statsBooks?: number;
  statsBooksLabel?: string;
  statsLectures?: number;
  statsLecturesLabel?: string;
  statsSeminars?: number;
  statsSeminarsLabel?: string;
  statsYears?: string;
  statsYearsLabel?: string;
  homeBooksTitle?: string;
  homeBooksSubtitle?: string;
  homeBooksAllBtn?: string;
  homeSeminarsTitle?: string;
  homeSeminarsSubtitle?: string;
  homeSeminarsAllBtn?: string;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutText?: string;
  aboutMoreText?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButtonText?: string;
}

export interface Publication {
  _id: string;
  pubType?: string;
  title?: string;
  year?: string;
  description?: string;
  order?: number;
  featured?: boolean;
  coverImage?: SanityImage;
  pdfFile?: SanityFile;
  readContent?: unknown[];
}

export interface Event {
  _id: string;
  title?: string;
  eventType?: string;
  date?: string;
  place?: string;
  description?: string;
  externalUrl?: string;
  recordingUrl?: string;
  isLive?: boolean;
  liveUrl?: string;
  liveDate?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  office?: string;
  address?: string;
  hours?: string;
  whatsappNumber?: string;
  whatsappDefaultMsg?: string;
  socialLinks?: { label?: string; platform?: string; url?: string }[];
  mapEmbedUrl?: string;
}

export interface CvSection {
  heading?: string;
  body?: string;
}

export interface CvQualification {
  degree?: string;
  institution?: string;
  year?: string;
}

export interface CvExperience {
  position?: string;
  institution?: string;
  period?: string;
}

export interface Cv {
  bio?: string;
  sections?: CvSection[];
  qualifications?: CvQualification[];
  experience?: CvExperience[];
  researchInterests?: string[];
  pdfFile?: SanityFile;
  lastUpdated?: string;
}
