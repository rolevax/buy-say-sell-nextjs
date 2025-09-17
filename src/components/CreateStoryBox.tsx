"use client";

import { contractAbi } from "@/contract_abi";
import { defaultPrice } from "@/contracts";
import { useState } from "react";
import CommentInput from "./CommentInput";

export default function CreateStoryBox({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(defaultPrice);
  const [isListing, setListing] = useState(true);

  return (
    <CommentInput
      price={price}
      onPriceChanged={setPrice}
      isListing={isListing}
      onListingChanged={setListing}
      wasListing={"new"}
      content={content}
      onContentChanged={setContent}
      canSubmit={!!content.trim() && (!isListing || price > 0n)}
      writeValues={{
        address: contractAddress,
        abi: contractAbi,
        functionName: "create",
        args: [content, isListing ? price : 0n],
      }}
    />
  );
}
