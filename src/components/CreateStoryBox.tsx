"use client";

import { useState } from "react";
import CommentInput from "./CommentInput";
import { contractAbi, getContractAddress } from "@/contracts";
import { useWriteContract } from "wagmi";

export default function CreateStoryBox() {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(BigInt(1000000000));
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit() {
    writeContract({
      address: getContractAddress(),
      abi: contractAbi,
      functionName: "createStory",
      args: [content, price],
    });
  }

  return (
    <CommentInput
      submitButtonText="Create"
      price={price}
      onPriceChanged={setPrice}
      content={content}
      onContentChanged={setContent}
      onSubmit={submit}
      isPending={isPending}
      hash={hash}
      error={error}
    />
  );
}
