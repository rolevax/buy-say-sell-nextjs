"use client";

import { wagmiContractConfig } from "@/contracts";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useWriteContract } from "wagmi";

export default function CommentInput() {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract({
      ...wagmiContractConfig,
      functionName: "createStory",
      args: [content],
    });
  }

  return (
    <form onSubmit={submit}>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        fullWidth
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" type="submit" disabled={isPending}>
        Create
      </Button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {error && <div>Error: {error.message || error.message}</div>}
    </form>
  );
}
