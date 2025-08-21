import { Article, Chat, Lyrics } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  SvgIcon,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";
import LanguageButton from "./LanguageButton";
import ModeSwitch from "./ModeSwitch";
import BuySaySellIcon from "./AppIcon";

export default function CommonAppBar(props: { title: string }) {
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
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
