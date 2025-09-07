"use client";

import {
  AddComment,
  ArrowForward,
  Discount,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslations } from "use-intl";

export default function BriefIntro() {
  const t = useTranslations("BriefIntro");

  const items = [];
  const titles = [t("buyTitle"), t("sayTitle"), t("sellTitle")];
  const contents = [t("buyLong"), t("sayLong"), t("sellLong")];
  const icons = [<ShoppingCart />, <AddComment />, <Discount />];

  for (let i = 0; i < titles.length; i++) {
    items.push(
      <Card key={i} sx={{ width: 180 }}>
        <CardContent>
          <ListItem sx={{ p: 0, mb: 1 }}>
            {icons[i]}
            <ListItemText sx={{ ml: 2 }} primary={titles[i]} />
          </ListItem>
          <Typography variant="body2">{contents[i]}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      padding={4}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="stretch"
        divider={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowForward />
          </Box>
        }
      >
        {items}
      </Stack>
      <Button href="/docs">{t("learnMore")}</Button>
    </Stack>
  );
}
