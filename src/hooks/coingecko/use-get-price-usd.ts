import { useQuery } from "@tanstack/react-query";

type CoingeckoId = "bitcoin" | "ethereum" | "solana";

export const getPriceUsd = async (ids: CoingeckoId[]) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
      ","
    )}&vs_currencies=usd`
  );
  const data = (await res.json()) as {
    [key: string]: { usd: number };
  } | null;
  if (!data) return null;
  return Object.fromEntries(
    Object.entries(data).map(([id, value]) => [id, value.usd])
  ) as Record<CoingeckoId, number>;
};

export const useGetPriceUsdQueryKey = (ids: CoingeckoId[]) => ["price", ...ids];

export const useGetPriceUsd = (ids: CoingeckoId[]) => {
  return useQuery({
    queryKey: useGetPriceUsdQueryKey(ids),
    queryFn: () => getPriceUsd(ids),
  });
};
