var mt = Object.defineProperty;
var at = (i) => {
  throw TypeError(i);
};
var bt = (i, t, e) => t in i ? mt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var h = (i, t, e) => bt(i, typeof t != "symbol" ? t + "" : t, e), ht = (i, t, e) => t.has(i) || at("Cannot " + e);
var a = (i, t, e) => (ht(i, t, "read from private field"), e ? e.call(i) : t.get(i)), l = (i, t, e) => t.has(i) ? at("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), p = (i, t, e, s) => (ht(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e);
import * as It from "@bitcoinerlab/secp256k1";
import { Transaction as st, Psbt as it, initEccLib as St } from "bitcoinjs-lib";
import { U as Tt, O as f, o as ut, d as Y, M as yt, e as ct, f as At, b as v, C as Ot, t as lt, h as wt, I as xt, i as K, j as et, k as vt } from "./index-evOerbxh.js";
import { n as Jt, A as Zt, a as Qt, B as te, g as ee, l as se, m as ie, c as ne, v as re } from "./index-evOerbxh.js";
import { B as ae } from "./BrowserWalletNetworkMismatchError-D_4WJV6I.js";
import { B as ue, a as ce } from "./BrowserWalletSigningError-DZ1iTdsv.js";
import pt from "cross-fetch";
import Ut from "buffer-reverse";
class Et {
  constructor({ chain: t = "bitcoin", network: e }) {
    h(this, "chain");
    h(this, "network");
    this.chain = t, this.network = e;
  }
}
class G {
  /**
   * Parses an inscription.
   *
   * @param inscription Inscription
   * @param options Options
   * - `decodeMetadata` decodes the metadata object into [valid URI components](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent).
   * @returns Parsed inscription
   */
  static parseInscription(t, { decodeMetadata: e }) {
    return {
      ...t,
      meta: e && t.meta ? Tt(t.meta) : t.meta
    };
  }
  /**
   * Parses inscriptions.
   *
   * @param inscriptions Inscriptions
   * @param options Options
   * - `decodeMetadata` decodes the metadata object into [valid URI components](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent).
   * @returns Parsed inscriptions
   */
  static parseInscriptions(t, { decodeMetadata: e }) {
    return t.map(
      (s) => this.parseInscription(s, { decodeMetadata: e })
    );
  }
  static segregateUTXOsBySpendStatus({
    utxos: t
  }) {
    const { spendableUTXOs: e, unspendableUTXOs: s } = t.reduce(
      (n, r) => (r.safeToSpend ? n.spendableUTXOs.push(r) : n.unspendableUTXOs.push(r), n),
      {
        spendableUTXOs: [],
        unspendableUTXOs: []
      }
    );
    return {
      totalUTXOs: t.length,
      spendableUTXOs: e,
      unspendableUTXOs: s
    };
  }
}
const I = {
  version: "0.0.0.10",
  apis: {
    bitcoin: {
      mainnet: "https://mainnet.ordit.io/",
      regtest: "https://regtest.ordit.io/",
      testnet: "https://testnet.ordit.io/",
      signet: "https://signet.ordit.io/"
    },
    "fractal-bitcoin": {
      mainnet: "https://fractal.ordit.io/",
      regtest: "https://fractal-regtest.ordit.io/",
      // unused
      testnet: "https://fractal-testnet.ordit.io/",
      signet: "https://fractal-signet.ordit.io/"
      // unused
    }
  }
};
function Nt(i) {
  return typeof i == "number" && i > Number.NEGATIVE_INFINITY && i < Number.POSITIVE_INFINITY;
}
function Mt(i) {
  return Nt(i) && i % 1 === 0;
}
function Pt(i) {
  return typeof i == "string";
}
function jt(i) {
  return Pt(i) || Mt(i) || i === null;
}
function S(i) {
  return i[i.length - 1] === "/" ? i.substring(0, i.length - 1) : i;
}
class T {
  constructor(t) {
    this.url = t;
  }
  /**
   * Send a JSON-RPC 2.0 notification to the connected Sado compliant server.
   *
   * @param method - Method to call.
   * @param params - JSON-RPC 2.0 parameters.
   */
  async notify(t, e) {
    await pt(`${this.url}/rpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: t,
        params: e
      })
    });
  }
  async call(t, e, s) {
    let n = {}, r = s;
    jt(e) ? r = e : n = e;
    const u = await pt(`${this.url}/rpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: t,
        params: n,
        id: r
      })
    });
    if (u.status === 200) {
      const c = await u.json();
      if (c.error) {
        const d = typeof c.error.data == "string" ? c.error.data : c.error.message;
        throw new f(d);
      }
      return c.result;
    }
    throw new f("Internal Server Error");
  }
}
const w = {
  get id() {
    return Math.floor(Math.random() * 1e5);
  },
  bitcoin: {
    mainnet: new T(S(I.apis.bitcoin.mainnet)),
    testnet: new T(S(I.apis.bitcoin.testnet)),
    signet: new T(S(I.apis.bitcoin.signet)),
    regtest: new T(S(I.apis.bitcoin.regtest))
  },
  "fractal-bitcoin": {
    mainnet: new T(S(I.apis["fractal-bitcoin"].mainnet)),
    testnet: new T(S(I.apis["fractal-bitcoin"].testnet)),
    // unused
    signet: new T(S(I.apis["fractal-bitcoin"].testnet)),
    regtest: new T(S(I.apis["fractal-bitcoin"].testnet))
  }
};
class ft extends Et {
  constructor({ chain: t = "bitcoin", network: e }) {
    super({ chain: t, network: e });
  }
  async getBalance({ address: t }) {
    if (!t)
      throw new f("Invalid request");
    return w[this.chain][this.network].call(
      "Address.GetBalance",
      { address: t },
      w.id
    );
  }
  async getInscription({
    id: t,
    decodeMetadata: e = !1
  }) {
    if (!t)
      throw new f("Invalid request");
    const s = ut(t), n = await w[this.chain][this.network].call(
      "Ordinals.GetInscription",
      { id: s },
      w.id
    );
    return G.parseInscription(n, { decodeMetadata: e });
  }
  async getInscriptionUTXO({ id: t }) {
    if (!t)
      throw new f("Invalid request");
    const e = ut(t);
    return w[this.chain][this.network].call(
      "Ordinals.GetInscriptionUtxo",
      { id: e },
      w.id
    );
  }
  async getInscriptions({
    creator: t,
    owner: e,
    mimeType: s,
    mimeSubType: n,
    outpoint: r,
    decodeMetadata: u = !1,
    sort: c = "asc",
    limit: d = 25,
    next: m = null
  }) {
    let g = [], b = m;
    do {
      const { inscriptions: D, pagination: tt } = await w[this.chain][this.network].call(
        "Ordinals.GetInscriptions",
        {
          filter: { creator: t, owner: e, mimeType: s, mimeSubType: n, outpoint: r },
          sort: { number: c },
          pagination: { limit: d, next: b }
        },
        w.id
      );
      g = g.concat(D), b = tt.next;
    } while (b !== null);
    return G.parseInscriptions(g, {
      decodeMetadata: u
    });
  }
  async getSpendables({
    address: t,
    value: e,
    rarity: s = ["common"],
    filter: n = [],
    limit: r = 200,
    type: u = "spendable"
  }) {
    if (!t || Number.isNaN(e) || !e)
      throw new f("Invalid request");
    return w[this.chain][this.network].call(
      "Address.GetSpendables",
      {
        address: t,
        value: e,
        safetospend: u === "spendable",
        allowedrarity: s,
        filter: n,
        limit: r
      },
      w.id
    );
  }
  async getTransaction({
    txId: t,
    ordinals: e = !0,
    hex: s = !1,
    witness: n = !0,
    decodeMetadata: r = !0
  }) {
    if (!t)
      throw new f("Invalid request");
    const u = await w[this.chain][this.network].call(
      "Transactions.GetTransaction",
      {
        txid: t,
        options: {
          ord: e,
          hex: s,
          witness: n
        }
      },
      w.id
    );
    return u.vout = u.vout.map((c) => ({
      ...c,
      inscriptions: G.parseInscriptions(c.inscriptions, {
        decodeMetadata: r
      })
    })), {
      tx: u,
      rawTx: s && u.hex ? st.fromHex(u.hex) : void 0
    };
  }
  async getUnspents({
    address: t,
    type: e = "spendable",
    rarity: s = ["common"],
    sort: n = "desc",
    limit: r = 50,
    next: u = null
  }) {
    if (!t)
      throw new f("Invalid request");
    let c = [], d = u;
    do {
      const { unspents: m, pagination: g } = await w[this.chain][this.network].call(
        "Address.GetUnspents",
        {
          address: t,
          options: {
            allowedrarity: s,
            safetospend: e === "spendable"
          },
          pagination: {
            limit: r,
            next: d
          },
          sort: { value: n }
        },
        w.id
      );
      c = c.concat(m), d = g.next;
    } while (d !== null);
    return G.segregateUTXOsBySpendStatus({ utxos: c });
  }
  async relay({ hex: t, maxFeeRate: e, validate: s = !0 }) {
    if (!t)
      throw new f("Invalid request");
    if (e && (e < 0 || Number.isNaN(e)))
      throw new f("Invalid max fee rate");
    return w[this.chain][this.network].call(
      "Transactions.Relay",
      { hex: t, maxFeeRate: e, validate: s },
      w.id
    );
  }
}
const Bt = 1e8, $ = 21e4, nt = 2016, gt = 6, U = 209999999769e4, kt = U - 1;
class rt {
  constructor(t, e) {
    this.height = t, this.offset = e;
  }
  static from(t) {
    return new rt(t.height, t.third);
  }
  toString() {
    return `${this.height.n}.${this.offset}`;
  }
}
class Xt {
  constructor(t) {
    /**
     * A° - Index of Sat in the Block
     */
    h(this, "hour");
    /**
     * B′ - Index of the Block in the Difficulty Adjustment Period (every 2016 blocks)
     */
    h(this, "minute");
    /**
     * C″ - Index of Block in Halving Epoch (every 210_000 blocks)
     */
    h(this, "second");
    /**
     * D‴ - Cycle Number
     */
    h(this, "third");
    const e = t.height.n;
    this.hour = Math.floor(e / (gt * $)), this.minute = Math.floor(e % $), this.second = Math.floor(e % nt), this.third = t.third;
  }
  toString() {
    return `${this.hour}°${this.minute}′${this.second}″${this.third}‴`;
  }
}
var O = /* @__PURE__ */ ((i) => (i.Common = "common", i.Uncommon = "uncommon", i.Rare = "rare", i.Epic = "epic", i.Legendary = "legendary", i.Mythic = "mythic", i.Palindrome = "palindrome", i))(O || {});
class W {
  constructor(t) {
    this.sattributes = t;
  }
  static from(t) {
    const e = [];
    return W.isPalindrome(t.n) && e.push(
      "palindrome"
      /* Palindrome */
    ), new W([t.rarity.name, ...e]);
  }
  static isPalindrome(t) {
    const e = t.toString(), s = e.split("").reverse().join("");
    return e === s;
  }
  toString() {
    return this.sattributes.toString();
  }
  toList() {
    return this.sattributes;
  }
}
class y {
  constructor(t) {
    this.name = t;
  }
  static from(t) {
    const { hour: e, minute: s, second: n, third: r } = t.degree;
    return e === 0 && s === 0 && n === 0 && r === 0 ? new y(O.Mythic) : s === 0 && n === 0 && r === 0 ? new y(O.Legendary) : s === 0 && r === 0 ? new y(O.Epic) : n === 0 && r === 0 ? new y(O.Rare) : r === 0 ? new y(O.Uncommon) : new y(O.Common);
  }
  toString() {
    return this.name;
  }
}
var E, N, M, P, j, B, k, X, R, C, z, H;
const ot = class ot {
  constructor(t) {
    l(this, E);
    l(this, N);
    l(this, M);
    l(this, P);
    l(this, j);
    l(this, B);
    l(this, k);
    l(this, X);
    l(this, R);
    l(this, C);
    l(this, z);
    l(this, H);
    if (this.n = t, t > U || t < 0)
      throw new Error("sat out of range");
  }
  static fromName(t) {
    let e = 0;
    for (let s = 0; s < t.length; s += 1) {
      const n = t[s];
      if (n >= "a" && n <= "z")
        e = e * 26 + n.charCodeAt(0) - 97 + 1;
      else
        throw new Error(`invalid character in sat name: ${n}`);
    }
    if (e > U)
      throw new Error("sat name out of range");
    return new ot(U - e);
  }
  get height() {
    return a(this, E) === void 0 && p(this, E, new J(
      Math.floor(
        this.epoch.startingHeight.n + this.epochPosition / this.epoch.subsidy
      )
    )), a(this, E);
  }
  get cycle() {
    return a(this, N) === void 0 && p(this, N, Math.floor(this.epoch.n / gt)), a(this, N);
  }
  get percentile() {
    return a(this, M) === void 0 && p(this, M, `${this.n / kt * 100}%`), a(this, M);
  }
  get degree() {
    return a(this, P) === void 0 && p(this, P, new Xt(this)), a(this, P);
  }
  get third() {
    return a(this, j) === void 0 && p(this, j, Math.floor(this.epochPosition % this.epoch.subsidy)), a(this, j);
  }
  get epoch() {
    return a(this, B) === void 0 && p(this, B, Z.from(this)), a(this, B);
  }
  get period() {
    return a(this, k) === void 0 && p(this, k, Math.floor(this.height.n / nt)), a(this, k);
  }
  get rarity() {
    return a(this, X) === void 0 && p(this, X, y.from(this)), a(this, X);
  }
  get epochPosition() {
    return a(this, R) === void 0 && p(this, R, Math.floor(this.n - this.epoch.startingSat.n)), a(this, R);
  }
  get decimal() {
    return a(this, C) === void 0 && p(this, C, rt.from(this)), a(this, C);
  }
  get name() {
    if (a(this, z) === void 0) {
      let t = U - this.n, e = "";
      for (; t > 0; )
        e += "abcdefghijklmnopqrstuvwxyz".charAt((t - 1) % 26), t = Math.floor((t - 1) / 26);
      p(this, z, e.split("").reverse().join(""));
    }
    return a(this, z);
  }
  get sattributes() {
    return a(this, H) === void 0 && p(this, H, W.from(this)), a(this, H);
  }
  toJSON() {
    return {
      number: this.n,
      decimal: this.decimal.toString(),
      degree: this.degree.toString(),
      name: this.name,
      block: this.height.n,
      cycle: this.cycle,
      epoch: this.epoch.n,
      period: this.period,
      offset: this.third,
      rarity: this.rarity.toString(),
      percentile: this.percentile,
      sattributes: this.sattributes.toList()
    };
  }
};
E = new WeakMap(), N = new WeakMap(), M = new WeakMap(), P = new WeakMap(), j = new WeakMap(), B = new WeakMap(), k = new WeakMap(), X = new WeakMap(), R = new WeakMap(), C = new WeakMap(), z = new WeakMap(), H = new WeakMap();
let o = ot;
const V = [
  new o(0),
  // epoch 1 - 2009
  new o(105e13),
  // epoch 2 - 2012
  new o(1575e12),
  // epoch 3 - 2016
  new o(18375e11),
  // epoch 4 - 2020
  new o(196875e10),
  // epoch 5 - 2024
  new o(2034375e9),
  new o(20671875e8),
  new o(208359375e7),
  new o(2091796875e6),
  new o(20958984375e5),
  new o(209794921875e4),
  new o(209897460927e4),
  new o(209948730453e4),
  new o(209974365216e4),
  new o(209987182587e4),
  new o(209993591262e4),
  new o(209996795589e4),
  new o(209998397742e4),
  new o(209999198808e4),
  new o(209999599341e4),
  new o(209999799597e4),
  new o(209999899725e4),
  new o(209999949789e4),
  new o(209999974821e4),
  new o(209999987337e4),
  new o(209999993595e4),
  new o(209999996724e4),
  new o(209999998278e4),
  new o(209999999055e4),
  new o(209999999433e4),
  new o(209999999622e4),
  new o(209999999706e4),
  new o(209999999748e4),
  new o(U)
];
var _, F;
const Q = class Q {
  constructor(t) {
    l(this, _);
    l(this, F);
    this.n = t;
  }
  get startingSat() {
    if (a(this, _) === void 0) {
      const t = Z.fromHeight(this), { startingSat: e } = t, { startingHeight: s } = t;
      p(this, _, new o(
        e.n + (this.n - s.n) * t.subsidy
      ));
    }
    return a(this, _);
  }
  get periodOffset() {
    return a(this, F) === void 0 && p(this, F, Math.floor(this.n % nt)), a(this, F);
  }
  add(t) {
    return new Q(this.n + t);
  }
  sub(t) {
    return new Q(this.n - t);
  }
  eq(t) {
    return this.n === t;
  }
};
_ = new WeakMap(), F = new WeakMap();
let J = Q;
var x, L, q;
const A = class A {
  constructor(t) {
    l(this, x);
    l(this, L);
    l(this, q);
    this.n = t;
  }
  static from(t) {
    let e = 1;
    for (; e <= 33; ) {
      if (t.n < V[e].n)
        return new A(e - 1);
      e += 1;
    }
    return new A(33);
  }
  static fromHeight(t) {
    return new A(Math.floor(t.n / $));
  }
  /**
   * subsidy refers to how much satoshis will be created/mined per block
   */
  get subsidy() {
    return a(this, x) === void 0 && (this.n < A.FIRST_POST_SUBSIDY.n ? p(this, x, Math.floor(50 * Bt / 2 ** this.n)) : p(this, x, 0)), a(this, x);
  }
  get startingSat() {
    return a(this, L) === void 0 && p(this, L, V[this.n] || V[V.length - 1]), a(this, L);
  }
  get startingHeight() {
    return a(this, q) === void 0 && p(this, q, new J(this.n * $)), a(this, q);
  }
};
x = new WeakMap(), L = new WeakMap(), q = new WeakMap(), /**
 * First epoch where no new bitcoin will be mined
 */
