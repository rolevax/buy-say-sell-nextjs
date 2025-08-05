"use client";

import { contractAbi, getContractAddress } from "@/contracts";
import { useState } from "react";
import CommentInput from "./CommentInput";

export default function CreateStoryBox() {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(1000000000n);
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
      canSubmit={!!content.trim()}
      writeValues={{
        address: getContractAddress(),
        abi: contractAbi,
        functionName: "createStory",
        args: [content, isListing ? price : 0n],
      }}
    />
  );
}
