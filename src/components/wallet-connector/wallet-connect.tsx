"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Connector, useConnect } from "wagmi";

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <CommandItem disabled={!ready} value={connector.id} onSelect={onClick}>
      {connector.name}
    </CommandItem>
  );
};

export const WalletConnect = () => {
  const { connectors, connect } = useConnect();

  const wallets = useMemo(
    () => connectors.filter((c) => c.name.toLowerCase() !== "injected"),
    [connectors]
  );

  const [isOpen, setIsOpen] = useState(false);

  if (!wallets.length) return null;

  if (wallets.length === 1) {
    const wallet = wallets[0];
    return (
      <Button
        onClick={() => {
          connect({ connector: wallet });
        }}
        variant="outline"
        className="w-[200px] justify-between"
      >
        Connect {wallet.name}
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          Connect wallet
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search wallet..." />
          <CommandList>
            <CommandEmpty>Not found</CommandEmpty>
            <CommandGroup>
              {wallets.map((wallet) => (
                <WalletOption
                  key={wallet.uid}
                  connector={wallet}
                  onClick={() => {
                    connect({ connector: wallet });
                    setIsOpen(false);
                  }}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
