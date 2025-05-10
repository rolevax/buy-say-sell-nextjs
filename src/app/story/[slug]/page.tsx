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
import { useAccount, useReadContract } from "wagmi";
import { wagmiContractConfig } from "@/contracts";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
      input = <SellInput />;
    } else {
      input = <SayInput />;
    }
  } else if (story.sellPrice > 0) {
    input = <BuyInput />;
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

function BuyInput() {
  return (
    <Box>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        fullWidth
        rows={2}
      />
      <Button variant="contained">Buy</Button>
    </Box>
  );
}

function SayInput() {
  return (
    <Box>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        fullWidth
        rows={2}
      />
      <Button variant="contained">Say</Button>
    </Box>
  );
}

function SellInput() {
  return (
    <Box>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        fullWidth
        rows={2}
      />
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <Button variant="contained">Sell</Button>
    </Box>
  );
}
