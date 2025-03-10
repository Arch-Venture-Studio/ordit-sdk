import { Chain, Network } from '../config/types';
import { Address, AddressFormat, AddressType } from './types';
export declare function getAddressType(address: string, network: Network, chain?: Chain): AddressType;
export declare function getAddressFormat(address: string, network: Network, chain?: Chain): AddressFormat;
export declare function validateAddress(address: string, network: Network, chain?: Chain): boolean;
export declare function getAddressesFromPublicKey(publicKey: string | Buffer, network?: Network, type?: Exclude<AddressType, "p2wsh"> | "all", chain?: Chain): Address[];
export declare function getNetworkByAddress(address: string): Network;
export * from './constants';
export * from './types';
//# sourceMappingURL=index.d.ts.map