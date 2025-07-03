"use client";

import { useAccount } from "wagmi";
import { WalletConnect } from "./wallet-connect";
import { WalletDisconnect } from "./wallet-disconnect";

export const WalletConnector = () => {
  const { isConnected } = useAccount();

  if (isConnected) return <WalletDisconnect />;

  return <WalletConnect />;
};
