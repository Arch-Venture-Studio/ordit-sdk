import { O as n, g as m, b as l, a as f, B as u } from "./index-evOerbxh.js";
import { Psbt as p } from "bitcoinjs-lib";
import { B as g } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
function b() {
  if (typeof window > "u")
    throw new n("Cannot call this function outside a browser");
  return typeof window.phantom < "u";
}
function w(e = "mainnet") {
  if (!b())
    throw new u("Phantom Wallet not installed");
  if (e !== "mainnet")
    throw new g(
      "Phantom Wallet only supports mainnet"
    );
}
async function E(e = "mainnet") {
  w(e);
  const s = await window.phantom.bitcoin.requestAccounts(), o = [], t = [];
  if (s.forEach((r) => {
    t.push(r.purpose);
    const a = m(r.address, e);
    if (r.purpose === "ordinals" && a !== "taproot")
      throw new n("No taproot address found");
    o.push({
      publicKey: r.publicKey,
      address: r.address,
      format: a
    });
  }), !t.includes("ordinals"))
    throw new n("No taproot address found");
  return o;
}
async function P(e, s, o = "mainnet") {
  w(o);
  try {
    const { signature: t } = await window.phantom.bitcoin.signMessage(
      s,
      new TextEncoder().encode(e)
    );
    return {
      hex: l.from(t).toString("hex"),
      base64: l.from(t).toString("base64")
    };
  } catch (t) {
    throw console.error("Sign message error", t), new n("Failed to sign message with Phantom Wallet");
  }
}
async function F(e, {
  finalize: s = !0,
  extractTx: o = !0,
  network: t,
  inputsToSign: r
} = { network: "mainnet", inputsToSign: [] }) {
  if (w(t), o && !s)
    throw new f();
  let a, i;
  try {
    a = await window.phantom.bitcoin.signPSBT(
      l.from(e.toHex(), "hex"),
      {
        inputsToSign: r
      }
    ), i = p.fromBuffer(l.from(a));
  } catch {
    throw new n("Failed to sign psbt with Phantom Wallet");
  }
  if (s && r.forEach((d) => {
    d.signingIndexes.forEach((c) => {
      try {
        i.finalizeInput(c);
      } catch (h) {
        throw console.error("Sign psbt error", h), new n("Failed to finalize input");
      }
    });
  }), o)
    try {
      return {
        base64: null,
        hex: i.extractTransaction().toHex()
      };
    } catch (d) {
      throw d instanceof Error && d.message === "Not finalized" ? new f() : new n("Failed to extract transaction from PSBT");
    }
  return {
    hex: i.toHex(),
    base64: i.toBase64()
  };
}
export {
  E as getAddresses,
  b as isInstalled,
  P as signMessage,
  F as signPsbt
};
