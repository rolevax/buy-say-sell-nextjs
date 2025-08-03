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

import { useQueryClient } from "@tanstack/react-query";
import { WriteContractParameters } from "@wagmi/core";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export default function CommentInput(props: {
  submitButtonText: string;
  price: bigint;
  onPriceChanged?: (p: bigint) => void;
  content: string;
  onContentChanged?: (s: string) => void;
  writeValues: WriteContractParameters;
}) {
  const t = useTranslations("CommentInput");
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
          label={t("comment")}
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
            <InputLabel htmlFor="standard-adornment-amount">
              {t("price")}
            </InputLabel>
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
          {t("confirmTx", { hash: hash })}
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
