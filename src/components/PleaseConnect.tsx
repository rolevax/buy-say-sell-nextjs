"use client";

import { Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function PleaseConnect() {
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
        Please connect your wallet to use.
      </Typography>
      <ConnectButton />
    </div>
  );
}
