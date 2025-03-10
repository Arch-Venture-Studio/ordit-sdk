import { Psbt } from 'bitcoinjs-lib';
import { BrowserWalletNetwork } from '../../config/types';
import { BrowserWalletSignResponse, WalletAddress } from '../types';
import { OylSignPSBTOptions } from './types';
declare function isInstalled(): boolean;
declare function getAddresses(network?: BrowserWalletNetwork): Promise<WalletAddress[]>;
declare function signMessage(message: string, address: string, network?: BrowserWalletNetwork): Promise<BrowserWalletSignResponse>;
declare function signPsbt(psbt: Psbt, { finalize, extractTx, network, inputsToSign, }?: OylSignPSBTOptions): Promise<BrowserWalletSignResponse>;
export { getAddresses, isInstalled, signMessage, signPsbt };
//# sourceMappingURL=index.d.ts.map