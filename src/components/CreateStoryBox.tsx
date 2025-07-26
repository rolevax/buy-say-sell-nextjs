"use client";

import { useState } from "react";
import CommentInput from "./CommentInput";
import { contractAbi, getContractAddress } from "@/contracts";
import { useWriteContract } from "wagmi";

export default function CreateStoryBox() {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(BigInt(1000000000));

  return (
    <CommentInput
      submitButtonText="Create"
      price={price}
      onPriceChanged={setPrice}
      content={content}
      onContentChanged={setContent}
      writeValues={{
        address: getContractAddress(),
        abi: contractAbi,
        functionName: "createStory",
        args: [content, price],
      }}
    />
  );
}
