import { O as a, B as l, c as u, A as P, b, a as N } from "./index-evOerbxh.js";
import { Psbt as y } from "bitcoinjs-lib";
import "./index.js";
import { B as x } from "./BrowserWalletSigningError-DZ1iTdsv.js";
import { B as O } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
var Y = /* @__PURE__ */ ((r) => (r[r.ALL = 1] = "ALL", r[r.NONE = 2] = "NONE", r[r.SINGLE = 3] = "SINGLE", r[r.ALL_ANYONECANPAY = 129] = "ALL_ANYONECANPAY", r[r.NONE_ANYONECANPAY = 130] = "NONE_ANYONECANPAY", r[r.SINGLE_ANYONECANPAY = 131] = "SINGLE_ANYONECANPAY", r))(Y || {}), c = /* @__PURE__ */ ((r) => (r.P2WPKH = "p2wpkh", r.P2TR = "p2tr", r))(c || {});
async function w(r, s) {
  try {
    return (await window.LeatherProvider.request(
      r,
      s
    )).result;
  } catch (t) {
    const o = t, { message: e } = o.error;
    throw o.error.code === 4001 ? new x(e) : new a(`Leather error: ${e}`);
  }
}
function d() {
  if (typeof window > "u")
    throw new a("Cannot call this function outside a browser");
  return typeof window.LeatherProvider < "u";
}
async function L(r = "mainnet") {
  if (!d())
    throw new l("Leather not installed");
  const t = (await w("getAddresses", {
    network: r
  })).addresses.filter(
    (e) => e.type === c.P2TR || e.type === c.P2WPKH
  ), o = u(t[0].address);
  if (r !== "signet" && o !== r || r === "signet" && o !== "testnet")
    throw new O(
      "Leather network mismatch, please switch it manually"
    );
  return t.map((e) => ({
    publicKey: e.publicKey,
    address: e.address,
    format: P[e.type]
  }));
}
async function g(r, { network: s = "mainnet", paymentType: t }) {
  if (!d())
    throw new l("Leather not installed");
  const { signature: o } = await w(
    "signMessage",
    {
      message: r,
      paymentType: t,
      network: s
    }
  );
  return {
    base64: o,
    hex: b.from(o, "base64").toString("hex")
  };
}
async function R(r, {
  finalize: s = !0,
  extractTx: t = !0,
  allowedSighash: o,
  accountNumber: e,
  network: A = "mainnet",
  signAtIndexes: f = []
} = {}) {
  if (!d())
    throw new l("Leather not installed");
  if (t && !s)
    throw new N();
  const E = r.toHex(), m = await w("signPsbt", {
    hex: E,
    allowedSighash: o,
    account: e,
    network: A,
    signAtIndex: f,
    broadcast: !1
  }), n = y.fromHex(m.hex);
  if (s && f.forEach((i) => {
    try {
      n.finalizeInput(i);
    } catch (p) {
      throw console.error("Sign psbt error", p), new a("Failed to finalize input");
    }
  }), t)
    try {
      return {
        base64: null,
        hex: n.extractTransaction().toHex()
      };
    } catch (i) {
      throw i instanceof Error && i.message === "Not finalized" ? new N() : new a("Failed to extract transaction from PSBT");
    }
  return {
    base64: n.toBase64(),
    hex: n.toHex()
  };
}
export {
  c as LeatherAddressType,
  Y as LeatherSignatureHash,
  L as getAddresses,
  d as isInstalled,
  g as signMessage,
  R as signPsbt
};
