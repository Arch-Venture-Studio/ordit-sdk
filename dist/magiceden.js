import { getWallets as d } from "@wallet-standard/core";
import { B as o } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
import { O as f, B as a } from "./index-evOerbxh.js";
import { s as u, a as g, b as w } from "./index-BjHduQfZ.js";
async function r() {
  const { get: t } = d(), n = t().find(
    (e) => {
      var i, c;
      return e.name === "Magic Eden" && ((c = (i = e.features["sats-connect:"]) == null ? void 0 : i.provider) == null ? void 0 : c.isMagicEden) === !0;
    }
  );
  if (!n)
    throw new a("Magic Eden Wallet not installed");
  return n.features["sats-connect:"].provider;
}
async function l() {
  if (typeof window > "u")
    throw new f("Cannot call this function outside a browser");
  try {
    const t = await r();
    return t.isMagicEden !== void 0 && t.isMagicEden === !0;
  } catch (t) {
    if (t instanceof a)
      return !1;
    throw t;
  }
}
async function W(t = "mainnet") {
  if (!l())
    throw new a("Magic Eden Wallet not installed");
  if (t !== "mainnet")
    throw new o(
      "Magic Eden Wallet only supports mainnet"
    );
  return u(r, t);
}
async function h(t, {
  finalize: s = !0,
  extractTx: n = !0,
  network: e,
  inputsToSign: i
} = { network: "mainnet", inputsToSign: [] }) {
  if (!l())
    throw new a("Magic Eden Wallet not installed");
  if (e !== "mainnet")
    throw new o(
      "Magic Eden Wallet only supports mainnet"
    );
  return g(r, t, {
    finalize: s,
    extractTx: n,
    network: e,
    inputsToSign: i
  });
}
async function y(t, s, n = "mainnet") {
  if (!l())
    throw new a("Magic Eden Wallet not installed");
  if (n !== "mainnet")
    throw new o(
      "Magic Eden Wallet only supports mainnet"
    );
  return w(
    r,
    t,
    s,
    n
  );
}
export {
  W as getAddresses,
  l as isInstalled,
  y as signMessage,
  h as signPsbt
};
