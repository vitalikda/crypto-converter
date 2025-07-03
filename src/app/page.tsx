"use client";

import { InputFormat } from "@/components/input-format";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetPriceUsd } from "@/hooks/coingecko/use-get-price-usd";
import { getCoin } from "@/lib/coins";
import { cn } from "@/lib/utils";
import { ArrowUpDownIcon, RotateCwIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const {
    data: priceUsd,
    isPending: isPricesLoading,
    refetch: refetchPrices,
    isError: isPricesError,
  } = useGetPriceUsd(["bitcoin"]);
  const wBtcPrice = useMemo(() => priceUsd?.bitcoin || 0, [priceUsd]);

  const { isConnected, chainId } = useAccount();

  const [symbolFrom, setSymbolFrom] = useState("USD");
  const coinFrom = useMemo(() => getCoin(symbolFrom), [symbolFrom]);
  const [symbolTo, setSymbolTo] = useState("wBTC");
  const coinTo = useMemo(() => getCoin(symbolTo), [symbolTo]);

  const [amountFrom, setAmountFrom] = useState("");
  const amountTo = useMemo(() => {
    if (!amountFrom) return "";
    if (!wBtcPrice) return "";
    const amount = Number(amountFrom);
    if (symbolFrom === "USD") {
      return (amount / wBtcPrice).toString();
    }
    return (amount * wBtcPrice).toString();
  }, [amountFrom, wBtcPrice, symbolFrom]);

  return (
    <div className="flex w-full flex-col gap-4 max-w-md">
      <Card>
        <CardHeader className="items-center">
          <CardTitle className="row-span-2">
            Convert {symbolFrom} to {symbolTo}
          </CardTitle>
          <CardAction className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setSymbolFrom(symbolTo);
                    setSymbolTo(symbolFrom);
                    setAmountFrom(amountTo);
                  }}
                  variant="outline"
                  size="icon"
                >
                  <ArrowUpDownIcon className="size-3" />
                  <span className="sr-only">Switch currencies</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch currencies</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => refetchPrices()}
                  disabled={isPricesLoading}
                  variant="outline"
                  size="icon"
                >
                  <RotateCwIcon
                    className={cn("size-3", {
                      "animate-spin": isPricesLoading,
                    })}
                  />
                  <span className="sr-only">Refresh prices</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh prices</p>
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="amount-from">Selling</Label>
              <div className="flex gap-2">
                <InputFormat
                  value={amountFrom}
                  onChange={(value) => setAmountFrom(value)}
                  decimals={coinFrom?.decimals}
                  id="amount-from"
                  type="text"
                  placeholder="1,000.00"
                  required
                />
                {!!coinFrom && (
                  <Button variant="outline" className="w-[100px] justify-start">
                    <Image
                      src={coinFrom.logoURI}
                      alt=""
                      width={14}
                      height={14}
                      className="size-4 rounded-full"
                    />
                    {coinFrom.symbol}
                  </Button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount-to">Buying</Label>
              <div className="flex gap-2">
                <InputFormat
                  value={amountTo}
                  decimals={coinTo?.decimals}
                  id="amount-to"
                  type="text"
                  placeholder="1,000.00"
                  readOnly
                />
                {!!coinTo && (
                  <Button variant="outline" className="w-[100px] justify-start">
                    <Image
                      src={coinTo.logoURI}
                      alt=""
                      width={14}
                      height={14}
                      className="size-4 rounded-full"
                    />
                    {coinTo.symbol}
                  </Button>
                )}
              </div>
            </div>
            {isConnected ? (
              chainId === 1 ? (
                <Button disabled={isPricesError}>Coming Soon</Button>
              ) : (
                <Button disabled>Switch to Ethereum Mainnet</Button>
              )
            ) : (
              <Button disabled>Connect Wallet First</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {isPricesError ? (
        <div className="font-mono text-destructive text-sm text-balance text-center">
          <p>We could not get the price of {symbolFrom}</p>
        </div>
      ) : null}
    </div>
  );
}
