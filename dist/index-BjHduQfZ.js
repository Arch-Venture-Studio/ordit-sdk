import { a as y, O as h, b as C, g as O } from "./index-evOerbxh.js";
import * as P from "@bitcoinerlab/secp256k1";
import { initEccLib as T, Psbt as x } from "bitcoinjs-lib";
import { BitcoinNetworkType as w, getAddress as S, signTransaction as W, signMessage as K } from "sats-connect";
import { a as g, B as m } from "./BrowserWalletSigningError-DZ1iTdsv.js";
import { f as v } from "./utils-COSGRikT.js";
const p = {
  mainnet: w.Mainnet,
  testnet: w.Testnet,
  signet: w.Signet
};
T(P);
async function A(c, n = "mainnet") {
  const s = [], r = (e) => {
    if (!e || !e.addresses || e.addresses.length !== 2)
      throw new g(
        "Failed to retrieve addresses using selected wallet"
      );
    e.addresses.forEach((t) => {
      const l = O(t.address, n);
      let o = t.publicKey;
      l === "taproot" && (o = v(t.publicKey)), s.push({
        publicKey: o,
        address: t.address,
        format: l
      });
    });
  }, i = () => {
    throw new m();
  }, a = {
    payload: {
      purposes: ["ordinals", "payment"],
      message: "Provide access to Payment address and Ordinals address",
      network: {
        type: p[n]
      }
    },
    getProvider: c,
    onFinish: (e) => r(e),
    onCancel: i
  };
  return await S(a), s;
}
async function M(c, n, {
  finalize: s = !0,
  extractTx: r = !0,
  network: i,
  inputsToSign: a
} = { network: "mainnet", inputsToSign: [] }) {
  if (!s && r)
    throw new y();
  if (!n || !i || !a.length)
    throw new h("Invalid options provided");
  let e, t = null;
  const l = (B) => {
    const { psbtBase64: u } = B;
    if (!u)
      throw new g(
        "Failed to sign psbt using selected wallet"
      );
    const d = x.fromBase64(u);
    if (s && a.forEach((f) => {
      f.signingIndexes.forEach((F) => {
        try {
          d.finalizeInput(F);
        } catch (E) {
          throw console.error("Sign psbt error", E), new h("Failed to finalize input");
        }
      });
    }), r) {
      try {
        e = d.extractTransaction().toHex();
      } catch (f) {
        throw f instanceof Error && f.message === "Not finalized" ? new y() : new h("Failed to extract transaction from PSBT");
      }
      t = null;
    } else
      e = d.toHex(), t = d.toBase64();
  }, o = () => {
    throw new m();
  }, b = {
    payload: {
      network: {
        type: p[i]
      },
      message: "Sign PSBT",
      psbtBase64: n.toBase64(),
      broadcast: !1,
      inputsToSign: a
    },
    onFinish: l,
    onCancel: o,
    getProvider: c
  };
  return await W(b), { hex: e, base64: t };
}
async function R(c, n, s, r = "mainnet") {
  if (!n || !r || !s)
    throw new h("Invalid options provided");
  let i, a = null;
  const e = (o) => {
    if (!o)
      throw new g(
        "Failed to sign message using selected wallet"
      );
    i = C.from(o, "base64").toString("hex"), a = o;
  }, t = () => {
    throw new m();
  }, l = {
    payload: {
      network: {
        type: p[r]
      },
      message: n,
      address: s
    },
    getProvider: c,
    onFinish: e,
    onCancel: t
  };
  return await K(l), { hex: i, base64: a };
}
export {
  M as a,
  R as b,
  A as s
};
