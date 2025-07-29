import { Info, Lyrics } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LanguageButton from "./LanguageButton";

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
        <Tooltip title="About">
          <IconButton color="inherit" href="/about">
            <Info />
          </IconButton>
        </Tooltip>
        <ModeSwitch />
        <LanguageButton />
        <div style={{ width: 16 }} />
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}
