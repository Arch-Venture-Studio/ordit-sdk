import { getWallets as f } from "@wallet-standard/core";
import { s as u, W as o, a as g, b as w } from "./index-Di_-HtFi.js";
import { B as l } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
import { O as m, B as a } from "./index-evOerbxh.js";
async function r() {
  const { get: t } = f(), e = t().find(
    (n) => {
      var i, d;
      return n.name === "Magic Eden" && ((d = (i = n.features["sats-connect:"]) == null ? void 0 : i.provider) == null ? void 0 : d.isMagicEden) === !0;
    }
  );
  if (!e)
    throw new a("Magic Eden Wallet not installed");
  return e.features["sats-connect:"].provider;
}
async function c() {
  if (typeof window > "u")
    throw new m("Cannot call this function outside a browser");
  try {
    const t = await r();
    return t.isMagicEden !== void 0 && t.isMagicEden === !0;
  } catch (t) {
    if (t instanceof a)
      return !1;
    throw t;
  }
}
async function h(t = "mainnet") {
  if (!c())
    throw new a("Magic Eden Wallet not installed");
  if (t !== "mainnet")
    throw new l(
      "Magic Eden Wallet only supports mainnet"
    );
  return u(
    r,
    o.MAGICEDEN,
    t
  );
}
async function y(t, {
  finalize: s = !0,
  extractTx: e = !0,
  network: n,
  inputsToSign: i
} = { network: "mainnet", inputsToSign: [] }) {
  if (!c())
    throw new a("Magic Eden Wallet not installed");
  if (n !== "mainnet")
    throw new l(
      "Magic Eden Wallet only supports mainnet"
    );
  return g(
    r,
    t,
    o.MAGICEDEN,
    {
      finalize: s,
      extractTx: e,
      network: n,
      inputsToSign: i
    }
  );
}
async function C(t, s, e = "mainnet") {
  if (!c())
    throw new a("Magic Eden Wallet not installed");
  if (e !== "mainnet")
    throw new l(
      "Magic Eden Wallet only supports mainnet"
    );
  return w(
    r,
    t,
    s,
    o.MAGICEDEN,
    e
  );
}
export {
  h as getAddresses,
  c as isInstalled,
  C as signMessage,
  y as signPsbt
};
