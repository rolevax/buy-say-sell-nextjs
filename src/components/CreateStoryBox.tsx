"use client";

import { contractAbi } from "@/contract_abi";
import { defaultPrice, getContractAddress } from "@/contracts";
import { useState } from "react";
import CommentInput from "./CommentInput";

export default function CreateStoryBox() {
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
        address: getContractAddress(),
        abi: contractAbi,
        functionName: "create",
        args: [content, isListing ? price : 0n],
      }}
    />
  );
}
