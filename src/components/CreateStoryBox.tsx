"use client";

import { useState } from "react";
import CommentInput from "./CommentInput";
import { wagmiContractConfig } from "@/contracts";
import { useWriteContract } from "wagmi";
import { Box } from "@mui/material";

export default function CreateStoryBox() {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(BigInt(1000000000));
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit() {
    writeContract({
      ...wagmiContractConfig,
      functionName: "createStory",
      args: [content, price],
    });
  }

  return (
    <Box>
      <CommentInput
        submitButtonText="Create"
        price={price}
        onPriceChanged={setPrice}
        content={content}
        onContentChanged={setContent}
        onSubmit={submit}
        isPending={isPending}
      />
      {hash && <div>Transaction Hash: {hash}</div>}
      {error && <div>Error: {error.message || error.message}</div>}
    </Box>
  );
}
