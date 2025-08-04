import { HourglassTop } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { useQueryClient } from "@tanstack/react-query";
import { WriteContractParameters } from "@wagmi/core";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
  const wasListing = !!props.price;
  const [isListing, setListing] = useState(wasListing);
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
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Interactions
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label={t("comment")}
          multiline
          fullWidth
          rows={2}
          value={props.content}
          onChange={(e) => props.onContentChanged?.(e.target.value)}
          disabled={!props.onContentChanged || isPending || isConfirming}
          sx={{ mb: 3 }}
        />
        <FormLabel id="radio-buttons-group-label">
          Marketing and Price
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={isListing}
          onChange={(event) => {
            setListing(event.target.value == "true");
          }}
        >
          <FormControlLabel
            value={false}
            control={<Radio disabled={!props.onPriceChanged} />}
            label="Unlist"
          />
          <FormControlLabel
            value={true}
            control={<Radio disabled={!props.onPriceChanged} />}
            label="List"
          />
          <FormControl>
            <Input
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={props.price}
              onChange={(e) => {
                let s = e.target.value;
                props.onPriceChanged?.(BigInt(s));
              }}
              disabled={
                !props.onPriceChanged || !isListing || isPending || isConfirming
              }
            />
          </FormControl>
        </RadioGroup>
        <Button
          variant="contained"
          type="submit"
          disabled={isPending || isConfirming}
          sx={{ mt: 2 }}
        >
          {props.submitButtonText}
        </Button>
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
