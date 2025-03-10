import { Transaction as BTCTransaction } from 'bitcoinjs-lib';
import { GetBalanceOptions, GetInscriptionOptions, GetInscriptionsOptions, GetInscriptionUTXOOptions, GetSpendablesOptions, GetTransactionOptions, GetUnspentsOptions, GetUnspentsResponse, RelayOptions } from '../api/types';
import { Chain, Network } from '../config/types';
import { Transaction, UTXO, UTXOLimited } from '../transactions/types';
import { BaseDatasource } from './BaseDatasource';
export interface JsonRpcDatasourceOptions {
    chain?: Chain;
    network: Network;
}
export declare class JsonRpcDatasource extends BaseDatasource {
    constructor({ chain, network }: JsonRpcDatasourceOptions);
    getBalance({ address }: GetBalanceOptions): Promise<number>;
    getInscription({ id: _id, decodeMetadata, }: GetInscriptionOptions): Promise<{
        meta: Record<string, unknown> | undefined;
        id: string;
        outpoint: string;
        owner: string;
        genesis: string;
        fee: number;
        height: number;
        number: number;
        sat: number;
        timestamp: number;
        mediaType: string;
        mediaSize: number;
        mediaContent: string;
    }>;
    getInscriptionUTXO({ id: _id }: GetInscriptionUTXOOptions): Promise<UTXO>;
    getInscriptions({ creator, owner, mimeType, mimeSubType, outpoint, decodeMetadata, sort, limit, next: _next, }: GetInscriptionsOptions): Promise<{
        meta: Record<string, unknown> | undefined;
        id: string;
        outpoint: string;
        owner: string;
        genesis: string;
        fee: number;
        height: number;
        number: number;
        sat: number;
        timestamp: number;
        mediaType: string;
        mediaSize: number;
        mediaContent: string;
    }[]>;
    getSpendables({ address, value, rarity, filter, limit, type, }: GetSpendablesOptions): Promise<UTXOLimited[]>;
    getTransaction({ txId, ordinals, hex, witness, decodeMetadata, }: GetTransactionOptions): Promise<{
        tx: Transaction;
        rawTx: BTCTransaction | undefined;
    }>;
    getUnspents({ address, type, rarity, sort, limit, next: _next, }: GetUnspentsOptions): Promise<GetUnspentsResponse>;
    relay({ hex, maxFeeRate, validate }: RelayOptions): Promise<string>;
}
//# sourceMappingURL=JsonRpcDatasource.d.ts.map