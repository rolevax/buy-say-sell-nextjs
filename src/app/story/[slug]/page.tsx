"use client";

import CommentInput from "@/components/CommentInput";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import PleaseConnect from "@/components/PleaseConnect";
import { contractAbi, getContractAddress } from "@/contracts";
import {
  Discount,
  RemoveShoppingCart,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormatter, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Key, ReactNode, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function Story() {
  const t = useTranslations("Story");
  const pathname = usePathname();
  let storyID = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title={`${t("story")} #${storyID}`} />
        <StoryBody storyID={storyID} />
      </Box>
    </Container>
  );
}

function StoryBody(props: { storyID: string }) {
  const t = useTranslations("Story");
  const {
    data: story,
    error,
    isPending,
  } = useReadContract({
    address: getContractAddress(),
    abi: contractAbi,
    functionName: "getStory",
    args: [BigInt(+props.storyID)],
  });
  const { address } = useAccount();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.shortMessage || error.message}</div>;
  }

  let storyEvents = story.comments.map((comment, i) => {
    if (comment.isLog) {
      let child: ReactNode;
      if (comment.content == "buy") {
        child = <LogRow icon={<ShoppingCart />} text={t("buyLog")} />;
      } else if (comment.price == 0n) {
        child = (
          <LogRow icon={<RemoveShoppingCart key={i} />} text={t("unlistLog")} />
        );
      } else {
        child = <LogRow icon={<Discount key={i} />} text={t("priceLog")} />;
      }

      return (
        <EventRow
          key={i}
          address={comment.owner}
          timestamp={comment.timestamp}
          price={comment.price}
        >
          <Stack direction="row" spacing={1}>
            {child}
          </Stack>
        </EventRow>
      );
    }

    return (
      <EventRow
        key={i}
        address={comment.owner}
        timestamp={comment.timestamp}
        price={comment.price}
      >
        <Typography variant="body1" color="textPrimary">
          {comment.content}
        </Typography>
      </EventRow>
    );
  });

  let input;
  if (!address) {
    input = <PleaseConnect />;
  } else if (story.owner == address) {
    input = <SayInput index={story.index} initPrice={story.sellPrice} />;
  } else {
    input = <BuyInput index={story.index} sellPrice={story.sellPrice} />;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("comments")}
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>{storyEvents}</TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("status")}
      </Typography>
      <TableContainer sx={{ display: "inline-block" }} component={Paper}>
        <Table style={{ width: "auto" }}>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {t("owner")}
              </TableCell>
              <TableCell>{story.owner}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {t("listing")}
              </TableCell>
              <TableCell>
                {story.sellPrice > 0
                  ? t("sellingAt", { price: formatEther(story.sellPrice) })
                  : t("notListed")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {t("interactions")}
      </Typography>
      {input}
      <Copyright />
    </Box>
  );
}

function LogRow(props: { icon: ReactNode; text: string }) {
  return (
    <Stack direction="row" spacing={1}>
      {props.icon}
      <Typography color="secondary">{props.text}</Typography>
    </Stack>
  );
}

function EventRow(props: {
  address: `0x${string}`;
  timestamp: bigint;
  price: bigint;
  children: ReactNode;
}) {
  const format = useFormatter();

  return (
    <TableRow
      sx={{
        "td, th": { border: 0 },
      }}
    >
      <TableCell
        sx={{ width: "1px", alignContent: "start" }}
        component="th"
        scope="row"
      >
        <MetaMaskAvatar address={props.address} size={48} />
      </TableCell>
      <TableCell>
        <Card sx={{ pt: 1, pb: 1, pl: 2, pr: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ mb: 1 }}
          >
            <Tooltip title={props.address} arrow>
              <Typography variant="caption">
                {shortAddr(props.address)}
              </Typography>
            </Tooltip>
            <Typography variant="caption" color="secondary">
              {formatEther(props.price)} ETH
            </Typography>
            <TimeText timestamp={props.timestamp} />
          </Stack>
          {props.children}
        </Card>
      </TableCell>
    </TableRow>
  );
}

function TimeText(props: { timestamp: bigint }) {
  const format = useFormatter();

  return (
    <Typography variant="caption" color="secondary">
      {format.dateTime(new Date(Number(props.timestamp) * 1000), {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </Typography>
  );
}

function BuyInput(props: { index: bigint; sellPrice: bigint }) {
  const t = useTranslations("Story");
  const isSelling = props.sellPrice > 0;

  return (
    <CommentInput
      submitButtonText={t("buy")}
      price={props.sellPrice}
      isListing={props.sellPrice > 0}
      wasListing={props.sellPrice > 0 ? "list" : "unlist"}
      content={t("buyToComment")}
      canSubmit={isSelling}
      writeValues={{
        address: getContractAddress(),
        abi: contractAbi,
        functionName: "agreeSellPrice",
        args: [props.index],
        value: props.sellPrice,
      }}
    />
  );
}

function SayInput(props: { index: bigint; initPrice: bigint }) {
  const t = useTranslations("Story");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(
    props.initPrice == 0n ? 1000000000n : props.initPrice
  );
  const wasListing = props.initPrice > 0;
  const [isListing, setListing] = useState(wasListing);

  return (
    <CommentInput
      price={price}
      onPriceChanged={setPrice}
      isListing={isListing}
      onListingChanged={setListing}
      wasListing={wasListing ? "list" : "unlist"}
      content={content}
      onContentChanged={setContent}
      canSubmit={
        (!isListing && wasListing) ||
        (isListing && price != props.initPrice && price > 0n) ||
        !!content
      }
      writeValues={
        content.trim() == ""
          ? {
              address: getContractAddress(),
              abi: contractAbi,
              functionName: "changeSellPrice",
              args: [props.index, isListing ? price : 0n],
            }
          : {
              address: getContractAddress(),
              abi: contractAbi,
              functionName: "addComment",
              args: [props.index, content, isListing ? price : 0n],
            }
      }
    />
  );
}

function shortAddr(address: string) {
  return (
    address.substring(0, 4) + "..." + address.substring(address.length - 4)
  );
}
