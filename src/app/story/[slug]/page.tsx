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
    data: stories,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getStories",
    args: [],
  });
  const { address } = useAccount();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let story = stories[+props.storyID];
  let storyEvents = story.comments.map((comment, i) => (
    <ListItem key={i}>
      <ListItemAvatar>N</ListItemAvatar>
      <ListItemText primary={comment.content} secondary={comment.owner} />
    </ListItem>
  ));

  let input;
  if (story.owner == address) {
    if (story.comments[story.comments.length - 1].owner == address) {
      input = <SellInput index={story.index} sellPrice={story.sellPrice} />;
    } else {
      input = <SayInput index={story.index} />;
    }
  } else if (story.sellPrice > 0) {
    input = <BuyInput index={story.index} sellPrice={story.sellPrice} />;
  } else {
    input = <p>Waiting for sell</p>;
  }

  return (
    <Box>
      <List>{storyEvents}</List>
      {input}
      <Copyright />
    </Box>
  );
}

function BuyInput(props: { index: bigint, sellPrice: bigint }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract({
      ...wagmiContractConfig,
      functionName: "agreeSellPrice",
      args: [props.index],
      value: props.sellPrice,
    });
  }

  return (
    <form onSubmit={submit}>
      <Box>
        <Typography>Price: {props.sellPrice}</Typography>
        <Button variant="contained" type="submit" disabled={isPending}>Buy</Button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {error && <div>Error: {error.message}</div>}
      </Box>
    </form>
  );
}

function SayInput(props: { index: bigint }) {
  const [content, setContent] = useState('');
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract({
      ...wagmiContractConfig,
      functionName: "addComment",
      args: [props.index, content],
    });
  }

  return (
    <form onSubmit={submit}>
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          fullWidth
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" type="submit" disabled={isPending}>Say</Button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {error && <div>Error: {error.message || error.message}</div>}
      </Box>
    </form>
  );
}

function SellInput(props: { index: bigint, sellPrice: bigint }) {
  const [price, setPrice] = useState('114514');
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract({
      ...wagmiContractConfig,
      functionName: "offerSellPrice",
      args: [props.index, BigInt(price)],
    });
  }

  return (
    <form onSubmit={submit}>
      <Typography>Price: {props.sellPrice}</Typography>
      <Box>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" type="submit" disabled={isPending}>Sell</Button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {error && <div>Error: {error.message || error.message}</div>}
      </Box>
    </form>
  );
}
