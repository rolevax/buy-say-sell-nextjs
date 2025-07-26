import { HourglassTop } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";

import { WriteContractParameters } from "@wagmi/core";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function CommentInput(props: {
  submitButtonText: string;
  price: bigint;
  onPriceChanged?: (p: bigint) => void;
  content: string;
  onContentChanged?: (s: string) => void;
  writeValues: WriteContractParameters;
}) {
  const queryClient = useQueryClient();
  const {
    data: hash,
    error,
    isPending,
    writeContract,
    reset,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    if (hash && isConfirmed) {
      queryClient.invalidateQueries();
      reset();
      props.onContentChanged?.("");
    }
  }, [hash, isConfirmed]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract(props.writeValues);
  }

  return (
    <Box>
      <form onSubmit={submit}>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          fullWidth
          rows={2}
          value={props.content}
          onChange={(e) => props.onContentChanged?.(e.target.value)}
          disabled={!props.onContentChanged || isPending || isConfirming}
        />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="start"
        >
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={props.price}
              onChange={(e) => {
                let s = e.target.value;
                props.onPriceChanged?.(BigInt(s));
              }}
              disabled={!props.onPriceChanged || isPending || isConfirming}
            />
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            disabled={isPending || isConfirming}
          >
            {props.submitButtonText}
          </Button>
        </Grid>
      </form>
      {hash && isConfirming && (
        <Alert severity="success" icon={<HourglassTop />} variant="outlined">
          Confirming transaction: {hash}
        </Alert>
      )}
      {error && (
        <Alert severity="error" variant="outlined">
          {error.message || error.message}
        </Alert>
      )}
    </Box>
  );
}
