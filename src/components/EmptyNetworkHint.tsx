"use client";

import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";
import EmptyHint from "./EmptyHint";

export default function EmptyNetworkHint() {
  const t = useTranslations("Home");
  const { chain } = useAccount();
  return (
    <EmptyHint
      title={t("unsupportedNetworkTitle", { chain: chain?.name ?? "unknown" })}
      content={t("unsupportedNetworkContent")}
    />
  );
}
