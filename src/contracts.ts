import { getChainId } from "@wagmi/core";
import { anvil, sepolia } from "viem/chains";
import { config } from "./wagmi";

export function getContractAddress() {
  const chain = getChainId(config);
  return getContractAddressOf(chain);
}

export function getContractAddressOf(chain: ReturnType<typeof getChainId>) {
  if (chain == sepolia.id) {
    return "0xEc17680FC384aA29061994F19d66Ee0860f93E72";
  }
  if (chain == anvil.id) {
    return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  }
  return "0x";
}
