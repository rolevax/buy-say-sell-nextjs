"use client";

import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import { getContractAddressOf } from "@/contracts";
import { GitHub } from "@mui/icons-material";
import {
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
import { ReactNode, useState } from "react";
import { sepolia } from "wagmi/chains";

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
  const titles = [
    t("about.title"),
    t("contract.title"),
    t("contributers.title"),
  ];
  const contents = [
    <AboutContent />,
    <ContractContent />,
    <ContributerContent />,
  ];

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
      <MyH1>{t("about.title")}</MyH1>
      <MyH2>{t("about.what.title")}</MyH2>
      <MyBody>{t("about.what.p1")}</MyBody>
      <MyH2>{t("about.motivation.title")}</MyH2>
      <MyBody>
        {t("about.motivation.p1")}
        <MyBr />
        The story can be constructive or debative. As people want to sell the
        story, they stop saying trash and think hard on saying something
        valueable. By this we keep idiots away from this platform.
      </MyBody>
      <MyH2>Technical Overview</MyH2>
      <MyBody>
        Buy Say Sell is a decenteralized application based on Ethereum. The
        service is purely on-chain an there is no centeralized server. The
        frontend webpage is open-sourced and anyone can deploy it.
        <MyBr />
        The stories implements the ERC-721 standard. You can also trade the
        stories outside this platform, like wallets and standard NFT markets.
      </MyBody>
      <MyH2>Pricing</MyH2>
      <MyBody>
        Currently Buy Say Sell is gas-only. This application is developed mostly
        for experimental purpose.
        <MyBr />
        If you don't want to spend any real money for gas, there is also testnet
        contract deployed. Just switch network to Sepolia and get some ETH from
        faucets.
      </MyBody>
    </Stack>
  );
}

function ContractContent() {
  const t = useTranslations("Docs");
  const sepoliaAddress = getContractAddressOf(sepolia.id);

  return (
    <Stack direction="column">
      <MyH1>{t("contract.title")}</MyH1>
      <MyBody>
        Buy Say Sell consists of only two parts: the contract and the web page.
        Their source can be checked at:
        <ul>
          <li>
            <Link href={""} target="_blank" rel="noopener">
              Contract
            </Link>
          </li>
          <li>
            <Link href={""} target="_blank" rel="noopener">
              Web Page
            </Link>
          </li>
        </ul>
      </MyBody>
      <MyBody>
        The contract addresses for each networks are:
        <ul>
          <li>
            Sepolia:{" "}
            <Link
              href={`https://sepolia.etherscan.io/address/${sepoliaAddress}`}
              target="_blank"
              rel="noopener"
            >
              {sepoliaAddress}
            </Link>
          </li>
        </ul>
      </MyBody>
    </Stack>
  );
}

function ContributerContent() {
  const t = useTranslations("Docs");

  return (
    <Stack direction="column">
      <MyH1>{t("contributers.title")}</MyH1>
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

function MyH1({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h4" sx={{ mb: 4 }}>
      {children}
    </Typography>
  );
}

function MyH2({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h5" sx={{ mb: 2 }}>
      {children}
    </Typography>
  );
}

function MyBody({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body1" sx={{ mb: 4 }} component="div">
      {children}
    </Typography>
  );
}

function MyBr() {
  return <Box sx={{ mb: 1 }} />;
}
