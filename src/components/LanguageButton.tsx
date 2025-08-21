"use client";

import { LocaleCode, locales } from "@/i18n/config";
import { setUserLocale } from "@/i18n/cookies";
import { Language } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";

export default function LanguageButton() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as LocaleCode;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (value: string) => {
    if (value != locale) {
      startTransition(async () => {
        setUserLocale(value as LocaleCode);
      });
    }

    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Language">
        <IconButton
          color="inherit"
          onClick={handleOpenUserMenu}
          loading={isPending}
        >
          <Language />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {locales.map((setting) => (
          <MenuItem
            key={setting}
            selected={setting == locale}
            onClick={() => handleClick(setting)}
          >
            <Typography sx={{ textAlign: "center" }}>
              {new Intl.DisplayNames([setting], { type: "language" }).of(
                setting
              )}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
