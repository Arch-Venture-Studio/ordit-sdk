import { BitcoinNetworkType } from 'sats-connect';
import { BrowserWalletNetwork, Wallet } from '../../../config/types';
export declare const NETWORK_TO_BITCOIN_NETWORK_TYPE: Record<Extract<BrowserWalletNetwork, "mainnet" | "testnet" | "signet">, BitcoinNetworkType>;
export declare function getBitcoinNetworkType(network: Extract<BrowserWalletNetwork, "mainnet" | "testnet" | "signet">, wallet: Wallet): BitcoinNetworkType;
//# sourceMappingURL=constants.d.ts.map