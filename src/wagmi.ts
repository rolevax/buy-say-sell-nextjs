import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, arbitrum, mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Buy Say Sell",
  projectId: "497de18cc174f02dec5b52d323c92893",
  chains: [
    mainnet,
    arbitrum,
    sepolia,
    ...(process.env.NODE_ENV === "development" ? [anvil] : []),
  ],
  ssr: true,
});
