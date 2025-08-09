"use client";

import CommentInput from "@/components/CommentInput";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import PleaseConnect from "@/components/PleaseConnect";
import { contractAbi, getContractAddress } from "@/contracts";
import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
      let text;
      if (comment.content == "buy") {
        text = t("buyLog", {
          who: shortAddr(comment.owner),
          price: formatEther(comment.price),
        });
      } else if (comment.price == 0n) {
        text = t("unlistLog");
      } else {
        text = t("priceLog", { price: formatEther(comment.price) });
      }
      return (
        <TableRow
          key={i}
          sx={{
            display: "flex",
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell sx={{ flexGrow: 1 }}>
            <Typography color="secondary">{text}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow
        key={i}
        sx={{
          display: "flex",
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell sx={{ width: "auto" }} component="th" scope="row">
          {shortAddr(comment.owner)}
        </TableCell>
        <TableCell sx={{ flexGrow: 1 }}>
          {comment.content}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {comment.timestamp}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatEther(comment.price)} ETH
          </Typography>
        </TableCell>
      </TableRow>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
