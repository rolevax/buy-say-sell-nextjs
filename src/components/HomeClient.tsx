"use client";

import { useAccount } from "wagmi";
import CreateStoryBox from "./CreateStoryBox";
import StoryList from "./StoryList";
import { Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HomeClient() {
  const { address } = useAccount();

  if (!address) {
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
          Please connect wallet
        </Typography>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div>
      <StoryList />
      <CreateStoryBox />
    </div>
  );
}
