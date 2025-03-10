import { O as s, g as m, b as l, a as h, B as p } from "./index-evOerbxh.js";
import { Psbt as g } from "bitcoinjs-lib";
import { B as b } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
function x() {
  if (typeof window > "u")
    throw new s("Cannot call this function outside a browser");
  return typeof window.phantom < "u";
}
function w(e = "mainnet") {
  if (!x())
    throw new p("Phantom Wallet not installed");
  if (e !== "mainnet")
    throw new b(
      "Phantom Wallet only supports mainnet"
    );
}
async function P(e = "mainnet") {
  w(e);
  const i = await window.phantom.bitcoin.requestAccounts(), r = [], t = [];
  if (i.forEach((o) => {
    t.push(o.purpose);
    const a = m(o.address, e);
    if (o.purpose === "ordinals" && a !== "taproot")
      throw new s("No taproot address found");
    r.push({
      publicKey: o.publicKey,
      address: o.address,
      format: a
    });
  }), !t.includes("ordinals"))
    throw new s("No taproot address found");
  return r;
}
async function S(e, i, r = "mainnet") {
  w(r);
  try {
    const { signature: t } = await window.phantom.bitcoin.signMessage(
      i,
      new TextEncoder().encode(e)
    );
    return {
      hex: l.from(t).toString("hex"),
      base64: l.from(t).toString("base64")
    };
  } catch (t) {
    throw console.error("Sign message error", t), new s("Failed to sign message with Phantom Wallet");
  }
}
async function F(e, {
  finalize: i = !0,
  extractTx: r = !0,
  network: t,
  inputsToSign: o
} = { network: "mainnet", inputsToSign: [] }) {
  if (w(t), r && !i)
    throw new h();
  const a = [];
  o.forEach((n) => {
    const { signingIndexes: f } = n;
    f.forEach(() => {
      a.push(n);
    });
  });
  let c, d;
  try {
    c = await window.phantom.bitcoin.signPSBT(
      l.from(e.toHex(), "hex"),
      {
        inputsToSign: a
      }
    ), d = g.fromBuffer(l.from(c));
  } catch {
    throw new s("Failed to sign psbt with Phantom Wallet");
  }
  if (i && a.forEach((n, f) => {
    try {
      d.finalizeInput(f);
    } catch (u) {
      throw console.error("Sign psbt error", u), new s("Failed to finalize input");
    }
  }), r)
    try {
      return {
        base64: null,
        hex: d.extractTransaction().toHex()
      };
    } catch (n) {
      throw n instanceof Error && n.message === "Not finalized" ? new h() : new s("Failed to extract transaction from PSBT");
    }
  return {
    hex: d.toHex(),
    base64: d.toBase64()
  };
}
export {
  P as getAddresses,
  x as isInstalled,
  S as signMessage,
  F as signPsbt
};
