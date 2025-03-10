import { a as E, O as u, g as x, b as C } from "./index-evOerbxh.js";
import * as P from "@bitcoinerlab/secp256k1";
import { initEccLib as O, Psbt as v } from "bitcoinjs-lib";
import { BitcoinNetworkType as o, getAddress as A, signTransaction as M, signMessage as N } from "sats-connect";
import { a as g, B as m } from "./BrowserWalletSigningError-DZ1iTdsv.js";
import { f as I } from "./utils-COSGRikT.js";
var b = /* @__PURE__ */ ((e) => (e.UNISAT = "unisat", e.XVERSE = "xverse", e.MAGICEDEN = "magiceden", e.LEATHER = "leather", e.OKX = "okx", e.PHANTOM = "phantom", e.OYL = "oyl", e))(b || {});
o.Mainnet, o.Testnet, o.Signet;
function p(e, s) {
  switch (e) {
    case "mainnet":
      return o.Mainnet;
    case "testnet":
      return s === b.XVERSE ? o.Testnet4 : o.Testnet;
    case "signet":
      return o.Signet;
    default:
      return o.Mainnet;
  }
}
O(P);
async function z(e, s, i = "mainnet") {
  const l = [], c = (t) => {
    if (!t || !t.addresses || t.addresses.length !== 2)
      throw new g(
        "Failed to retrieve addresses using selected wallet"
      );
    t.addresses.forEach((n) => {
      const f = x(n.address, i);
      let r = n.publicKey;
      f === "taproot" && (r = I(n.publicKey)), l.push({
        publicKey: r,
        address: n.address,
        format: f
      });
    });
  }, d = () => {
    throw new m();
  }, a = {
    payload: {
      purposes: ["ordinals", "payment"],
      message: "Provide access to Payment address and Ordinals address",
      network: {
        type: p(i, s)
      }
    },
    getProvider: e,
    onFinish: (t) => c(t),
    onCancel: d
  };
  return await A(a), l;
}
async function L(e, s, i, {
  finalize: l = !0,
  extractTx: c = !0,
  network: d,
  inputsToSign: a
} = { network: "mainnet", inputsToSign: [] }) {
  if (!l && c)
    throw new E();
  if (!s || !d || !a.length)
    throw new u("Invalid options provided");
  let t, n = null;
  const f = (F) => {
    const { psbtBase64: y } = F;
    if (!y)
      throw new g(
        "Failed to sign psbt using selected wallet"
      );
    const h = v.fromBase64(y);
    if (l && a.forEach((w) => {
      w.signingIndexes.forEach((S) => {
        try {
          h.finalizeInput(S);
        } catch (T) {
          throw console.error("Sign psbt error", T), new u("Failed to finalize input");
        }
      });
    }), c) {
      try {
        t = h.extractTransaction().toHex();
      } catch (w) {
        throw w instanceof Error && w.message === "Not finalized" ? new E() : new u("Failed to extract transaction from PSBT");
      }
      n = null;
    } else
      t = h.toHex(), n = h.toBase64();
  }, r = () => {
    throw new m();
  }, B = {
    payload: {
      network: {
        type: p(d, i)
      },
      message: "Sign PSBT",
      psbtBase64: s.toBase64(),
      broadcast: !1,
      inputsToSign: a
    },
    onFinish: f,
    onCancel: r,
    getProvider: e
  };
  return await M(B), { hex: t, base64: n };
}
async function D(e, s, i, l, c = "mainnet") {
  if (!s || !c || !i)
    throw new u("Invalid options provided");
  let d, a = null;
  const t = (r) => {
    if (!r)
      throw new g(
        "Failed to sign message using selected wallet"
      );
    d = C.from(r, "base64").toString("hex"), a = r;
  }, n = () => {
    throw new m();
  }, f = {
    payload: {
      network: {
        type: p(c, l)
      },
      message: s,
      address: i
    },
    getProvider: e,
    onFinish: t,
    onCancel: n
  };
  return await N(f), { hex: d, base64: a };
}
export {
  b as W,
  L as a,
  D as b,
  z as s
};
