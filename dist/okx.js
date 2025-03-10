import { O as n, B as c, g as W, a as x, b as k } from "./index-evOerbxh.js";
import { Psbt as E } from "bitcoinjs-lib";
import { B as g, a as p } from "./BrowserWalletSigningError-DZ1iTdsv.js";
import { f as O } from "./utils-COSGRikT.js";
function d() {
  if (typeof window > "u")
    throw new n("Cannot call this function outside a browser");
  return typeof window.okxwallet < "u";
}
function u(o = "mainnet") {
  if (!d())
    throw new c("OKX Wallet not installed");
  let e;
  switch (o) {
    case "mainnet":
      e = window.okxwallet.bitcoin;
      break;
    case "testnet":
      e = window.okxwallet.bitcoinTestnet;
      break;
    case "signet":
      e = window.okxwallet.bitcoinSignet;
      break;
    default:
      throw new n("Invalid network");
  }
  if (!e)
    throw new n("Failed to get OKX Wallet provider");
  return e;
}
async function v(o = "mainnet") {
  if (!d())
    throw new c("OKX Wallet not installed");
  const e = u(o);
  try {
    const { address: t, publicKey: s } = await e.connect(), r = W(t, o), a = O(s);
    if (!t || !a || !r)
      throw new n("Failed to get addresses from OKX Wallet");
    return [
      {
        publicKey: a,
        address: t,
        format: r
      }
    ];
  } catch (t) {
    if (t instanceof n)
      throw t;
    const s = t;
    throw s.code === 4001 ? new g() : new n(s.message);
  }
}
async function H(o, {
  finalize: e = !0,
  extractTx: t = !0,
  network: s,
  inputsToSign: r
} = { network: "mainnet", inputsToSign: [] }) {
  if (!d())
    throw new c("OKX Wallet not installed");
  if (t && !e)
    throw new x();
  const a = u(s), l = o.toHex();
  let f = "";
  const m = [];
  r.forEach((i) => {
    const { address: w, signingIndexes: y, sigHash: b } = i;
    y.forEach((K) => {
      m.push({
        index: K,
        address: w,
        sighashTypes: b ? [b] : void 0
      });
    });
  });
  try {
    f = await a.signPsbt(l, {
      autoFinalized: e,
      toSignInputs: m
    });
  } catch (i) {
    const w = i;
    throw w.code === 4001 ? new g() : new n(w.message);
  }
  if (!f)
    throw new p(
      "Failed to sign psbt hex using OKX Wallet"
    );
  const h = E.fromHex(f);
  if (t)
    try {
      return {
        base64: null,
        hex: h.extractTransaction().toHex()
      };
    } catch (i) {
      throw i instanceof Error && i.message === "Not finalized" ? new x() : new n("Failed to extract transaction from PSBT");
    }
  else
    return {
      base64: h.toBase64(),
      hex: h.toHex()
    };
}
async function S(o, e = "ecdsa", t = "mainnet") {
  if (!d())
    throw new c("OKX Wallet not installed");
  const s = u(t);
  let r = "";
  try {
    r = await s.signMessage(o, e);
  } catch (a) {
    const l = a;
    throw l.code === 4001 ? new g() : new n(l.message);
  }
  if (!r)
    throw new p(
      "Failed to sign message using OKX Wallet"
    );
  return {
    base64: r,
    hex: k.from(r, "base64").toString("hex")
  };
}
export {
  v as getAddresses,
  d as isInstalled,
  S as signMessage,
  H as signPsbt
};
