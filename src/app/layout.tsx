import { ThemeToggle } from "@/components/theme-toggle";
import { WalletConnector } from "@/components/wallet-connector";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { WagmiProvider } from "@/providers/wagmi-provider";
import type { Metadata } from "next";
import { IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const JetBrainsMonoFont = JetBrains_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const iBMSerifFont = IBM_Plex_Serif({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crypto Converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${JetBrainsMonoFont.variable} ${iBMSerifFont.variable} relative font-sans antialiased`}
      >
        <ThemeProvider>
          <TanstackProvider>
            <WagmiProvider>
              <nav className="flex items-center justify-end gap-4 p-4 absolute top-0 left-0 right-0">
                <WalletConnector />
                <ThemeToggle />
              </nav>
              <main className="min-h-dvh flex flex-1 flex-col items-center justify-center gap-8 p-4">
                {children}
              </main>
            </WagmiProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
