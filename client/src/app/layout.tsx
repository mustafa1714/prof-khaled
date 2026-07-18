import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Prof. Khaled",
    template: "%s | Prof. Khaled",
  },
  description:
    "University Professor & Academic Researcher — Books, Lectures, Seminars",
  metadataBase: new URL("https://profkhaled.com"),
  openGraph: {
    title: "Prof. Khaled",
    description:
      "University Professor & Academic Researcher — Books, Lectures, Seminars",
    type: "website",
    locale: "ar",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1622" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
