import { Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { formatEther, InvalidDecimalNumberError, parseEther } from "viem";

export default function EtherInput(props: {
  initPrice: bigint;
  onPriceChanged: (price?: bigint) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState(formatEther(props.initPrice));
  const [error, setError] = useState(false);

  return (
    <Input
      error={error}
      startAdornment={<InputAdornment position="start">Ξ</InputAdornment>}
      endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
      value={value}
      onChange={(e) => {
        const s = e.target.value;
        setValue(s);
        try {
          const wei = parseEther(s);
          props.onPriceChanged(wei);
          setError(false);
        } catch (error: unknown) {
          props.onPriceChanged(undefined);
          setError(true);
        }
      }}
      disabled={props.disabled}
    />
  );
}
