import "@rainbow-me/rainbowkit/styles.css";
import * as React from "react";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Providers } from "@/components/Providers";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
