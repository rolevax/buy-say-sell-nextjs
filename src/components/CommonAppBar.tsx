import { Lyrics } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

export default function CommonAppBar(props: { title: string }) {
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
          <Lyrics />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Button component={NextLink} href="/about">
          About
        </Button>
        <ModeSwitch />
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}
