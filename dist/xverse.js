import { s as d, W as i, a as w, b as f } from "./index-Di_-HtFi.js";
import { O as u, B as n } from "./index-evOerbxh.js";
function t() {
  var e;
  if (typeof window > "u")
    throw new u("Cannot call this function outside a browser");
  return typeof ((e = window.XverseProviders) == null ? void 0 : e.BitcoinProvider) < "u";
}
async function o() {
  if (!t())
    throw new n("Xverse not installed");
  return window.XverseProviders.BitcoinProvider;
}
async function X(e = "mainnet") {
  if (!t())
    throw new n("Xverse not installed");
  return d(
    o,
    i.XVERSE,
    e
  );
}
async function g(e, {
  finalize: r = !0,
  extractTx: s = !0,
  network: a,
  inputsToSign: l
} = { network: "mainnet", inputsToSign: [] }) {
  if (!t())
    throw new n("Xverse not installed");
  return w(
    o,
    e,
    i.XVERSE,
    {
      finalize: r,
      extractTx: s,
      network: a,
      inputsToSign: l
    }
  );
}
async function E(e, r, s = "mainnet") {
  if (!t())
    throw new n("Xverse not installed");
  return f(
    o,
    e,
    r,
    i.XVERSE,
    s
  );
}
export {
  X as getAddresses,
  t as isInstalled,
  E as signMessage,
  g as signPsbt
};
