import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Copyright() {
  return (
    <Box flexDirection="column">
      <Box minHeight={200} />
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "text.secondary",
        }}
      >
        {"Copyright © "}
        <MuiLink color="inherit" href="https://mui.com/">
          Your Website
        </MuiLink>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
