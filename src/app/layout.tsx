import "@rainbow-me/rainbowkit/styles.css";
import * as React from "react";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Providers } from "@/components/Providers";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <NextIntlClientProvider>
          <Providers>{props.children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
