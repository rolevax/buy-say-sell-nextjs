import {
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
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit();
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
          disabled={!props.onContentChanged}
        />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="start"
        >
          <FormControl sx={{ m: 1 }} variant="standard">
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
              disabled={!props.onPriceChanged}
            />
          </FormControl>
          <Button variant="contained" type="submit" disabled={props.isPending}>
            {props.submitButtonText}
          </Button>
        </Grid>
      </form>
      {props.hash && <div>Transaction Hash: {props.hash}</div>}
      {props.error && (
        <div>Error: {props.error.message || props.error.message}</div>
      )}
    </Box>
  );
}
