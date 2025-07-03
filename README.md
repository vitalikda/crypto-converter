# Crypto Converter

This project is a Next.js app that allows users to convert cryptocurrencies (atm, USD and wBTC). It provides a user-friendly interface with light and dark themes, and a responsive design that adapts to different screen sizes.

The app uses the [Wagmi](https://wagmi.sh/) to connect a wallet and interact with the blockchain, and the [Tanstack Query](https://tanstack.com/query/) to handle async data (e.g. Coingecko API).

In the future, would be great to add support for selecting a different tokens and cache coingecko data due to the rate limiting.

## Project structure

- [`src/app/page.tsx`](/src/app/page.tsx): the main code with the conversion form
- [`src/components/ui`](src/components/ui): base components
- [`src/components/wallet-connector`](src/components/wallet-menu): the component to manage wallet state
- [`src/components/providers`](src/components/providers): react context providers with custom configs
- [`src/lib/coins`](src/lib/coins): curated token list (atm, USD and wBTC)

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Run the dev server with `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Notes

- Instruction Deviations

Intentionally removed "Convert to {token}" button, as the user expectation is to see the conversion result immediately after entering the amount.

- Action Button

The main action button is used to lead the user for the next step in the conversion process. E.g. if user is not using Ethereum Mainnet, the button will be disabled and the user will be prompted to switch to Mainnet.

- Error Handling

The error handling is extremely basic and just displays a static message below the form, due to there is only one API call that can fail. Depending on the requirements, errors can be handled with ErrorBoundary and/or global state management like Zustand/Redux.

- `wBTC` Contract

The `useReadContract` hook from Wagmi is a great way to read data from a smart contract. In an example below we are reading the `decimals` function from the `wBTC` contract on Ethereum Mainnet (configured in `wagmi-config.ts`).

```ts
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

useReadContract({
  address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  abi: erc20Abi,
  functionName: "decimals",
});
```

Need to replace public RPC in `wagmi-config.ts` with a private one to avoid rate limiting.
