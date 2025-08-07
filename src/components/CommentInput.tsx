import { HelpOutline, HourglassTop } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";

import { useQueryClient } from "@tanstack/react-query";
import { WriteContractParameters } from "@wagmi/core";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { encodeFunctionData, formatEther, formatGwei } from "viem";
import {
  useAccount,
  useEstimateGas,
  useGasPrice,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import EtherInput from "./EtherInput";

export default function CommentInput(props: {
  submitButtonText?: string;
  price: bigint;
  onPriceChanged?: (p: bigint) => void;
  wasListing: "list" | "unlist" | "new";
  isListing: boolean;
  onListingChanged?: (l: boolean) => void;
  content: string;
  onContentChanged?: (s: string) => void;
  canSubmit: boolean;
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
  const { address } = useAccount();
  const { data: gas } = useEstimateGas({
    account: address,
    to: props.writeValues.address,
    value: props.writeValues.value,
    data: encodeFunctionData(props.writeValues),
  });
  const { data: gasPrice } = useGasPrice();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract(props.writeValues);
  }

  return (
    <Box>
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
        <FormLabel id="radio-buttons-group-label">{t("priceTitle")}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={props.isListing}
          onChange={(event) => {
            const value = event.target.value == "true";
            props.onListingChanged?.(value);
          }}
        >
          <FormControlLabel
            value={false}
            control={<Radio disabled={!props.onListingChanged} />}
            label={props.wasListing != "unlist" ? t("unlist") : t("keepUnlist")}
          />
          <FormControlLabel
            value={true}
            control={<Radio disabled={!props.onListingChanged} />}
            label={props.wasListing == "list" ? t("keepList") : t("list")}
          />
          <FormControl>
            <EtherInput
              initPrice={props.price}
              onPriceChanged={(price) => {
                props.onPriceChanged?.(price ?? 0n);
              }}
              disabled={
                !props.onPriceChanged ||
                !props.isListing ||
                isPending ||
                isConfirming
              }
            />
          </FormControl>
        </RadioGroup>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            type="submit"
            disabled={isPending || isConfirming || !props.canSubmit}
            sx={{ mt: 2, mb: 2, mr: 2 }}
          >
            {props.submitButtonText ?? t("post")}
          </Button>
          <FormHelperText>
            {t("estimatedCost", {
              price: formatEther(
                gas && gasPrice
                  ? (props.writeValues.value ?? 0n) + gas * gasPrice
                  : 0n
              ),
            })}
          </FormHelperText>
          <Tooltip
            title={
              <div>
                {t("estimatedGas", { gas: gas?.toString() ?? "" })}
                <br />
                {t("gasPrice", {
                  price: gasPrice ? formatGwei(gasPrice) : "",
                })}
                <br />
                {t("value", {
                  price: props.writeValues.value
                    ? formatEther(props.writeValues.value)
                    : "0",
                })}
              </div>
            }
          >
            <HelpOutline fontSize="small" sx={{ ml: 1 }} />
          </Tooltip>
        </div>
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
