import { AddressType } from '../addresses/types';
import { Network } from '../config/types';
export type OnOffUnion = "on" | "off";
export type GetWalletOptions = {
    pubKey: string;
    network: Network;
    format: AddressType | "all";
    safeMode?: OnOffUnion;
};
//# sourceMappingURL=types.d.ts.map