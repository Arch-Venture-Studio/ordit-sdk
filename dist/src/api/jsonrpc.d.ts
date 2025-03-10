import { Chain, Network } from '../config/types';
type JsonRpcId = string | number | null;
export type ParamRecord = {
    [k in string]: Params;
};
export type Params = string | string[] | number | number[] | boolean | boolean[] | null | undefined | ParamRecord;
declare class JsonRpc {
    readonly url: string;
    constructor(url: string);
    /**
     * Send a JSON-RPC 2.0 notification to the connected Sado compliant server.
     *
     * @param method - Method to call.
     * @param params - JSON-RPC 2.0 parameters.
     */
    notify(method: string, params?: Params): Promise<void>;
    call<T>(method: string, id: JsonRpcId): Promise<T>;
    call<T>(method: string, params: Params, id: JsonRpcId): Promise<T>;
}
export declare const rpc: {
    id: number;
} & Record<Chain, Record<Network, JsonRpc>>;
export {};
//# sourceMappingURL=jsonrpc.d.ts.map