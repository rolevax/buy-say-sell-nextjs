import { getChainId, ReadContractReturnType } from "@wagmi/core";
import { anvil, sepolia } from "viem/chains";
import { config } from "./wagmi";
import { contractAbi } from "./contract_abi";

export type StoryType = ReadContractReturnType<
  typeof contractAbi,
  "getStory",
  [0n]
>;
export type CommentType = StoryType["comments"][0];

export const defaultPrice = 100000000000000n;

export function getContractAddress() {
  const chain = getChainId(config);
  return getContractAddressOf(chain);
}

export function getContractAddressOf(chain: ReturnType<typeof getChainId>) {
  if (chain == sepolia.id) {
    return "0xba6Ca6f8492aBd2b7e1EF1038A9bf46C71E8c4B6";
  }
  if (chain == anvil.id) {
    return "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  }
  return "0x";
}

export function getFee(price: bigint) {
  return (price * 5n) / 10000n;
}
