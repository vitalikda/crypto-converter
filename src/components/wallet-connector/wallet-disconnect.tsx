"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const WalletDisconnect = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Button onClick={() => disconnect()}>
      {address ? shortenAddress(address) : "Disconnect"}
      <LogOutIcon className="size-4" />
    </Button>
  );
};
