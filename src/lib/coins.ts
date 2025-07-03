type FiatCoin = {
  type: "FIAT";
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

type Erc20Coin = {
  type: "ERC20";
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
};

export type Coin = FiatCoin | Erc20Coin;

export const getCoin = (symbol: string): Coin | undefined => {
  return coins.find((coin) => coin.symbol === symbol);
};

/**
 * NOTE: generated list to provider consistency
 */
export const coins: Coin[] = [
  {
    type: "FIAT",
    name: "US Dollar",
    symbol: "USD",
    decimals: 2,
    logoURI: "/coins/usd.svg",
  },
  {
    type: "ERC20",
    name: "Wrapped Bitcoin",
    symbol: "wBTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
    logoURI: "/coins/wbtc.svg",
  },
];
