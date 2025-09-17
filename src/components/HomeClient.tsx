"use client";

import { useContractAddress } from "@/contracts";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAccount } from "wagmi";
import CreateStoryBox from "./CreateStoryBox";
import EmptyNetworkHint from "./EmptyNetworkHint";
import PleaseConnect from "./PleaseConnect";
import StoryList from "./StoryList";

export default function HomeClient() {
  const t = useTranslations("Home");
  const { address, isConnected, chain } = useAccount();
  const [tabIndex, setTabIndex] = useState(0);
  const contractAddress = useContractAddress();

  if (!isConnected) {
    return <PleaseConnect />;
  }

  if (!contractAddress) {
    return <EmptyNetworkHint />;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("stories")}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={(event, value) => setTabIndex(value)}>
          <Tab label={t("market")} />
          <Tab label={t("my")} />
        </Tabs>
      </Box>
      {tabIndex == 0 && <StoryList contractAddress={contractAddress} />}
      {tabIndex == 1 && (
        <StoryList owner={address} contractAddress={contractAddress} />
      )}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("createStory")}
      </Typography>
      <CreateStoryBox contractAddress={contractAddress} />
    </div>
  );
}
