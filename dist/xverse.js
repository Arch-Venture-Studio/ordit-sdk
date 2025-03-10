import { O as d, B as n } from "./index-evOerbxh.js";
import { s as l, a as w, b as f } from "./index-BjHduQfZ.js";
function t() {
  var e;
  if (typeof window > "u")
    throw new d("Cannot call this function outside a browser");
  return typeof ((e = window.XverseProviders) == null ? void 0 : e.BitcoinProvider) < "u";
}
async function i() {
  if (!t())
    throw new n("Xverse not installed");
  return window.XverseProviders.BitcoinProvider;
}
async function v(e = "mainnet") {
  if (!t())
    throw new n("Xverse not installed");
  return l(i, e);
}
async function g(e, {
  finalize: r = !0,
  extractTx: s = !0,
  network: o,
  inputsToSign: a
} = { network: "mainnet", inputsToSign: [] }) {
  if (!t())
    throw new n("Xverse not installed");
  return w(i, e, {
    finalize: r,
    extractTx: s,
    network: o,
    inputsToSign: a
  });
}
async function m(e, r, s = "mainnet") {
  if (!t())
    throw new n("Xverse not installed");
  return f(
    i,
    e,
    r,
    s
  );
}
export {
  v as getAddresses,
  t as isInstalled,
  m as signMessage,
  g as signPsbt
};
