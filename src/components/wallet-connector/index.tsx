"use client";

import dynamic from "next/dynamic";

export const WalletConnector = dynamic(
  () => import("./wallet-connector").then((mod) => mod.WalletConnector),
  {
    ssr: false,
  }
);
