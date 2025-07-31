"use client";

import { Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";

export default function PleaseConnect() {
  const t = useTranslations("App");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography align="center" variant="h6" marginTop={4} marginBottom={2}>
        {t("pleaseConnect")}
      </Typography>
      <ConnectButton />
    </div>
  );
}
