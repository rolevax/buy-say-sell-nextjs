"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { ArrowBack } from "@mui/icons-material";
import Copyright from "@/components/Copyright";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { wagmiContractConfig } from "@/contracts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import CommentInput from "@/components/CommentInput";
import { useQueryClient } from "@tanstack/react-query";

export default function Story() {
  const pathname = usePathname();
  let storyID = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <StoryAppBar storyID={storyID} />
        <StoryBody storyID={storyID} />
      </Box>
    </Container>
  );
}

function StoryAppBar(props: { storyID: string }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          href="/"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Story {props.storyID}
        </Typography>
        <Button component={NextLink} href="/about">
          About
        </Button>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}

function StoryBody(props: { storyID: string }) {
  const {
    data: story,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getStory",
    args: [BigInt(+props.storyID)],
  });
  const { address } = useAccount();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let storyEvents = story.comments.map((comment, i) => {
    if (comment.isLog) {
      let text;
      if (comment.content == "buy") {
        text = `Bought by ${shortAddr(comment.owner)} for ${comment.price} wei`;
      } else {
        text = `Price changed to ${comment.price} wei`;
      }
      return (
        <ListItem key={i}>
          <Typography color="secondary">{text}</Typography>
        </ListItem>
      );
    }

    return (
      <ListItem key={i}>
        <ListItemAvatar>N</ListItemAvatar>
        <ListItemText
          primary={comment.content}
          secondary={`${shortAddr(comment.owner)} ${comment.price} wei`}
        />
      </ListItem>
    );
  });

  let input;
  if (story.owner == address) {
    input = <SayInput index={story.index} />;
  } else {
    input = <BuyInput index={story.index} sellPrice={story.sellPrice} />;
  }

  return (
    <Box>
      <List>{storyEvents}</List>
      {input}
      <Copyright />
    </Box>
  );
}

function BuyInput(props: { index: bigint; sellPrice: bigint }) {
  const queryClient = useQueryClient();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit() {
    writeContract({
      ...wagmiContractConfig,
      functionName: "agreeSellPrice",
      args: [props.index],
      value: props.sellPrice,
    });
  }

  if (hash) {
    queryClient.invalidateQueries();
  }

  return (
    <Box>
      <CommentInput
        submitButtonText={"Buy"}
        price={props.sellPrice}
        content={"Buy to comment"}
        onSubmit={submit}
        isPending={isPending}
      />
      {hash && <div>Transaction Hash: {hash}</div>}
      {error && <div>Error: {error.message}</div>}
    </Box>
  );
}

function SayInput(props: { index: bigint }) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(BigInt(1000000000));
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit() {
    if (content.trim() == "") {
      writeContract({
        ...wagmiContractConfig,
        functionName: "changeSellPrice",
        args: [props.index, price],
      });
    } else {
      writeContract({
        ...wagmiContractConfig,
        functionName: "addComment",
        args: [props.index, content, price],
      });
    }
  }

  if (hash) {
    queryClient.invalidateQueries();
  }

  return (
    <Box>
      <CommentInput
        submitButtonText={"Say & Sell"}
        price={price}
        onPriceChanged={setPrice}
        content={content}
        onContentChanged={setContent}
        onSubmit={submit}
        isPending={isPending}
      />
      {hash && <div>Transaction Hash: {hash}</div>}
      {error && <div>Error: {error.message}</div>}
    </Box>
  );
}

function shortAddr(address: string) {
  return (
    address.substring(0, 4) + "..." + address.substring(address.length - 4)
  );
}
