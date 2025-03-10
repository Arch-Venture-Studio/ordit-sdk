import { O as a, g as d, b as w, a as l, B as c } from "./index-evOerbxh.js";
import { Psbt as f } from "bitcoinjs-lib";
import "./index.js";
import { B as u } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
function m() {
  if (typeof window > "u")
    throw new a("Cannot call this function outside a browser");
  return typeof window.oyl < "u";
}
function i(e = "mainnet") {
  if (!m())
    throw new c("Oyl Wallet not installed");
  if (e !== "mainnet")
    throw new u(
      "Oyl Wallet only supports mainnet"
    );
}
async function p(e = "mainnet") {
  i(e);
  const t = await window.oyl.getAddresses(), o = [];
  if (!t.taproot)
    throw new a("No taproot address found");
  return Object.keys(t).forEach((r) => {
    const s = r;
    o.push({
      publicKey: t[s].publicKey,
      address: t[s].address,
      format: d(t[s].address, e)
    });
  }), o;
}
async function x(e, t, o = "mainnet") {
  i(o);
  try {
    const { signature: r } = await window.oyl.signMessage({
      address: t,
      message: e
    });
    return {
      hex: w.from(r, "base64").toString("hex"),
      base64: r
    };
  } catch (r) {
    throw console.error("Sign message error", r), new a("Failed to sign message with Oyl Wallet");
  }
}
async function B(e, { finalize: t = !0, extractTx: o = !0, network: r } = {
  network: "mainnet"
}) {
  if (i(r), o && !t)
    throw new l();
  let s;
  try {
    const { psbt: n } = await window.oyl.signPsbt({
      psbt: e.toHex(),
      finalize: t,
      broadcast: !1
      // ordit-sdk will not support broadcasting to keep implementation consistent across all wallets
    });
    s = f.fromHex(n);
  } catch {
    throw new a("Failed to sign psbt with Oyl Wallet");
  }
  if (o)
    try {
      return {
        base64: null,
        hex: s.extractTransaction().toHex()
      };
    } catch (n) {
      throw n instanceof Error && n.message === "Not finalized" ? new l() : new a("Failed to extract transaction from PSBT");
    }
  return {
    hex: s.toHex(),
    base64: s.toBase64()
  };
}
export {
  p as getAddresses,
  m as isInstalled,
  x as signMessage,
  B as signPsbt
};
