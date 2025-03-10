export declare const P2SH_P2WPKH: {
    INPUTS: {
        hash: string;
        index: number;
        witnessUtxo: {
            script: Buffer<ArrayBuffer>;
            value: number;
        };
        redeemScript: Buffer<ArrayBuffer>;
    }[];
    OUTPUTS: {
        script: Buffer<ArrayBuffer>;
        value: number;
    }[];
};
export declare const P2WPKH: {
    INPUTS: {
        hash: string;
        index: number;
        witnessUtxo: {
            script: Buffer<ArrayBuffer>;
            value: number;
        };
    }[];
    OUTPUTS: {
        address: string;
        value: number;
    }[];
};
export declare const P2TR: {
    INPUTS: {
        hash: string;
        index: number;
        sequence: number;
        witnessUtxo: {
            value: number;
            script: Buffer<ArrayBuffer>;
        };
    }[];
    OUTPUTS: {
        value: number;
        address: string;
    }[];
};
//# sourceMappingURL=psbt.fixture.d.ts.map