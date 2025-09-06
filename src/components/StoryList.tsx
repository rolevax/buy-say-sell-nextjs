"use client";

import { contractAbi } from "@/contract_abi";
import { getContractAddress, StoryType } from "@/contracts";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useTranslations } from "use-intl";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

export default function StoryList({ owner }: { owner?: `0x${string}` }) {
  const t = useTranslations("Home");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, error, isPending } = useReadContract({
    address: getContractAddress(),
    abi: contractAbi,
    functionName: owner ? "getBalance" : "getStories",
    args: owner
      ? [owner, BigInt((page - 1) * pageSize), BigInt(pageSize)]
      : [BigInt((page - 1) * pageSize), BigInt(pageSize)],
  });

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let items: ReactNode | ReactNode[];
  let count = 1;
  if (isPending) {
    items = Array.from(Array(pageSize).keys()).map((i) => (
      <StoryListItem key={i} />
    ));
  } else {
    const [stories, total] = data as [StoryType[], BigInt];
    if (total == 0n) {
      items = (
        <Stack alignItems="center" spacing={1} sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" color="secondary">
            {t("empty")}
          </Typography>
          <Typography color="secondary">
            {owner ? t("emptyMy") : t("emptyMarket")}
          </Typography>
        </Stack>
      );
    } else {
      items = stories.map((story) => (
        <StoryListItem key={story.index} story={story} />
      ));
      count = Math.ceil(Number(total) / pageSize);
    }
  }

  return (
    <Stack spacing={2} alignItems="center">
      <List sx={{ width: "100%" }}>{items}</List>
      <Pagination
        count={count}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Stack>
  );
}

function StoryListItem({ story }: { story?: StoryType }) {
  const t = useTranslations("Home");

  return (
    <ListItem disablePadding>
      <ListItemButton
        disabled={!story}
        href={story ? `/story/${story.index}` : "/"}
      >
        <ListItemIcon>
          {story ? (
            <MetaMaskAvatar address={story.owner} />
          ) : (
            <Skeleton variant="circular" width={24} height={24} />
          )}
        </ListItemIcon>
        <Stack>
          {story ? (
            <ListItemText primary={story.comments[0].content} />
          ) : (
            <ListItemText primary={<Skeleton variant="text" />} />
          )}
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {story ? (
              <Typography variant="caption" color="secondary">
                {`#${story.index}`}
              </Typography>
            ) : (
              <Typography variant="caption">
                <Skeleton variant="text" width={40} />
              </Typography>
            )}
            {story ? (
              <Typography variant="caption" color="secondary">
                {story.sellPrice > 0
                  ? `${formatEther(story.sellPrice)} ETH`
                  : t("notListed")}
              </Typography>
            ) : (
              <Typography variant="caption">
                <Skeleton variant="text" width={60} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
