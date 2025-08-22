"use client";

import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";
import CreateStoryBox from "./CreateStoryBox";
import PleaseConnect from "./PleaseConnect";
import StoryList from "./StoryList";

export default function HomeClient() {
  const t = useTranslations("Home");
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <PleaseConnect />;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("market")}
      </Typography>
      <StoryList />
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("createStory")}
      </Typography>
      <CreateStoryBox />
    </div>
  );
}
