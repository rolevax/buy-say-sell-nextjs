import CommentInput from "@/components/CommentInput";
import PleaseConnect from "@/components/PleaseConnect";
import { contractAbi, getContractAddress } from "@/contracts";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ReadContractReturnType } from "viem";
import { useAccount } from "wagmi";

export default function StoryInput({
  story,
}: {
  story: ReadContractReturnType<typeof contractAbi, "getStory", [0n]>;
}) {
  const { address, isConnected } = useAccount();
  if (!isConnected) {
    return <PleaseConnect />;
  }

  if (story.owner == address) {
    return <SayInput index={story.index} initPrice={story.sellPrice} />;
  }

  return <BuyInput index={story.index} sellPrice={story.sellPrice} />;
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
