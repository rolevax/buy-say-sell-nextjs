"use client";

import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import { GitHub } from "@mui/icons-material";
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function About() {
  const t = useTranslations("Docs");

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title={t("title")} />
        <DocsBody />
        <Copyright />
      </Box>
    </Container>
  );
}

function DocsBody() {
  const t = useTranslations("Docs");

  const [index, setIndex] = useState(0);
  const titles = [t("about.title"), t("contributers.title")];
  const contents = [<AboutContent />, <ContributerContent />];

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Box sx={{ minWidth: "240px" }}>
        <List>
          {titles.map((text, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton selected={i == index} onClick={() => setIndex(i)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>{contents[index]}</Box>
    </Stack>
  );
}

function AboutContent() {
  const t = useTranslations("Docs");

  return (
    <Stack direction="column">
      <Typography variant="h4">{t("about.title")}</Typography>
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        {t("about.what.title")}
      </Typography>
      <Typography variant="body1">{t("about.what.p1")}</Typography>
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Motivation
      </Typography>
      <Typography variant="body1">
        People bla bla bla too much on Internet. Their words are trash. So build
        a place where people always say something interesting. By interesting we
        mean words that ignite people to comments to it, and those comments
        contribute more value to the story. People really want to express their
        idea even it requires money.
        <br />
        The story can be constructive or debative. As people want to sell the
        story, they stop saying trash and think hard on saying something
        valueable. By this we keep idiots away from this platform.
      </Typography>
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Technical Overview
      </Typography>
      <Typography variant="body1">
        Buy Say Sell is a decenteralized application based on Ethereum. The
        service is purely on-chain an there is no centeralized server. The
        frontend webpage is open-sourced and anyone can deploy it.
        <br />
        The stories implements the ERC-721 standard. You can also trade the
        stories outside this platform, like wallets and standard NFT markets.
      </Typography>
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Pricing
      </Typography>
      <Typography variant="body1">
        Currently Buy Say Sell is gas-only. This application is developed mostly
        for experimental purpose.
        <br />
        If you don't want to spend any real money for gas, there is also testnet
        contract deployed. Just switch network to Sepolia and get some ETH from
        faucets.
      </Typography>
    </Stack>
  );
}

function ContributerContent() {
  const t = useTranslations("Docs");

  return (
    <Stack direction="column">
      <Typography variant="h4">{t("contributers.title")}</Typography>
      <ul>
        <li>
          <Link href="https://github.com/rolevax">
            <Stack direction="row" spacing={1}>
              <GitHub />
              <Typography>rolevax</Typography>
            </Stack>
          </Link>
        </li>
      </ul>
    </Stack>
  );
}
