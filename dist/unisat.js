import { O as w, B as d, g as T, a as g, b as N } from "./index-evOerbxh.js";
import { Psbt as E } from "bitcoinjs-lib";
import { B as u, a as h } from "./BrowserWalletSigningError-DZ1iTdsv.js";
const b = {
  mainnet: "livenet",
  testnet: "testnet",
  signet: "testnet"
}, I = {
  bitcoin: {
    mainnet: "BITCOIN_MAINNET",
    testnet: "BITCOIN_TESTNET4",
    signet: "BITCOIN_SIGNET"
  },
  "fractal-bitcoin": {
    mainnet: "FRACTAL_BITCOIN_MAINNET",
    testnet: "FRACTAL_BITCOIN_TESTNET",
    signet: "FRACTAL_BITCOIN_TESTNET"
  }
};
function f() {
  if (typeof window > "u")
    throw new w("Cannot call this function outside a browser");
  return typeof window.unisat < "u";
}
async function B(o = "mainnet", e = "bitcoin", n = {}) {
  const { readOnly: r = !1 } = n;
  if (!f())
    throw new d("Unisat not installed");
  try {
    if (typeof window.unisat.getChain > "u") {
      if (e === "fractal-bitcoin")
        throw new w(
          "Fractal bitcoin is only supported on Unisat extension >= 1.4.0"
        );
      const c = await window.unisat.getNetwork(), a = b[o];
      c !== a && await window.unisat.switchNetwork(a);
    } else {
      const c = await window.unisat.getChain(), a = I[e][o];
      c !== a && await window.unisat.switchChain(a);
    }
    const t = r ? await window.unisat.getAccounts() : await window.unisat.requestAccounts(), i = await window.unisat.getPublicKey(), s = t[0];
    if (!s)
      return [];
    const l = T(s, o, e);
    return [
      {
        publicKey: i,
        address: s,
        format: l
      }
    ];
  } catch (t) {
    if (t instanceof w)
      throw t;
    const i = t;
    throw i.code === 4001 ? new u() : new w(i.message);
  }
}
async function x(o, { finalize: e = !0, extractTx: n = !0 } = {}) {
  if (!f())
    throw new d("Unisat not installed");
  if (n && !e)
    throw new g();
  const r = o.toHex();
  let t = "";
  try {
    t = await window.unisat.signPsbt(r, {
      autoFinalized: e
    });
  } catch (s) {
    if (s.code === 4001)
      throw new u();
  }
  if (!t)
    throw new h("Failed to sign psbt hex using Unisat");
  const i = E.fromHex(t);
  if (n)
    try {
      return {
        base64: null,
        hex: i.extractTransaction().toHex()
      };
    } catch (s) {
      throw s instanceof Error && s.message === "Not finalized" ? new g() : new w("Failed to extract transaction from PSBT");
    }
  else
    return {
      base64: i.toBase64(),
      hex: i.toHex()
    };
}
async function y(o, e = "ecdsa") {
  if (!f())
    throw new d("Unisat not installed");
  let n = "";
  try {
    n = await window.unisat.signMessage(o, e);
  } catch (r) {
    if (r.code === 4001)
      throw new u();
  }
  if (!n)
    throw new h("Failed to sign message using Unisat");
  return {
    base64: n,
    hex: N.from(n, "base64").toString("hex")
  };
}
export {
  B as getAddresses,
  f as isInstalled,
  y as signMessage,
  x as signPsbt
};
