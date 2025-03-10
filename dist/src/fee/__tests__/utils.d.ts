import { Psbt } from 'bitcoinjs-lib';
import { AddressFormat } from '../../addresses/types';
/**
 * Creates a mock Psbt for testing.
 *
 * References:
 * - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/transactions.spec.ts
 * - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/taproot.spec.ts
 *
 * @returns Psbt
 */
declare function createMockPsbt(format: Exclude<AddressFormat, "legacy">): Psbt;
export { createMockPsbt };
//# sourceMappingURL=utils.d.ts.map