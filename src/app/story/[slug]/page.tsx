"use client";

import AddressLink from "@/components/AddressLink";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import { contractAbi, getContractAddress } from "@/contracts";
import {
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import StoryEventTable from "./StoryEventTable";
import StoryInput from "./StoryInput";
import StoryStatus from "./StoryStatus";

export default function Story() {
  const t = useTranslations("Story");
  const pathname = usePathname();
  let storyID = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title={`${t("story")} #${storyID}`} />
        <StoryBody storyID={storyID} />
      </Box>
    </Container>
  );
}

function StoryBody(props: { storyID: string }) {
  const t = useTranslations("Story");
  const {
    data: story,
    error,
    isPending,
  } = useReadContract({
    address: getContractAddress(),
    abi: contractAbi,
    functionName: "getStory",
    args: [BigInt(+props.storyID)],
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

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
      <StoryInput story={story} />
      <Copyright />
    </Box>
  );
}
