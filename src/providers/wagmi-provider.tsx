"use client";

import { WagmiProvider as Provider } from "wagmi";
import { wagmiConfig } from "../lib/wagmi-config";

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider config={wagmiConfig}>{children}</Provider>;
};
