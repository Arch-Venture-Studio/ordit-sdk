export type Network = "mainnet" | "testnet" | "regtest" | "signet";
export type BrowserWalletNetwork = Extract<Network, "mainnet" | "testnet" | "signet">;
export type Chain = "bitcoin" | "fractal-bitcoin";
export declare enum Wallet {
    UNISAT = "unisat",
    XVERSE = "xverse",
    MAGICEDEN = "magiceden",
    LEATHER = "leather",
    OKX = "okx",
    PHANTOM = "phantom",
    OYL = "oyl"
}
//# sourceMappingURL=types.d.ts.map