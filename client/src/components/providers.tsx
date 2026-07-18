"use client";

import { ThemeProvider } from "./theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { DirectionProvider } from "@radix-ui/react-direction";
import { ReactNode } from "react";
import { ReaderProvider } from "./reader-context";

type Props = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  timeZone: string;
  dir: "ltr" | "rtl";
};

export function Providers({ children, locale, messages, timeZone, dir }: Props) {
  return (
    <DirectionProvider dir={dir}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        <ThemeProvider>
          <ReaderProvider>{children}</ReaderProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </DirectionProvider>
  );
}
