"use client";

import CommentInput from "@/components/CommentInput";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import PleaseConnect from "@/components/PleaseConnect";
import { contractAbi, getContractAddress } from "@/contracts";
import { WashOutlined } from "@mui/icons-material";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { initScriptLoader } from "next/script";
import { useState } from "react";
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
          price: comment.price.toString(),
        });
      } else {
        text = t("priceLog", { price: comment.price.toString() });
      }
      return (
        <ListItem key={i}>
          <Typography color="secondary">{text}</Typography>
        </ListItem>
      );
    }

    return (
      <ListItem key={i}>
        <ListItemAvatar>N</ListItemAvatar>
        <ListItemText
          primary={comment.content}
          secondary={`${shortAddr(comment.owner)} ${comment.price} wei`}
        />
      </ListItem>
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
      <List>{storyEvents}</List>
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

  return (
    <CommentInput
      submitButtonText={t("buy")}
      price={props.sellPrice}
      isListing={props.sellPrice > 0}
      wasListing={props.sellPrice > 0 ? "list" : "unlist"}
      content={t("buyToComment")}
      canSubmit={true}
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
        (isListing && price != props.initPrice && price > 0) ||
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
