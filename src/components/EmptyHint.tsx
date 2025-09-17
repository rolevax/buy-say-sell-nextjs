import { Stack, Typography } from "@mui/material";

export default function EmptyHint({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Stack alignItems="center" spacing={1} sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" color="secondary">
        {title}
      </Typography>
      <Typography color="secondary">{content}</Typography>
    </Stack>
  );
}
