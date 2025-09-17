import CommentInput from "@/components/CommentInput";
import PleaseConnect from "@/components/PleaseConnect";
import { contractAbi } from "@/contract_abi";
import { defaultPrice, getFee, StoryType } from "@/contracts";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function StoryInput({
  story,
  contractAddress,
}: {
  story?: StoryType;
  contractAddress: `0x${string}`;
}) {
  const { address, isConnected } = useAccount();
  if (!isConnected) {
    return <PleaseConnect />;
  }

  if (!story) {
    return <Skeleton variant="rectangular" height={200} />;
  }

  if (story.owner == address) {
    return (
      <SayInput
        index={story.index}
        initPrice={story.sellPrice}
        contractAddress={contractAddress}
      />
    );
  }

  return (
    <BuyInput
      index={story.index}
      sellPrice={story.sellPrice}
      contractAddress={contractAddress}
    />
  );
}

function BuyInput({
  index,
  sellPrice,
  contractAddress,
}: {
  index: bigint;
  sellPrice: bigint;
  contractAddress: `0x${string}`;
}) {
  const t = useTranslations("Story");
  const isSelling = sellPrice > 0;

  return (
    <CommentInput
      submitButtonText={t("buy")}
      price={sellPrice}
      isListing={sellPrice > 0}
      wasListing={sellPrice > 0 ? "list" : "unlist"}
      content={t("buyToComment")}
      canSubmit={isSelling}
      writeValues={{
        address: contractAddress,
        abi: contractAbi,
        functionName: "buy",
        args: [index],
        value: sellPrice + getFee(sellPrice),
      }}
    />
  );
}

function SayInput({
  index,
  initPrice,
  contractAddress,
}: {
  index: bigint;
  initPrice: bigint;
  contractAddress: `0x${string}`;
}) {
  const t = useTranslations("Story");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(
    initPrice == 0n ? defaultPrice : initPrice
  );
  const wasListing = initPrice > 0;
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
        (isListing && price != initPrice && price > 0n) ||
        !!content
      }
      writeValues={
        content.trim() == ""
          ? {
              address: contractAddress,
              abi: contractAbi,
              functionName: "changePrice",
              args: [index, isListing ? price : 0n],
            }
          : {
              address: contractAddress,
              abi: contractAbi,
              functionName: "addComment",
              args: [index, content, isListing ? price : 0n],
            }
      }
    />
  );
}
