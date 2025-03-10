import { BitcoinNetworkType } from "sats-connect";

import type { BrowserWalletNetwork } from "../../../config/types";
import { Wallet } from "../../../config/types";

export const NETWORK_TO_BITCOIN_NETWORK_TYPE: Record<
  Extract<BrowserWalletNetwork, "mainnet" | "testnet" | "signet">,
  BitcoinNetworkType
> = {
  mainnet: BitcoinNetworkType.Mainnet,
  testnet: BitcoinNetworkType.Testnet,
  signet: BitcoinNetworkType.Signet,
} as const;

export function getBitcoinNetworkType(
  network: Extract<BrowserWalletNetwork, "mainnet" | "testnet" | "signet">,
  wallet: Wallet,
): BitcoinNetworkType {
  switch (network) {
    case "mainnet":
      return BitcoinNetworkType.Mainnet;
    case "testnet": {
      if (wallet === Wallet.XVERSE) {
        return BitcoinNetworkType.Testnet4;
      }
      return BitcoinNetworkType.Testnet;
    }
    case "signet":
      return BitcoinNetworkType.Signet;
    default:
      return BitcoinNetworkType.Mainnet;
  }
}
