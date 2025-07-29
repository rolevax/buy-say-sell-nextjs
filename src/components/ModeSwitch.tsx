"use client";

import { DarkMode } from "@mui/icons-material";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

export default function ModeSwitch() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  function toggle() {
    if (mode == "system") {
      setMode(prefersDarkMode ? "light" : "dark");
    } else if (mode == "light") {
      setMode("dark");
    } else if (mode == "dark") {
      setMode("light");
    }
  }

  return (
    <Tooltip title="Toggle dark mode">
      <IconButton onClick={toggle} color="inherit">
        <DarkMode />
      </IconButton>
    </Tooltip>
  );
}