h(A, "FIRST_POST_SUBSIDY", new A(33));
let Z = A;
const Rt = 10.5;
function dt(i) {
  switch (i) {
    case "taproot":
      return { input: 42, output: 43, witness: 66 };
    // witness size is different for non-default sigHash
    case "segwit":
      return { input: 41, output: 31, witness: 105 };
    case "p2sh-p2wpkh":
      return { input: 64, output: 32, witness: 105 };
    case "legacy":
      return { input: 148, output: 34, witness: 0 };
    default:
      throw new f("Invalid type");
  }
}
class Ct {
  constructor({
    feeRate: t,
    chain: e = "bitcoin",
    network: s,
    psbt: n,
    witness: r
  }) {
    /**
     * Fee in satoshis
     */
    h(this, "fee", 0);
    /**
     * Fee rate in satoshis
     */
    h(this, "feeRate");
    h(this, "chain");
    h(this, "network");
    h(this, "psbt");
    h(this, "witness", []);
    h(this, "virtualSize", 0);
    h(this, "weight", 0);
    if (t < 0 || !Number.isSafeInteger(t))
      throw new f("Invalid feeRate");
    this.feeRate = t, this.chain = e, this.network = s, this.witness = r || [], this.psbt = n || new it({
      network: Y(
        e === "fractal-bitcoin" ? "mainnet" : this.network
      )
    });
  }
  get data() {
    return {
      fee: this.fee,
      virtualSize: this.virtualSize,
      weight: this.weight
    };
  }
  /**
   * Calculates network fee based on virtual size of transaction and fee rate.
   *
   * @returns Estimated network fee
   * @throws {OrditSDKError} Fee is above MAXIMUM_FEE (5,000,000 satoshis)
   */
  calculateNetworkFee() {
    if (this.fee = this.calculateVirtualSize() * this.feeRate, this.fee > yt)
      throw new f("Error while calculating fees");
    return this.fee;
  }
  getInputAndOutputScriptTypes() {
    const { inputs: t } = this.psbt.data, e = this.psbt.txOutputs;
    if (t.length === 0)
      throw new f("PSBT must have at least one input");
    if (e.length === 0)
      throw new f("PSBT must have at least one output");
    return {
      inputTypes: t.map((s) => {
        const n = s.witnessUtxo && s.witnessUtxo.script ? s.witnessUtxo.script : null;
        if (!n)
          throw new f("Invalid script");
        return ct(n, this.network).format;
      }),
      outputTypes: e.map(
        (s) => ct(s.script, this.network).format
      )
    };
  }
  calculateScriptWitnessSize() {
    var e;
    const { inputTypes: t } = this.getInputAndOutputScriptTypes();
    return t.includes("taproot") && ((e = this.witness) != null && e.length) ? this.witness.reduce((s, n) => s + n.byteLength, 0) : 0;
  }
  getBaseSize() {
    var d, m;
    const { inputTypes: t, outputTypes: e } = this.getInputAndOutputScriptTypes(), s = 2, n = t.reduce(
      (g, b) => {
        const { input: D, witness: tt } = dt(b);
        return g.input += D, g.witness += tt, g;
      },
      {
        input: 0,
        witness: 0
      }
    ), r = e.reduce((g, b) => {
      const { output: D } = dt(b);
      return g + D;
    }, 0), u = n.witness + ((d = this.witness) != null && d.length ? this.calculateScriptWitnessSize() : 0);
    let c = 0;
    return (m = this.witness) != null && m.length ? c = u : u > 0 && (c = s + u), {
      baseSize: n.input + Rt + r,
      witnessSize: c
    };
  }
  calculateVirtualSize() {
    const { baseSize: t, witnessSize: e } = this.getBaseSize();
    return this.weight = t * 3 + (t + e), this.virtualSize = Math.ceil(this.weight / 4), this.virtualSize;
  }
}
function zt({
  utxo: i,
  pubKey: t,
  network: e,
  sighashType: s,
  witness: n
}) {
  const r = At.fromPublicKey(
    v.from(t, "hex"),
    Ot,
    Y(e)
  ), u = lt(r.publicKey);
  if (!i.scriptPubKey.hex)
    throw new Error("Unable to process p2tr input");
  return {
    type: "taproot",
    hash: i.txid,
    index: i.n,
    tapInternalKey: u,
    witnessUtxo: {
      script: v.from(i.scriptPubKey.hex, "hex"),
      value: i.sats
    },
    witness: n,
    ...s ? { sighashType: s } : void 0
  };
}
function Ht({
  utxo: i,
  sighashType: t
}) {
  if (!i.scriptPubKey.hex)
    throw new Error("Unable to process Segwit input");
  return {
    type: "segwit",
    hash: i.txid,
    index: i.n,
    witnessUtxo: {
      script: v.from(i.scriptPubKey.hex, "hex"),
      value: i.sats
    },
    ...t ? { sighashType: t } : void 0
  };
}
function _t({
  utxo: i,
  pubKey: t,
  network: e,
  sighashType: s
}) {
  const n = wt(v.from(t, "hex"), "p2sh", e);
  if (!n || !n.output || !n.redeem)
    throw new Error("Unable to process P2SH input");
  return {
    type: "p2sh-p2wpkh",
    hash: i.txid,
    index: i.n,
    redeemScript: n.redeem.output,
    witnessUtxo: {
      script: v.from(i.scriptPubKey.hex, "hex"),
      value: i.sats
    },
    ...s ? { sighashType: s } : void 0
  };
}
async function Ft({
  utxo: i,
  sighashType: t,
  network: e,
  pubKey: s,
  datasource: n
}) {
  const { rawTx: r } = await n.getTransaction({
    txId: i.txid,
    hex: !0
  });
  if (!r)
    throw new Error("Unable to process legacy input");
  const u = wt(v.from(s, "hex"), "p2pkh", e);
  return {
    type: "legacy",
    hash: i.txid,
    index: i.n,
    nonWitnessUtxo: r == null ? void 0 : r.toBuffer(),
    witnessUtxo: {
      script: u.output,
      value: i.sats
    },
    ...t ? { sighashType: t } : void 0
  };
}
async function Lt({
  utxo: i,
  pubKey: t,
  network: e,
  sighashType: s,
  witness: n,
  datasource: r
}) {
  const u = r || new ft({ network: e });
  switch (i.scriptPubKey.type) {
    case "witness_v1_taproot":
      return zt({
        utxo: i,
        pubKey: t,
        network: e,
        sighashType: s,
        witness: n
      });
    case "witness_v0_scripthash":
    case "witness_v0_keyhash":
      return Ht({ utxo: i, sighashType: s });
    case "scripthash":
      return _t({ utxo: i, pubKey: t, network: e, sighashType: s });
    case "pubkeyhash":
      return Ft({
        utxo: i,
        sighashType: s,
        network: e,
        pubKey: t,
        datasource: u
      });
    default:
      throw new Error("invalid script pub type");
  }
}
class Yt extends Ct {
  constructor({
    address: e,
    changeAddress: s,
    datasource: n,
    feeRate: r,
    chain: u = "bitcoin",
    network: c = "mainnet",
    publicKey: d,
    outputs: m,
    autoAdjustment: g = !0,
    instantTradeMode: b = !1
  }) {
    super({
      feeRate: r,
      chain: u,
      network: c
    });
    h(this, "address");
    h(this, "changeAddress");
    /**
     * Change amount in satoshis
     */
    h(this, "changeAmount", 0);
    h(this, "datasource");
    h(this, "injectableInputs", []);
    h(this, "injectableOutputs", []);
    /**
     * Input amount in satoshis
     */
    h(this, "inputAmount", 0);
    h(this, "inputs", []);
    /**
     * Output amount in satoshis
     */
    h(this, "outputAmount", 0);
    h(this, "outputs", []);
    h(this, "psbt");
    h(this, "publicKey");
    /**
     * Replace-by-fee (RBF) is a feature that allows users to replace one version of an unconfirmed transaction
     * with a different version of the transaction that pays a higher transaction fee.
     * This can be done multiple times while the transaction is unconfirmed.
     *
     * Reference: [BIP-125](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
     */
    h(this, "rbf", !0);
    h(this, "utxos", []);
    h(this, "usedUTXOs", []);
    /**
     * Enable auto adjustment.
     *
     * When `true`, change is calculated and UTXOs will be added as required to account for network fees.
     *
     * Otherwise, change is not calculated and no UTXOs will be added.
     */
    h(this, "autoAdjustment");
    h(this, "instantTradeMode");
    h(this, "noMoreUTXOS", !1);
    this.address = e, this.changeAddress = s, this.datasource = n || new ft({ chain: this.chain, network: this.network }), this.outputs = m, this.publicKey = d, this.autoAdjustment = g, this.instantTradeMode = b, this.psbt = new it({
      network: Y(u === "fractal-bitcoin" ? "mainnet" : c)
    });
  }
  get data() {
    return {
      fee: this.fee,
      virtualSize: this.virtualSize,
      weight: this.weight,
      changeAmount: this.changeAmount,
      inputAmount: this.inputAmount,
      outputAmount: this.outputAmount
    };
  }
  toPSBT() {
    return this.psbt;
  }
  toHex() {
    return this.psbt.toHex();
  }
  toBase64() {
    return this.psbt.toBase64();
  }
  /**
   * Set Replace-by-fee (RBF) value
   *
   * Replace-by-fee (RBF) is a feature that allows users to replace one version of an unconfirmed transaction
   * with a different version of the transaction that pays a higher transaction fee.
   * This can be done multiple times while the transaction is unconfirmed.
   *
   * Reference: [BIP-125](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
   */
  setRBF(e) {
    this.rbf = e, this.addInputs();
  }
  /**
   * Gets the x-coordinate of the public key.
   */
  get xKey() {
    return lt(v.from(this.publicKey, "hex")).toString("hex");
  }
  get inputsToSign() {
    const e = this.instantTradeMode && !this.autoAdjustment;
    return this.psbt.txInputs.reduce(
      (s, n, r) => ((!this.instantTradeMode || this.instantTradeMode && r !== xt) && (s.signingIndexes = s.signingIndexes.concat(r)), e && (s.sigHash = // eslint-disable-next-line no-bitwise
      st.SIGHASH_SINGLE | st.SIGHASH_ANYONECANPAY), s),
      {
        address: this.address,
        signingIndexes: []
      }
    );
  }
  initPSBT() {
    this.psbt = new it({
      network: Y(
        this.chain === "fractal-bitcoin" ? "mainnet" : this.network
      )
    }), this.psbt.setMaximumFeeRate(this.feeRate);
  }
  getInputSequence() {
    return this.rbf ? 4294967293 : 4294967295;
  }
  injectInput(e) {
    this.psbt.data.globalMap.unsignedTx.tx.ins[e.injectionIndex] = e.txInput, this.psbt.data.inputs[e.injectionIndex] = e.standardInput;
  }
  injectOutput(e) {
    let s = e.injectionIndex;
    do {
      if (!!!this.psbt.data.globalMap.unsignedTx.tx.outs[s]) {
        this.psbt.data.globalMap.unsignedTx.tx.outs[s] = e.txOutput, this.psbt.data.outputs[s] = // TODO: remove hack
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        e.standardOutput;
        break;
      }
      s += 1;
    } while (s);
  }
  addInputs() {
    const e = this.injectableInputs.map(
      (n) => n.injectionIndex
    ), s = [];
    this.inputs.forEach((n, r) => {
      const u = e.includes(r);
      if (u) {
        const d = this.injectableInputs.find(
          (m) => m.injectionIndex === r
        );
        this.injectInput(d), s.push(d.injectionIndex);
      }
      this.psbt.txInputs.map((d) => {
        const m = Ut(d.hash);
        return K(m.toString("hex"), d.index);
      }).includes(
        K(n.hash, n.index)
      ) || (this.psbt.addInput(n), this.psbt.setInputSequence(
        u ? r + 1 : r,
        this.getInputSequence()
      ));
    }), this.injectableInputs.forEach((n) => {
      s.includes(n.injectionIndex) || (this.injectInput(n), s.push(n.injectionIndex));
    });
  }
  addOutputs() {
    const e = this.injectableOutputs.map((n) => n.injectionIndex), s = [];
    this.outputs.forEach((n, r) => {
      if (e.includes(r)) {
        const u = this.injectableOutputs.find(
          (c) => c.injectionIndex === r
        );
        this.injectOutput(u), s.push(u.injectionIndex);
      }
      this.psbt.addOutput({
        address: n.address,
        value: n.value
      });
    }), this.injectableOutputs.forEach((n) => {
      s.includes(n.injectionIndex) || (this.injectOutput(n), s.push(n.injectionIndex));
    }), this.changeAmount >= et && this.psbt.addOutput({
      address: this.changeAddress || this.address,
      value: this.changeAmount
    });
  }
  calculateOutputAmount() {
    if (this.outputAmount = Math.floor(
      this.outputs.reduce((e, s) => e + s.value, 0) + this.injectableOutputs.reduce((e, s) => e + s.sats, 0)
    ), this.outputAmount < et)
      throw new Error(
        `Output amount too low. Minimum output amount needs to be ${et} sats`
      );
  }
  /**
   * Calculates change amount from transaction and fetches additional UTXOs as required to cover output and network fees, if change is negative.
   */
  async recursivelyCalculateChangeAmount() {
    if (this.autoAdjustment && (this.changeAmount = Math.floor(
      this.inputAmount - this.outputAmount - this.fee
    ), this.changeAmount < 0 && (await this.prepare(), this.noMoreUTXOS)))
      throw new Error(
        `Insufficient balance. Decrease the output amount by ${this.changeAmount * -1} sats`
      );
  }
  getRetrievedUTXOsValue() {
    return this.utxos.reduce((e, s) => e + s.sats, 0);
  }
  getReservedUTXOs() {
    return this.utxos.map(
      (e) => K(e.txid, e.n)
    );
  }
  getUTXOAmountToRequestFromChangeAmount() {
    return this.changeAmount < 0 ? Math.abs(this.changeAmount) : this.outputAmount - this.getRetrievedUTXOsValue();
  }
  /**
   * Retrieves UTXOs using `getSpendables` RPC.
   *
   * @param address Address
   * @param amount Amount in satoshis
   */
  async retrieveUTXOs(e, s) {
    if (!this.autoAdjustment && !e)
      return;
    const n = s && s > 0 ? s : this.getUTXOAmountToRequestFromChangeAmount();
    if (s && this.getRetrievedUTXOsValue() >= s || n <= 0)
      return;
    const r = await this.datasource.getSpendables({
      address: e || this.address,
      value: vt(n),
      filter: this.getReservedUTXOs()
    });
    this.noMoreUTXOS = r.length === 0, this.utxos.push(...r);
  }
  async retrieveSelectedUTXOs(e, s) {
    await this.retrieveUTXOs(e, s);
    const n = this.utxos.find((r) => r.sats >= s);
    return this.utxos = n ? [n] : [], this.utxos;
  }
  /**
   * Prepares inputs from UTXOs.
   */
  async prepareInputs() {
    if (!this.autoAdjustment)
      return;
    const e = [];
    this.utxos.forEach((n) => {
      if (this.usedUTXOs.includes(K(n.txid, n.n)))
        return;
      this.inputAmount += n.sats;
      const r = Lt({
        utxo: n,
        pubKey: this.publicKey,
        network: this.network,
        datasource: this.datasource
      });
      e.push(r);
    });
    const s = await Promise.all(e);
    this.inputAmount += this.injectableInputs.reduce(
      (n, r) => n + r.sats,
      0
    ), s.forEach((n) => {
      const r = K(
        n.hash,
        n.index
      );
      this.usedUTXOs.includes(r) || this.usedUTXOs.push(r);
    }), this.inputs = this.inputs.concat(s);
  }
  /**
   * Prepares PSBT to be set to a network, calculating and validating both inputs and outputs.
   */
  async prepare() {
    this.calculateOutputAmount(), await this.retrieveUTXOs(), await this.prepareInputs(), await this.recursivelyCalculateChangeAmount(), this.process(), await this.recursivelyCalculateChangeAmount(), this.calculateOutputAmount(), this.process();
  }
  /**
   * Initializes PSBT instance, adding all inputs and outputs and calculates network fees.
   *
   * @returns PSBTBuilder instance
   */
  process() {
    return this.initPSBT(), this.addInputs(), this.addOutputs(), this.calculateNetworkFee(), this;
  }
}
St(It);
export {
  Jt as ADDRESS_FORMAT_TO_TYPE,
  Zt as ADDRESS_TYPE_TO_FORMAT,
  Et as BaseDatasource,
  Qt as BrowserWalletExtractTxFromNonFinalizedPsbtError,
  ae as BrowserWalletNetworkMismatchError,
  te as BrowserWalletNotInstalledError,
  ue as BrowserWalletRequestCancelledByUserError,
  ce as BrowserWalletSigningError,
  Bt as COIN_VALUE,
  gt as CYCLE_EPOCHS,
  nt as DIFFCHANGE_INTERVAL,
  G as DatasourceUtility,
  rt as Decimal,
  Xt as Degree,
  Z as Epoch,
  J as Height,
  ft as JsonRpcDatasource,
  kt as LAST_SAT,
  f as OrditSDKError,
  Yt as PSBTBuilder,
  y as Rarity,
  U as SAT_SUPPLY,
  V as STARTING_SATS,
  $ as SUBSIDY_HALVING_INTERVAL,
  o as Sat,
  O as Sattribute,
  W as Sattributes,
  ee as getAddressFormat,
  se as getAddressType,
  ie as getAddressesFromPublicKey,
  ne as getNetworkByAddress,
  re as validateAddress
};
