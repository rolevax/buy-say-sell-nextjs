"use client";

import {
  AddComment,
  Discount,
  ExpandLess,
  ExpandMore,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";
import { useTranslations } from "use-intl";

export default function BriefIntro() {
  const t = useTranslations("BriefIntro");
  const [open, setOpen] = useState([false, false, false]);

  const items = [];
  const titles = [t("buyTitle"), t("sayTitle"), t("sellTitle")];
  const contents = [t("buyLong"), t("sayLong"), t("sellLong")];
  const icons = [<ShoppingCart />, <AddComment />, <Discount />];

  for (let i = 0; i < titles.length; i++) {
    items.push(
      <ListItemButton
        key={i * 2}
        onClick={() => setOpen(open.map((o, j) => (i == j ? !o : o)))}
      >
        <ListItemIcon>{icons[i]}</ListItemIcon>
        <ListItemText primary={titles[i]} />
        {open[i] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    );
    items.push(
      <Collapse key={i * 2 + 1} in={open[i]} timeout="auto" unmountOnExit>
        <ListItemText sx={{ pl: 4, pr: 4 }} secondary={contents[i]} />
      </Collapse>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <List
        sx={{ width: "50%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {t("begin")}
          </ListSubheader>
        }
      >
        {items}
      </List>
    </div>
  );
}
