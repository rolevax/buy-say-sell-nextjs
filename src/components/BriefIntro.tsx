"use client";

import {
  AddComment,
  ExpandLess,
  ExpandMore,
  Sell,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function BriefIntro() {
  const [open, setOpen] = useState([false, false, false]);

  const items = [];
  const titles = ["Buy a post", "Say something", "And sell it!"];
  const contents = [
    "Each post has one unique owner. Buy to own the post. Of course you can also create new posts without buying.",
    "As the owner, you are the only one who can comment to the post. Say something.",
    "List your post to the market. Who will buy your post? Why? How much? These are all up to you!",
  ];
  const icons = [<ShoppingCart />, <AddComment />, <Sell />];

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
            Buy Say Sell is a social community where you can:
          </ListSubheader>
        }
      >
        {items}
      </List>
    </div>
  );
}
