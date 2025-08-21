import { Article } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import BuySaySellIcon from "./AppIcon";
import LanguageButton from "./LanguageButton";
import ModeSwitch from "./ModeSwitch";

export default function CommonAppBar(props: { title: ReactNode }) {
  const t = useTranslations("AppBar");

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
          <BuySaySellIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {props.title}
          </Typography>
        </Box>
        <Tooltip title={t("docs")}>
          <IconButton color="inherit" href="/docs">
            <Article />
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
