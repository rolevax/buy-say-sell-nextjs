"use client";

import { contractAbi, getContractAddress } from "@/contracts";
import { Inbox } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useReadContract } from "wagmi";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let storyItems = (stories || []).map((story) => (
    <ListItem disablePadding key={story.index}>
      <ListItemButton href={"/story/" + story.index}>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary={story.comments[0].content} />
      </ListItemButton>
    </ListItem>
  ));

  return <List>{storyItems}</List>;
}
