import { getChainId, ReadContractReturnType } from "@wagmi/core";
import { anvil, sepolia } from "viem/chains";
import { useChainId } from "wagmi";
import { contractAbi } from "./contract_abi";

export type StoryType = ReadContractReturnType<
  typeof contractAbi,
  "getStory",
  [0n]
>;
export type CommentType = StoryType["comments"][0];

export const defaultPrice = 100000000000000n;

export function useContractAddress(): `0x${string}` | undefined {
  const chain = useChainId();
  return getContractAddressOf(chain);
}

export function getContractAddressOf(
  chain: ReturnType<typeof getChainId>
): `0x${string}` | undefined {
  if (chain == sepolia.id) {
    return "0x0671195247F6F708fA5345b9f5bEaDbE9dB1B8b5";
  }
  if (chain == anvil.id) {
    return "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  }
  return undefined;
}

export function getFee(price: bigint) {
  return (price * 5n) / 10000n;
}
