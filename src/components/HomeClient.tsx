"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";
import CreateStoryBox from "./CreateStoryBox";
import PleaseConnect from "./PleaseConnect";
import StoryList from "./StoryList";
import { useState } from "react";
import { PagesOutlined } from "@mui/icons-material";

export default function HomeClient() {
  const t = useTranslations("Home");
  const { address, isConnected } = useAccount();
  const [tabIndex, setTabIndex] = useState(0);

  if (!isConnected) {
    return <PleaseConnect />;
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
      {tabIndex == 0 && <StoryList />}
      {tabIndex == 1 && <StoryList owner={address} />}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("createStory")}
      </Typography>
      <CreateStoryBox />
    </div>
  );
}
