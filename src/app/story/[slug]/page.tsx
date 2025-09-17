"use client";

import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import EmptyNetworkHint from "@/components/EmptyNetworkHint";
import { contractAbi } from "@/contract_abi";
import { useContractAddress } from "@/contracts";
import { Box, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useReadContract } from "wagmi";
import StoryEventTable from "./StoryEventTable";
import StoryInput from "./StoryInput";
import StoryStatus from "./StoryStatus";

export default function Story() {
  const t = useTranslations("Story");
  const pathname = usePathname();
  const contractAddress = useContractAddress();
  let storyID = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title={`${t("story")} #${storyID}`} />
        {contractAddress ? (
          <StoryBody storyID={storyID} contractAddress={contractAddress} />
        ) : (
          <EmptyNetworkHint />
        )}
      </Box>
    </Container>
  );
}

function StoryBody({
  storyID,
  contractAddress,
}: {
  storyID: string;
  contractAddress: `0x${string}`;
}) {
  const t = useTranslations("Story");

  const {
    data: story,
    error,
    isPending,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getStory",
    args: [BigInt(+storyID)],
  });

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("comments")}
      </Typography>
      <StoryEventTable story={story} />
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("status")}
      </Typography>
      <StoryStatus story={story} />
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("interactions")}
      </Typography>
      <StoryInput story={story} contractAddress={contractAddress} />
      <Copyright />
    </Box>
  );
}
