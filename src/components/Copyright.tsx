import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Box flexDirection="column" sx={{ m: 2 }}>
      <Box minHeight={200} />
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "text.secondary",
        }}
      >
        {"Copyright © rolevax "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
