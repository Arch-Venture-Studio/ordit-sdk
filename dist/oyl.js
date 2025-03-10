import { O as s, g as u, b as h, a as w, B as g } from "./index-evOerbxh.js";
import { Psbt as p } from "bitcoinjs-lib";
import "./index.js";
import { B as m } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
function y() {
  if (typeof window > "u")
    throw new s("Cannot call this function outside a browser");
  return typeof window.oyl < "u";
}
function d(r = "mainnet") {
  if (!y())
    throw new g("Oyl Wallet not installed");
  if (r !== "mainnet")
    throw new m(
      "Oyl Wallet only supports mainnet"
    );
}
async function F(r = "mainnet") {
  d(r);
  const t = await window.oyl.getAddresses(), o = [];
  if (!t.taproot)
    throw new s("No taproot address found");
  return Object.keys(t).forEach((n) => {
    const a = n;
    o.push({
      publicKey: t[a].publicKey,
      address: t[a].address,
      format: u(t[a].address, r)
    });
  }), o;
}
async function O(r, t, o = "mainnet") {
  d(o);
  try {
    const { signature: n } = await window.oyl.signMessage({
      address: t,
      message: r
    });
    return {
      hex: h.from(n, "base64").toString("hex"),
      base64: n
    };
  } catch (n) {
    throw console.error("Sign message error", n), new s("Failed to sign message with Oyl Wallet");
  }
}
async function P(r, {
  finalize: t = !0,
  extractTx: o = !0,
  network: n,
  inputsToSign: a
} = { network: "mainnet", inputsToSign: [] }) {
  if (d(n), o && !t)
    throw new w();
  const c = [];
  a.forEach((e) => {
    const { signingIndexes: l } = e;
    l.forEach(() => {
      c.push(e);
    });
  });
  let i;
  try {
    const { psbt: e } = await window.oyl.signPsbt({
      psbt: r.toHex(),
      finalize: !1,
      // ordit-sdk will finalize it manually if there is any inputs to sign
      broadcast: !1
      // ordit-sdk will not support broadcasting to keep implementation consistent across all wallets
    });
    i = p.fromHex(e);
  } catch {
    throw new s("Failed to sign psbt with Oyl Wallet");
  }
  if (t && c.forEach((e, l) => {
    try {
      i.finalizeInput(l);
    } catch (f) {
      throw console.error("Sign psbt error", f), new s("Failed to finalize input");
    }
  }), o)
    try {
      return {
        base64: null,
        hex: i.extractTransaction().toHex()
      };
    } catch (e) {
      throw e instanceof Error && e.message === "Not finalized" ? new w() : new s("Failed to extract transaction from PSBT");
    }
  return {
    hex: i.toHex(),
    base64: i.toBase64()
  };
}
export {
  F as getAddresses,
  y as isInstalled,
  O as signMessage,
  P as signPsbt
};
