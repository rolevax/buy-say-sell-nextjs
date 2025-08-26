"use client";

import { contractAbi } from "@/contract_abi";
import { getContractAddress } from "@/contracts";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import { pages } from "next/dist/build/templates/app-page";
import { ReactNode, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { ReadContractReturnType } from "viem";
import { useReadContract } from "wagmi";

export default function StoryList() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, error, isPending } = useReadContract({
    address: getContractAddress(),
    abi: contractAbi,
    functionName: "getStories",
    args: [BigInt((page - 1) * pageSize), BigInt(pageSize)],
  });

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let items: ReactNode[];
  let count = 1;
  if (isPending) {
    items = Array.from(Array(pageSize).keys()).map((i) => (
      <StoryListItem key={i} />
    ));
  } else {
    const [stories, total] = data;
    items = stories.map((story) => (
      <StoryListItem key={story.index} story={story} />
    ));
    console.log("total size " + total);
    count = Math.ceil(Number(total) / pageSize);
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

function StoryListItem({
  story,
}: {
  story?: ReadContractReturnType<typeof contractAbi, "getStory", [0n]>;
}) {
  return (
    <ListItem disablePadding>
      {story ? (
        <ListItemButton href={`/story/${story.index}`}>
          <ListItemIcon>
            <MetaMaskAvatar address={story.owner} />
          </ListItemIcon>
          <ListItemText primary={story.comments[0].content} />
        </ListItemButton>
      ) : (
        <ListItemButton disabled>
          <ListItemIcon>
            <Skeleton variant="circular" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={<Skeleton variant="text" />} />
        </ListItemButton>
      )}
    </ListItem>
  );
}
