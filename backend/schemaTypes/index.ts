import { localeType, localeDocuments } from "./locale";
import { siteSettingsType } from "./siteSettings";
import { pageType, blockContent } from "./page";
import { publicationType, readBlockContent } from "./publication";
import { eventType } from "./event";
import { contactInfoType } from "./contactInfo";
import { contactMessageType } from "./contactMessage";
import { cvType } from "./cv";

export const schemaTypes = [
  localeType,
  siteSettingsType,
  blockContent,
  readBlockContent,
  pageType,
  publicationType,
  eventType,
  contactInfoType,
  contactMessageType,
  cvType,
];

export const initialDocuments = localeDocuments;
