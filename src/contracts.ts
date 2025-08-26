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

export function getContractAddress() {
  const chain = getChainId(config);
  return getContractAddressOf(chain);
}

export function getContractAddressOf(chain: ReturnType<typeof getChainId>) {
  if (chain == sepolia.id) {
    return "0xEc17680FC384aA29061994F19d66Ee0860f93E72";
  }
  if (chain == anvil.id) {
    return "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  }
  return "0x";
}
