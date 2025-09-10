import { config } from "@/wagmi";
import { Link } from "@mui/material";
import { ReactNode } from "react";
import { getChainId } from "@wagmi/core";

export default function AddressLink(props: {
  address: `0x${string}`;
  children: ReactNode | ReactNode[];
}) {
  const explorer =
    config.chains.find((c) => c.id == getChainId(config))?.blockExplorers
      ?.default.url ?? "https://etherscan.io";

  return (
    <Link
      href={`${explorer}/address/${props.address}`}
      target="_blank"
      rel="noopener"
      underline="hover"
    >
      {props.children}
    </Link>
  );
}
