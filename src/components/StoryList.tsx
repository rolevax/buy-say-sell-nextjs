"use client";

import { contractAbi, getContractAddress } from "@/contracts";
import { Inbox } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { ReadContractReturnType } from "viem";
import { useReadContract, UseReadContractReturnType } from "wagmi";

export default function StoryList() {
  const {
    data: stories,
    error,
    isPending,
  } = useReadContract({
    address: getContractAddress(),
    abi: contractAbi,
    functionName: "getStories",
    args: [],
  });

  if (isPending) {
    const items = Array.from(Array(10).keys()).map((i) => (
      <StoryListItem key={i} />
    ));
    return <List>{items}</List>;
  }

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let storyItems = (stories || []).map((story) => (
    <StoryListItem key={story.index} story={story} />
  ));

  return <List>{storyItems}</List>;
}

function StoryListItem({
  story,
}: {
  story?: ReadContractReturnType<typeof contractAbi, "getStories", []>[0];
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
