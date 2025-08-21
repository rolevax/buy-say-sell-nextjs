"use client";

import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { WagmiProvider } from "wagmi";

import { LocaleCode } from "@/i18n/config";
import { useMediaQuery } from "@mui/material";
import { useLocale } from "next-intl";
import { sepolia } from "wagmi/chains";
import { config } from "../wagmi";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Providers2>{children}</Providers2>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export function Providers2({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const isDark = mode == "dark" || (mode == "system" && prefersDarkMode);
  const locale = useLocale() as LocaleCode;

  return (
    <RainbowKitProvider
      initialChain={sepolia}
      theme={isDark ? darkTheme() : lightTheme()}
      locale={locale}
    >
      {children}
    </RainbowKitProvider>
  );
}
