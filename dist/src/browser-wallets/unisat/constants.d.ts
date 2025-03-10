import { BrowserWalletNetwork, Chain } from '../../config/types';
export declare const NETWORK_TO_UNISAT_NETWORK: Record<Extract<BrowserWalletNetwork, "mainnet" | "testnet" | "signet">, UnisatNetwork>;
export declare const CHAIN_TO_UNISAT_CHAIN: Record<Chain, Record<Extract<BrowserWalletNetwork, "mainnet" | "testnet" | "signet">, UnisatChainType>>;
//# sourceMappingURL=constants.d.ts.map