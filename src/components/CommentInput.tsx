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

import { WriteContractErrorType } from "@wagmi/core";
import { useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentInput(props: {
  submitButtonText: string;
  price: bigint;
  onPriceChanged?: (p: bigint) => void;
  content: string;
  onContentChanged?: (s: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  hash: `0x${string}` | undefined;
  error: WriteContractErrorType | null;
}) {
  const queryClient = useQueryClient();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: props.hash,
    });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit();
  }

  if (props.hash && isConfirmed) {
    queryClient.invalidateQueries();
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
          disabled={!props.onContentChanged || props.isPending || isConfirming}
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
              disabled={
                !props.onPriceChanged || props.isPending || isConfirming
              }
            />
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            disabled={props.isPending || isConfirming}
          >
            {props.submitButtonText}
          </Button>
        </Grid>
      </form>
      {props.hash && isConfirming && (
        <Alert severity="success" icon={<HourglassTop />} variant="outlined">
          Confirming transaction: {props.hash}
        </Alert>
      )}
      {props.error && (
        <Alert severity="error" variant="outlined">
          {props.error.message || props.error.message}
        </Alert>
      )}
    </Box>
  );
}
