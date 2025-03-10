import { validate as xr, Network as Xr, getAddressInfo as Y } from "bitcoin-address-validation";
import * as Br from "@bitcoinerlab/secp256k1";
import { BIP32Factory as qr } from "bip32";
import { networks as Q, initEccLib as zr, payments as N } from "bitcoinjs-lib";
import "ecpair";
var Er = {}, j = {};
j.byteLength = Zr;
j.toByteArray = vr;
j.fromByteArray = nt;
var _ = [], R = [], Vr = typeof Uint8Array < "u" ? Uint8Array : Array, v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var $ = 0, Jr = v.length; $ < Jr; ++$)
  _[$] = v[$], R[v.charCodeAt($)] = $;
R[45] = 62;
R[95] = 63;
function mr(c) {
  var s = c.length;
  if (s % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var f = c.indexOf("=");
  f === -1 && (f = s);
  var a = f === s ? 0 : 4 - f % 4;
  return [f, a];
}
function Zr(c) {
  var s = mr(c), f = s[0], a = s[1];
  return (f + a) * 3 / 4 - a;
}
function Qr(c, s, f) {
  return (s + f) * 3 / 4 - f;
}
function vr(c) {
  var s, f = mr(c), a = f[0], l = f[1], p = new Vr(Qr(c, a, l)), y = 0, g = l > 0 ? a - 4 : a, x;
  for (x = 0; x < g; x += 4)
    s = R[c.charCodeAt(x)] << 18 | R[c.charCodeAt(x + 1)] << 12 | R[c.charCodeAt(x + 2)] << 6 | R[c.charCodeAt(x + 3)], p[y++] = s >> 16 & 255, p[y++] = s >> 8 & 255, p[y++] = s & 255;
  return l === 2 && (s = R[c.charCodeAt(x)] << 2 | R[c.charCodeAt(x + 1)] >> 4, p[y++] = s & 255), l === 1 && (s = R[c.charCodeAt(x)] << 10 | R[c.charCodeAt(x + 1)] << 4 | R[c.charCodeAt(x + 2)] >> 2, p[y++] = s >> 8 & 255, p[y++] = s & 255), p;
}
function rt(c) {
  return _[c >> 18 & 63] + _[c >> 12 & 63] + _[c >> 6 & 63] + _[c & 63];
}
function tt(c, s, f) {
  for (var a, l = [], p = s; p < f; p += 3)
    a = (c[p] << 16 & 16711680) + (c[p + 1] << 8 & 65280) + (c[p + 2] & 255), l.push(rt(a));
  return l.join("");
}
function nt(c) {
  for (var s, f = c.length, a = f % 3, l = [], p = 16383, y = 0, g = f - a; y < g; y += p)
    l.push(tt(c, y, y + p > g ? g : y + p));
  return a === 1 ? (s = c[f - 1], l.push(
    _[s >> 2] + _[s << 4 & 63] + "=="
  )) : a === 2 && (s = (c[f - 2] << 8) + c[f - 1], l.push(
    _[s >> 10] + _[s >> 4 & 63] + _[s << 2 & 63] + "="
  )), l.join("");
}
var tr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
tr.read = function(c, s, f, a, l) {
  var p, y, g = l * 8 - a - 1, x = (1 << g) - 1, F = x >> 1, o = -7, A = f ? l - 1 : 0, C = f ? -1 : 1, T = c[s + A];
  for (A += C, p = T & (1 << -o) - 1, T >>= -o, o += g; o > 0; p = p * 256 + c[s + A], A += C, o -= 8)
    ;
  for (y = p & (1 << -o) - 1, p >>= -o, o += a; o > 0; y = y * 256 + c[s + A], A += C, o -= 8)
    ;
  if (p === 0)
    p = 1 - F;
  else {
    if (p === x)
      return y ? NaN : (T ? -1 : 1) * (1 / 0);
    y = y + Math.pow(2, a), p = p - F;
  }
  return (T ? -1 : 1) * y * Math.pow(2, p - a);
};
tr.write = function(c, s, f, a, l, p) {
  var y, g, x, F = p * 8 - l - 1, o = (1 << F) - 1, A = o >> 1, C = l === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, T = a ? 0 : p - 1, P = a ? 1 : -1, H = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
  for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (g = isNaN(s) ? 1 : 0, y = o) : (y = Math.floor(Math.log(s) / Math.LN2), s * (x = Math.pow(2, -y)) < 1 && (y--, x *= 2), y + A >= 1 ? s += C / x : s += C * Math.pow(2, 1 - A), s * x >= 2 && (y++, x /= 2), y + A >= o ? (g = 0, y = o) : y + A >= 1 ? (g = (s * x - 1) * Math.pow(2, l), y = y + A) : (g = s * Math.pow(2, A - 1) * Math.pow(2, l), y = 0)); l >= 8; c[f + T] = g & 255, T += P, g /= 256, l -= 8)
    ;
  for (y = y << l | g, F += l; F > 0; c[f + T] = y & 255, T += P, y /= 256, F -= 8)
    ;
  c[f + T - P] |= H * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(c) {
  const s = j, f = tr, a = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  c.Buffer = o, c.SlowBuffer = Tr, c.INSPECT_MAX_BYTES = 50;
  const l = 2147483647;
  c.kMaxLength = l;
  const { Uint8Array: p, ArrayBuffer: y, SharedArrayBuffer: g } = globalThis;
  o.TYPED_ARRAY_SUPPORT = x(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function x() {
    try {
      const n = new p(1), r = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(r, p.prototype), Object.setPrototypeOf(n, r), n.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(o.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.byteOffset;
    }
  });
  function F(n) {
    if (n > l)
      throw new RangeError('The value "' + n + '" is invalid for option "size"');
    const r = new p(n);
    return Object.setPrototypeOf(r, o.prototype), r;
  }
  function o(n, r, t) {
    if (typeof n == "number") {
      if (typeof r == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return P(n);
    }
    return A(n, r, t);
  }
  o.poolSize = 8192;
  function A(n, r, t) {
    if (typeof n == "string")
      return H(n, r);
    if (y.isView(n))
      return Ar(n);
    if (n == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof n
      );
    if (S(n, y) || n && S(n.buffer, y) || typeof g < "u" && (S(n, g) || n && S(n.buffer, g)))
      return q(n, r, t);
    if (typeof n == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const e = n.valueOf && n.valueOf();
    if (e != null && e !== n)
      return o.from(e, r, t);
    const i = Ur(n);
    if (i) return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof n[Symbol.toPrimitive] == "function")
      return o.from(n[Symbol.toPrimitive]("string"), r, t);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof n
    );
  }
  o.from = function(n, r, t) {
    return A(n, r, t);
  }, Object.setPrototypeOf(o.prototype, p.prototype), Object.setPrototypeOf(o, p);
  function C(n) {
    if (typeof n != "number")
      throw new TypeError('"size" argument must be of type number');
    if (n < 0)
      throw new RangeError('The value "' + n + '" is invalid for option "size"');
  }
  function T(n, r, t) {
    return C(n), n <= 0 ? F(n) : r !== void 0 ? typeof t == "string" ? F(n).fill(r, t) : F(n).fill(r) : F(n);
  }
  o.alloc = function(n, r, t) {
    return T(n, r, t);
  };
  function P(n) {
    return C(n), F(n < 0 ? 0 : z(n) | 0);
  }
  o.allocUnsafe = function(n) {
    return P(n);
  }, o.allocUnsafeSlow = function(n) {
    return P(n);
  };
  function H(n, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !o.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    const t = er(n, r) | 0;
    let e = F(t);
    const i = e.write(n, r);
    return i !== t && (e = e.slice(0, i)), e;
  }
  function X(n) {
    const r = n.length < 0 ? 0 : z(n.length) | 0, t = F(r);
    for (let e = 0; e < r; e += 1)
      t[e] = n[e] & 255;
    return t;
  }
  function Ar(n) {
    if (S(n, p)) {
      const r = new p(n);
      return q(r.buffer, r.byteOffset, r.byteLength);
    }
    return X(n);
  }
  function q(n, r, t) {
    if (r < 0 || n.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (n.byteLength < r + (t || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let e;
    return r === void 0 && t === void 0 ? e = new p(n) : t === void 0 ? e = new p(n, r) : e = new p(n, r, t), Object.setPrototypeOf(e, o.prototype), e;
  }
  function Ur(n) {
    if (o.isBuffer(n)) {
      const r = z(n.length) | 0, t = F(r);
      return t.length === 0 || n.copy(t, 0, 0, r), t;
    }
    if (n.length !== void 0)
      return typeof n.length != "number" || Z(n.length) ? F(0) : X(n);
    if (n.type === "Buffer" && Array.isArray(n.data))
      return X(n.data);
  }
  function z(n) {
    if (n >= l)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + l.toString(16) + " bytes");
    return n | 0;
  }
  function Tr(n) {
    return +n != n && (n = 0), o.alloc(+n);
  }
  o.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== o.prototype;
  }, o.compare = function(r, t) {
    if (S(r, p) && (r = o.from(r, r.offset, r.byteLength)), S(t, p) && (t = o.from(t, t.offset, t.byteLength)), !o.isBuffer(r) || !o.isBuffer(t))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (r === t) return 0;
    let e = r.length, i = t.length;
    for (let u = 0, h = Math.min(e, i); u < h; ++u)
      if (r[u] !== t[u]) {
        e = r[u], i = t[u];
        break;
      }
    return e < i ? -1 : i < e ? 1 : 0;
  }, o.isEncoding = function(r) {
    switch (String(r).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, o.concat = function(r, t) {
    if (!Array.isArray(r))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (r.length === 0)
      return o.alloc(0);
    let e;
    if (t === void 0)
      for (t = 0, e = 0; e < r.length; ++e)
        t += r[e].length;
    const i = o.allocUnsafe(t);
    let u = 0;
    for (e = 0; e < r.length; ++e) {
      let h = r[e];
      if (S(h, p))
        u + h.length > i.length ? (o.isBuffer(h) || (h = o.from(h)), h.copy(i, u)) : p.prototype.set.call(
          i,
          h,
          u
        );
      else if (o.isBuffer(h))
        h.copy(i, u);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      u += h.length;
    }
    return i;
  };
  function er(n, r) {
    if (o.isBuffer(n))
      return n.length;
    if (y.isView(n) || S(n, y))
      return n.byteLength;
    if (typeof n != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof n
      );
    const t = n.length, e = arguments.length > 2 && arguments[2] === !0;
    if (!e && t === 0) return 0;
    let i = !1;
    for (; ; )
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return J(n).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return wr(n).length;
        default:
          if (i)
            return e ? -1 : J(n).length;
          r = ("" + r).toLowerCase(), i = !0;
      }
  }
  o.byteLength = er;
  function Rr(n, r, t) {
    let e = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, r >>>= 0, t <= r))
      return "";
    for (n || (n = "utf8"); ; )
      switch (n) {
        case "hex":
          return Dr(this, r, t);
        case "utf8":
        case "utf-8":
          return ur(this, r, t);
        case "ascii":
          return Mr(this, r, t);
        case "latin1":
        case "binary":
          return Lr(this, r, t);
        case "base64":
          return Nr(this, r, t);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Or(this, r, t);
        default:
          if (e) throw new TypeError("Unknown encoding: " + n);
          n = (n + "").toLowerCase(), e = !0;
      }
  }
  o.prototype._isBuffer = !0;
  function M(n, r, t) {
    const e = n[r];
    n[r] = n[t], n[t] = e;
  }
  o.prototype.swap16 = function() {
    const r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < r; t += 2)
      M(this, t, t + 1);
    return this;
  }, o.prototype.swap32 = function() {
    const r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < r; t += 4)
      M(this, t, t + 3), M(this, t + 1, t + 2);
    return this;
  }, o.prototype.swap64 = function() {
    const r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let t = 0; t < r; t += 8)
      M(this, t, t + 7), M(this, t + 1, t + 6), M(this, t + 2, t + 5), M(this, t + 3, t + 4);
    return this;
  }, o.prototype.toString = function() {
    const r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? ur(this, 0, r) : Rr.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(r) {
    if (!o.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : o.compare(this, r) === 0;
  }, o.prototype.inspect = function() {
    let r = "";
    const t = c.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (r += " ... "), "<Buffer " + r + ">";
  }, a && (o.prototype[a] = o.prototype.inspect), o.prototype.compare = function(r, t, e, i, u) {
    if (S(r, p) && (r = o.from(r, r.offset, r.byteLength)), !o.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (t === void 0 && (t = 0), e === void 0 && (e = r ? r.length : 0), i === void 0 && (i = 0), u === void 0 && (u = this.length), t < 0 || e > r.length || i < 0 || u > this.length)
      throw new RangeError("out of range index");
    if (i >= u && t >= e)
      return 0;
    if (i >= u)
      return -1;
    if (t >= e)
      return 1;
    if (t >>>= 0, e >>>= 0, i >>>= 0, u >>>= 0, this === r) return 0;
    let h = u - i, w = e - t;
    const E = Math.min(h, w), B = this.slice(i, u), m = r.slice(t, e);
    for (let d = 0; d < E; ++d)
      if (B[d] !== m[d]) {
        h = B[d], w = m[d];
        break;
      }
    return h < w ? -1 : w < h ? 1 : 0;
  };
  function ir(n, r, t, e, i) {
    if (n.length === 0) return -1;
    if (typeof t == "string" ? (e = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Z(t) && (t = i ? 0 : n.length - 1), t < 0 && (t = n.length + t), t >= n.length) {
      if (i) return -1;
      t = n.length - 1;
    } else if (t < 0)
      if (i) t = 0;
      else return -1;
    if (typeof r == "string" && (r = o.from(r, e)), o.isBuffer(r))
      return r.length === 0 ? -1 : or(n, r, t, e, i);
    if (typeof r == "number")
      return r = r & 255, typeof p.prototype.indexOf == "function" ? i ? p.prototype.indexOf.call(n, r, t) : p.prototype.lastIndexOf.call(n, r, t) : or(n, [r], t, e, i);
    throw new TypeError("val must be string, number or Buffer");
  }
  function or(n, r, t, e, i) {
    let u = 1, h = n.length, w = r.length;
    if (e !== void 0 && (e = String(e).toLowerCase(), e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le")) {
      if (n.length < 2 || r.length < 2)
        return -1;
      u = 2, h /= 2, w /= 2, t /= 2;
    }
    function E(m, d) {
      return u === 1 ? m[d] : m.readUInt16BE(d * u);
    }
    let B;
    if (i) {
      let m = -1;
      for (B = t; B < h; B++)
        if (E(n, B) === E(r, m === -1 ? 0 : B - m)) {
          if (m === -1 && (m = B), B - m + 1 === w) return m * u;
        } else
          m !== -1 && (B -= B - m), m = -1;
    } else
      for (t + w > h && (t = h - w), B = t; B >= 0; B--) {
        let m = !0;
        for (let d = 0; d < w; d++)
          if (E(n, B + d) !== E(r, d)) {
            m = !1;
            break;
          }
        if (m) return B;
      }
    return -1;
  }
  o.prototype.includes = function(r, t, e) {
    return this.indexOf(r, t, e) !== -1;
  }, o.prototype.indexOf = function(r, t, e) {
    return ir(this, r, t, e, !0);
  }, o.prototype.lastIndexOf = function(r, t, e) {
    return ir(this, r, t, e, !1);
  };
  function Sr(n, r, t, e) {
    t = Number(t) || 0;
    const i = n.length - t;
    e ? (e = Number(e), e > i && (e = i)) : e = i;
    const u = r.length;
    e > u / 2 && (e = u / 2);
    let h;
    for (h = 0; h < e; ++h) {
      const w = parseInt(r.substr(h * 2, 2), 16);
      if (Z(w)) return h;
      n[t + h] = w;
    }
    return h;
  }
  function _r(n, r, t, e) {
    return W(J(r, n.length - t), n, t, e);
  }
  function Cr(n, r, t, e) {
    return W(Yr(r), n, t, e);
  }
  function br(n, r, t, e) {
    return W(wr(r), n, t, e);
  }
  function kr(n, r, t, e) {
    return W(jr(r, n.length - t), n, t, e);
  }
  o.prototype.write = function(r, t, e, i) {
    if (t === void 0)
      i = "utf8", e = this.length, t = 0;
    else if (e === void 0 && typeof t == "string")
      i = t, e = this.length, t = 0;
    else if (isFinite(t))
      t = t >>> 0, isFinite(e) ? (e = e >>> 0, i === void 0 && (i = "utf8")) : (i = e, e = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const u = this.length - t;
    if ((e === void 0 || e > u) && (e = u), r.length > 0 && (e < 0 || t < 0) || t > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    i || (i = "utf8");
    let h = !1;
    for (; ; )
      switch (i) {
        case "hex":
          return Sr(this, r, t, e);
        case "utf8":
        case "utf-8":
          return _r(this, r, t, e);
        case "ascii":
        case "latin1":
        case "binary":
          return Cr(this, r, t, e);
        case "base64":
          return br(this, r, t, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return kr(this, r, t, e);
        default:
          if (h) throw new TypeError("Unknown encoding: " + i);
          i = ("" + i).toLowerCase(), h = !0;
      }
  }, o.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Nr(n, r, t) {
    return r === 0 && t === n.length ? s.fromByteArray(n) : s.fromByteArray(n.slice(r, t));
  }
  function ur(n, r, t) {
    t = Math.min(n.length, t);
    const e = [];
    let i = r;
    for (; i < t; ) {
      const u = n[i];
      let h = null, w = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
      if (i + w <= t) {
        let E, B, m, d;
        switch (w) {
          case 1:
            u < 128 && (h = u);
            break;
          case 2:
            E = n[i + 1], (E & 192) === 128 && (d = (u & 31) << 6 | E & 63, d > 127 && (h = d));
            break;
          case 3:
            E = n[i + 1], B = n[i + 2], (E & 192) === 128 && (B & 192) === 128 && (d = (u & 15) << 12 | (E & 63) << 6 | B & 63, d > 2047 && (d < 55296 || d > 57343) && (h = d));
            break;
          case 4:
            E = n[i + 1], B = n[i + 2], m = n[i + 3], (E & 192) === 128 && (B & 192) === 128 && (m & 192) === 128 && (d = (u & 15) << 18 | (E & 63) << 12 | (B & 63) << 6 | m & 63, d > 65535 && d < 1114112 && (h = d));
        }
      }
      h === null ? (h = 65533, w = 1) : h > 65535 && (h -= 65536, e.push(h >>> 10 & 1023 | 55296), h = 56320 | h & 1023), e.push(h), i += w;
    }
    return Pr(e);
  }
  const cr = 4096;
  function Pr(n) {
    const r = n.length;
    if (r <= cr)
      return String.fromCharCode.apply(String, n);
    let t = "", e = 0;
    for (; e < r; )
      t += String.fromCharCode.apply(
        String,
        n.slice(e, e += cr)
      );
    return t;
  }
  function Mr(n, r, t) {
    let e = "";
    t = Math.min(n.length, t);
    for (let i = r; i < t; ++i)
      e += String.fromCharCode(n[i] & 127);
    return e;
  }
  function Lr(n, r, t) {
    let e = "";
    t = Math.min(n.length, t);
    for (let i = r; i < t; ++i)
      e += String.fromCharCode(n[i]);
    return e;
  }
  function Dr(n, r, t) {
    const e = n.length;
    (!r || r < 0) && (r = 0), (!t || t < 0 || t > e) && (t = e);
    let i = "";
    for (let u = r; u < t; ++u)
      i += Kr[n[u]];
    return i;
  }
  function Or(n, r, t) {
    const e = n.slice(r, t);
    let i = "";
    for (let u = 0; u < e.length - 1; u += 2)
      i += String.fromCharCode(e[u] + e[u + 1] * 256);
    return i;
  }
  o.prototype.slice = function(r, t) {
    const e = this.length;
    r = ~~r, t = t === void 0 ? e : ~~t, r < 0 ? (r += e, r < 0 && (r = 0)) : r > e && (r = e), t < 0 ? (t += e, t < 0 && (t = 0)) : t > e && (t = e), t < r && (t = r);
    const i = this.subarray(r, t);
    return Object.setPrototypeOf(i, o.prototype), i;
  };
  function I(n, r, t) {
    if (n % 1 !== 0 || n < 0) throw new RangeError("offset is not uint");
    if (n + r > t) throw new RangeError("Trying to access beyond buffer length");
  }
  o.prototype.readUintLE = o.prototype.readUIntLE = function(r, t, e) {
    r = r >>> 0, t = t >>> 0, e || I(r, t, this.length);
    let i = this[r], u = 1, h = 0;
    for (; ++h < t && (u *= 256); )
      i += this[r + h] * u;
    return i;
  }, o.prototype.readUintBE = o.prototype.readUIntBE = function(r, t, e) {
    r = r >>> 0, t = t >>> 0, e || I(r, t, this.length);
    let i = this[r + --t], u = 1;
    for (; t > 0 && (u *= 256); )
      i += this[r + --t] * u;
    return i;
  }, o.prototype.readUint8 = o.prototype.readUInt8 = function(r, t) {
    return r = r >>> 0, t || I(r, 1, this.length), this[r];
  }, o.prototype.readUint16LE = o.prototype.readUInt16LE = function(r, t) {
    return r = r >>> 0, t || I(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, o.prototype.readUint16BE = o.prototype.readUInt16BE = function(r, t) {
    return r = r >>> 0, t || I(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, o.prototype.readUint32LE = o.prototype.readUInt32LE = function(r, t) {
    return r = r >>> 0, t || I(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, o.prototype.readUint32BE = o.prototype.readUInt32BE = function(r, t) {
    return r = r >>> 0, t || I(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, o.prototype.readBigUInt64LE = k(function(r) {
    r = r >>> 0, O(r, "offset");
    const t = this[r], e = this[r + 7];
    (t === void 0 || e === void 0) && G(r, this.length - 8);
    const i = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24, u = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + e * 2 ** 24;
    return BigInt(i) + (BigInt(u) << BigInt(32));
  }), o.prototype.readBigUInt64BE = k(function(r) {
    r = r >>> 0, O(r, "offset");
    const t = this[r], e = this[r + 7];
    (t === void 0 || e === void 0) && G(r, this.length - 8);
    const i = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r], u = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e;
    return (BigInt(i) << BigInt(32)) + BigInt(u);
  }), o.prototype.readIntLE = function(r, t, e) {
    r = r >>> 0, t = t >>> 0, e || I(r, t, this.length);
    let i = this[r], u = 1, h = 0;
    for (; ++h < t && (u *= 256); )
      i += this[r + h] * u;
    return u *= 128, i >= u && (i -= Math.pow(2, 8 * t)), i;
  }, o.prototype.readIntBE = function(r, t, e) {
    r = r >>> 0, t = t >>> 0, e || I(r, t, this.length);
    let i = t, u = 1, h = this[r + --i];
    for (; i > 0 && (u *= 256); )
      h += this[r + --i] * u;
    return u *= 128, h >= u && (h -= Math.pow(2, 8 * t)), h;
  }, o.prototype.readInt8 = function(r, t) {
    return r = r >>> 0, t || I(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, o.prototype.readInt16LE = function(r, t) {
    r = r >>> 0, t || I(r, 2, this.length);
    const e = this[r] | this[r + 1] << 8;
    return e & 32768 ? e | 4294901760 : e;
  }, o.prototype.readInt16BE = function(r, t) {
    r = r >>> 0, t || I(r, 2, this.length);
    const e = this[r + 1] | this[r] << 8;
    return e & 32768 ? e | 4294901760 : e;
  }, o.prototype.readInt32LE = function(r, t) {
    return r = r >>> 0, t || I(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, o.prototype.readInt32BE = function(r, t) {
    return r = r >>> 0, t || I(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, o.prototype.readBigInt64LE = k(function(r) {
    r = r >>> 0, O(r, "offset");
    const t = this[r], e = this[r + 7];
    (t === void 0 || e === void 0) && G(r, this.length - 8);
    const i = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (e << 24);
    return (BigInt(i) << BigInt(32)) + BigInt(t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24);
  }), o.prototype.readBigInt64BE = k(function(r) {
    r = r >>> 0, O(r, "offset");
    const t = this[r], e = this[r + 7];
    (t === void 0 || e === void 0) && G(r, this.length - 8);
    const i = (t << 24) + // Overflow
    this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r];
    return (BigInt(i) << BigInt(32)) + BigInt(this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e);
  }), o.prototype.readFloatLE = function(r, t) {
    return r = r >>> 0, t || I(r, 4, this.length), f.read(this, r, !0, 23, 4);
  }, o.prototype.readFloatBE = function(r, t) {
    return r = r >>> 0, t || I(r, 4, this.length), f.read(this, r, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(r, t) {
    return r = r >>> 0, t || I(r, 8, this.length), f.read(this, r, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(r, t) {
    return r = r >>> 0, t || I(r, 8, this.length), f.read(this, r, !1, 52, 8);
  };
  function U(n, r, t, e, i, u) {
    if (!o.isBuffer(n)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > i || r < u) throw new RangeError('"value" argument is out of bounds');
    if (t + e > n.length) throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(r, t, e, i) {
    if (r = +r, t = t >>> 0, e = e >>> 0, !i) {
      const w = Math.pow(2, 8 * e) - 1;
      U(this, r, t, e, w, 0);
    }
    let u = 1, h = 0;
    for (this[t] = r & 255; ++h < e && (u *= 256); )
      this[t + h] = r / u & 255;
    return t + e;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(r, t, e, i) {
    if (r = +r, t = t >>> 0, e = e >>> 0, !i) {
      const w = Math.pow(2, 8 * e) - 1;
      U(this, r, t, e, w, 0);
    }
    let u = e - 1, h = 1;
    for (this[t + u] = r & 255; --u >= 0 && (h *= 256); )
      this[t + u] = r / h & 255;
    return t + e;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 1, 255, 0), this[t] = r & 255, t + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 2, 65535, 0), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 2, 65535, 0), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 4, 4294967295, 0), this[t + 3] = r >>> 24, this[t + 2] = r >>> 16, this[t + 1] = r >>> 8, this[t] = r & 255, t + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 4, 4294967295, 0), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
  };
  function hr(n, r, t, e, i) {
    yr(r, e, i, n, t, 7);
    let u = Number(r & BigInt(4294967295));
    n[t++] = u, u = u >> 8, n[t++] = u, u = u >> 8, n[t++] = u, u = u >> 8, n[t++] = u;
    let h = Number(r >> BigInt(32) & BigInt(4294967295));
    return n[t++] = h, h = h >> 8, n[t++] = h, h = h >> 8, n[t++] = h, h = h >> 8, n[t++] = h, t;
  }
  function sr(n, r, t, e, i) {
    yr(r, e, i, n, t, 7);
    let u = Number(r & BigInt(4294967295));
    n[t + 7] = u, u = u >> 8, n[t + 6] = u, u = u >> 8, n[t + 5] = u, u = u >> 8, n[t + 4] = u;
    let h = Number(r >> BigInt(32) & BigInt(4294967295));
    return n[t + 3] = h, h = h >> 8, n[t + 2] = h, h = h >> 8, n[t + 1] = h, h = h >> 8, n[t] = h, t + 8;
  }
  o.prototype.writeBigUInt64LE = k(function(r, t = 0) {
    return hr(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }), o.prototype.writeBigUInt64BE = k(function(r, t = 0) {
    return sr(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }), o.prototype.writeIntLE = function(r, t, e, i) {
    if (r = +r, t = t >>> 0, !i) {
      const E = Math.pow(2, 8 * e - 1);
      U(this, r, t, e, E - 1, -E);
    }
    let u = 0, h = 1, w = 0;
    for (this[t] = r & 255; ++u < e && (h *= 256); )
      r < 0 && w === 0 && this[t + u - 1] !== 0 && (w = 1), this[t + u] = (r / h >> 0) - w & 255;
    return t + e;
  }, o.prototype.writeIntBE = function(r, t, e, i) {
    if (r = +r, t = t >>> 0, !i) {
      const E = Math.pow(2, 8 * e - 1);
      U(this, r, t, e, E - 1, -E);
    }
    let u = e - 1, h = 1, w = 0;
    for (this[t + u] = r & 255; --u >= 0 && (h *= 256); )
      r < 0 && w === 0 && this[t + u + 1] !== 0 && (w = 1), this[t + u] = (r / h >> 0) - w & 255;
    return t + e;
  }, o.prototype.writeInt8 = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[t] = r & 255, t + 1;
  }, o.prototype.writeInt16LE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 2, 32767, -32768), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
  }, o.prototype.writeInt16BE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 2, 32767, -32768), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
  }, o.prototype.writeInt32LE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 4, 2147483647, -2147483648), this[t] = r & 255, this[t + 1] = r >>> 8, this[t + 2] = r >>> 16, this[t + 3] = r >>> 24, t + 4;
  }, o.prototype.writeInt32BE = function(r, t, e) {
    return r = +r, t = t >>> 0, e || U(this, r, t, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
  }, o.prototype.writeBigInt64LE = k(function(r, t = 0) {
    return hr(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), o.prototype.writeBigInt64BE = k(function(r, t = 0) {
    return sr(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function fr(n, r, t, e, i, u) {
    if (t + e > n.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError("Index out of range");
  }
  function pr(n, r, t, e, i) {
    return r = +r, t = t >>> 0, i || fr(n, r, t, 4), f.write(n, r, t, e, 23, 4), t + 4;
  }
  o.prototype.writeFloatLE = function(r, t, e) {
    return pr(this, r, t, !0, e);
  }, o.prototype.writeFloatBE = function(r, t, e) {
    return pr(this, r, t, !1, e);
  };
  function ar(n, r, t, e, i) {
    return r = +r, t = t >>> 0, i || fr(n, r, t, 8), f.write(n, r, t, e, 52, 8), t + 8;
  }
  o.prototype.writeDoubleLE = function(r, t, e) {
    return ar(this, r, t, !0, e);
  }, o.prototype.writeDoubleBE = function(r, t, e) {
    return ar(this, r, t, !1, e);
  }, o.prototype.copy = function(r, t, e, i) {
    if (!o.isBuffer(r)) throw new TypeError("argument should be a Buffer");
    if (e || (e = 0), !i && i !== 0 && (i = this.length), t >= r.length && (t = r.length), t || (t = 0), i > 0 && i < e && (i = e), i === e || r.length === 0 || this.length === 0) return 0;
    if (t < 0)
      throw new RangeError("targetStart out of bounds");
    if (e < 0 || e >= this.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError("sourceEnd out of bounds");
    i > this.length && (i = this.length), r.length - t < i - e && (i = r.length - t + e);
    const u = i - e;
    return this === r && typeof p.prototype.copyWithin == "function" ? this.copyWithin(t, e, i) : p.prototype.set.call(
      r,
      this.subarray(e, i),
      t
    ), u;
  }, o.prototype.fill = function(r, t, e, i) {
    if (typeof r == "string") {
      if (typeof t == "string" ? (i = t, t = 0, e = this.length) : typeof e == "string" && (i = e, e = this.length), i !== void 0 && typeof i != "string")
        throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !o.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      if (r.length === 1) {
        const h = r.charCodeAt(0);
        (i === "utf8" && h < 128 || i === "latin1") && (r = h);
      }
    } else typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
    if (t < 0 || this.length < t || this.length < e)
      throw new RangeError("Out of range index");
    if (e <= t)
      return this;
    t = t >>> 0, e = e === void 0 ? this.length : e >>> 0, r || (r = 0);
    let u;
    if (typeof r == "number")
      for (u = t; u < e; ++u)
        this[u] = r;
    else {
      const h = o.isBuffer(r) ? r : o.from(r, i), w = h.length;
      if (w === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (u = 0; u < e - t; ++u)
        this[u + t] = h[u % w];
    }
    return this;
  };
  const D = {};
  function V(n, r, t) {
    D[n] = class extends t {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: r.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${n}]`, this.stack, delete this.name;
      }
      get code() {
        return n;
      }
      set code(i) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${n}]: ${this.message}`;
      }
    };
  }
  V(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(n) {
      return n ? `${n} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), V(
    "ERR_INVALID_ARG_TYPE",
    function(n, r) {
      return `The "${n}" argument must be of type number. Received type ${typeof r}`;
    },
    TypeError
  ), V(
    "ERR_OUT_OF_RANGE",
    function(n, r, t) {
      let e = `The value of "${n}" is out of range.`, i = t;
      return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = lr(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = lr(i)), i += "n"), e += ` It must be ${r}. Received ${i}`, e;
    },
    RangeError
  );
  function lr(n) {
    let r = "", t = n.length;
    const e = n[0] === "-" ? 1 : 0;
    for (; t >= e + 4; t -= 3)
      r = `_${n.slice(t - 3, t)}${r}`;
    return `${n.slice(0, t)}${r}`;
  }
  function $r(n, r, t) {
    O(r, "offset"), (n[r] === void 0 || n[r + t] === void 0) && G(r, n.length - (t + 1));
  }
  function yr(n, r, t, e, i, u) {
    if (n > t || n < r) {
      const h = typeof r == "bigint" ? "n" : "";
      let w;
      throw r === 0 || r === BigInt(0) ? w = `>= 0${h} and < 2${h} ** ${(u + 1) * 8}${h}` : w = `>= -(2${h} ** ${(u + 1) * 8 - 1}${h}) and < 2 ** ${(u + 1) * 8 - 1}${h}`, new D.ERR_OUT_OF_RANGE("value", w, n);
    }
    $r(e, i, u);
  }
  function O(n, r) {
    if (typeof n != "number")
      throw new D.ERR_INVALID_ARG_TYPE(r, "number", n);
  }
  function G(n, r, t) {
    throw Math.floor(n) !== n ? (O(n, t), new D.ERR_OUT_OF_RANGE("offset", "an integer", n)) : r < 0 ? new D.ERR_BUFFER_OUT_OF_BOUNDS() : new D.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${r}`,
      n
    );
  }
  const Gr = /[^+/0-9A-Za-z-_]/g;
  function Wr(n) {
    if (n = n.split("=")[0], n = n.trim().replace(Gr, ""), n.length < 2) return "";
    for (; n.length % 4 !== 0; )
      n = n + "=";
    return n;
  }
  function J(n, r) {
    r = r || 1 / 0;
    let t;
    const e = n.length;
    let i = null;
    const u = [];
    for (let h = 0; h < e; ++h) {
      if (t = n.charCodeAt(h), t > 55295 && t < 57344) {
        if (!i) {
          if (t > 56319) {
            (r -= 3) > -1 && u.push(239, 191, 189);
            continue;
          } else if (h + 1 === e) {
            (r -= 3) > -1 && u.push(239, 191, 189);
            continue;
          }
          i = t;
          continue;
        }
        if (t < 56320) {
          (r -= 3) > -1 && u.push(239, 191, 189), i = t;
          continue;
        }
        t = (i - 55296 << 10 | t - 56320) + 65536;
      } else i && (r -= 3) > -1 && u.push(239, 191, 189);
      if (i = null, t < 128) {
        if ((r -= 1) < 0) break;
        u.push(t);
      } else if (t < 2048) {
        if ((r -= 2) < 0) break;
        u.push(
          t >> 6 | 192,
          t & 63 | 128
        );
      } else if (t < 65536) {
        if ((r -= 3) < 0) break;
        u.push(
          t >> 12 | 224,
          t >> 6 & 63 | 128,
          t & 63 | 128
        );
      } else if (t < 1114112) {
        if ((r -= 4) < 0) break;
        u.push(
          t >> 18 | 240,
          t >> 12 & 63 | 128,
          t >> 6 & 63 | 128,
          t & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return u;
  }
  function Yr(n) {
    const r = [];
    for (let t = 0; t < n.length; ++t)
      r.push(n.charCodeAt(t) & 255);
    return r;
  }
  function jr(n, r) {
    let t, e, i;
    const u = [];
    for (let h = 0; h < n.length && !((r -= 2) < 0); ++h)
      t = n.charCodeAt(h), e = t >> 8, i = t % 256, u.push(i), u.push(e);
    return u;
  }
  function wr(n) {
    return s.toByteArray(Wr(n));
  }
  function W(n, r, t, e) {
    let i;
    for (i = 0; i < e && !(i + t >= r.length || i >= n.length); ++i)
      r[i + t] = n[i];
    return i;
  }
  function S(n, r) {
    return n instanceof r || n != null && n.constructor != null && n.constructor.name != null && n.constructor.name === r.name;
  }
  function Z(n) {
    return n !== n;
  }
  const Kr = function() {
    const n = "0123456789abcdef", r = new Array(256);
    for (let t = 0; t < 16; ++t) {
      const e = t * 16;
      for (let i = 0; i < 16; ++i)
        r[e + i] = n[t] + n[i];
    }
    return r;
  }();
  function k(n) {
    return typeof BigInt > "u" ? Hr : n;
  }
  function Hr() {
    throw new Error("BigInt not supported");
  }
})(Er);
const rr = Er.Buffer, Et = 600, mt = 5e6, gt = 2, et = qr(Br), it = rr.alloc(32, 1);
class It extends Error {
  constructor(s = "Cannot extract transaction from non-finalized psbt.") {
    super(s), this.name = "BrowserWalletExtractTxFromNonFinalizedPsbtError";
  }
}
class Ft extends Error {
  constructor(s) {
    super(s), this.name = "BrowserWalletNotInstalledError";
  }
}
class L extends Error {
  constructor(s) {
    super(s), this.name = "OrditSDKError";
  }
}
function ot(c) {
  return Object.fromEntries(
    Object.entries(c).map(([s, f]) => [f, s])
  );
}
const b = {
  p2pkh: "legacy",
  p2sh: "p2sh-p2wpkh",
  p2wsh: "p2wsh",
  p2wpkh: "segwit",
  p2tr: "taproot"
}, At = ot(b);
function nr(c) {
  return c === "mainnet" ? Q.bitcoin : c === "signet" ? Q.testnet : Q[c];
}
function gr(c, s, f, a) {
  zr(Br);
  const l = typeof f == "string" ? nr(f) : f;
  return s === "p2tr" ? N.p2tr({
    internalPubkey: c,
    network: l,
    ...a
  }) : s === "p2sh" ? N.p2sh({
    redeem: N.p2wpkh({ pubkey: c, network: l }),
    network: l
  }) : N[s]({ pubkey: c, network: l });
}
function Ut(c) {
  return c.subarray(1, 33);
}
const ut = (c) => (c == null ? void 0 : c.constructor) === Object, ct = (c) => c instanceof String || typeof c == "string";
function Ir(c, { encode: s, depth: f = 0 }) {
  if (f > 5)
    throw new L("Object too deep");
  for (const l in c) {
    if (!c.hasOwnProperty(l)) continue;
    const p = c[l];
    ut(p) ? c[l] = Ir(p, {
      encode: s,
      depth: f + 1
    }) : ct(p) && (c[l] = s ? encodeURIComponent(p) : decodeURIComponent(p));
  }
  return c;
}
function Tt(c) {
  return Ir(c, { encode: !1 });
}
function Rt(c) {
  return c / 10 ** 8;
}
function St(c, s) {
  return `${c}:${s}`;
}
function _t(c) {
  return c.includes(":") ? c.replace(":", "i") : c.includes("i") ? c : `${c}i0`;
}
function K(c, s) {
  return (f) => {
    try {
      return c({ output: f, network: nr(s) });
    } catch {
      return !1;
    }
  };
}
const ht = (c, s) => ({
  type: "p2pkh",
  payload: K(N.p2pkh, s)(c)
}), st = (c, s) => ({
  type: "p2wpkh",
  payload: K(N.p2wpkh, s)(c)
}), ft = (c, s) => ({
  type: "p2sh",
  payload: K(N.p2sh, s)(c)
}), pt = (c, s) => ({
  type: "p2tr",
  payload: K(N.p2tr, s)(c)
});
function Ct(c, s) {
  const f = ht(c, s);
  if (f.payload)
    return {
      format: b.p2pkh,
      ...f
    };
  const a = st(c, s);
  if (a.payload)
    return {
      format: b.p2wpkh,
      ...a
    };
  const l = ft(c, s);
  if (l.payload)
    return {
      format: b.p2sh,
      ...l
    };
  const p = pt(c, s);
  if (p.payload)
    return {
      format: b.p2tr,
      ...p
    };
  throw new L("Unsupported input");
}
function at(c) {
  try {
    const { type: s, network: f, bech32: a } = Y(c);
    if (!a && f !== "testnet" || a && f !== "regtest")
      throw new Error("Invalid address");
    return s;
  } catch {
    throw new L("Invalid address");
  }
}
function Fr(c, s, f = "bitcoin") {
  if (f === "fractal-bitcoin") {
    if (s === "regtest" || s === "signet")
      throw new L("Unsupported operation");
    if (!xr(c, Xr.mainnet))
      throw new L("Invalid address");
    const { type: l } = Y(c);
    return l;
  }
  if (s === "regtest")
    return at(c);
  if (!xr(
    c,
    s === "signet" ? "testnet" : s
  ))
    throw new L("Invalid address");
  const { type: a } = Y(c);
  return a;
}
function bt(c, s, f = "bitcoin") {
  const a = Fr(c, s, f);
  return b[a];
}
function kt(c, s, f = "bitcoin") {
  try {
    return !!Fr(c, s, f);
  } catch {
    return !1;
  }
}
function lt(c, s) {
  const f = c.subarray(1, 33), { address: a } = gr(f, "p2tr", s);
  return {
    address: a,
    // address will never be undefined
    format: b.p2tr,
    publicKey: c.toString("hex"),
    xKey: f.toString("hex")
  };
}
function dr(c, s, f) {
  if (f === "p2tr")
    return lt(c, s);
  const { address: a } = gr(c, f, s);
  return {
    address: a,
    // address will never be undefined
    format: b[f],
    publicKey: c.toString("hex")
  };
}
function Nt(c, s = "mainnet", f = "all", a = "bitcoin") {
  const l = rr.isBuffer(c) ? c : rr.from(c, "hex"), p = a === "fractal-bitcoin" ? "mainnet" : s, { publicKey: y } = et.fromPublicKey(
    l,
    it,
    nr(p)
  );
  return f === "all" ? Object.keys(b).filter((x) => x !== "p2wsh").map(
    (x) => dr(y, p, x)
  ) : [dr(y, p, f)];
}
function Pt(c) {
  try {
    const { network: s } = Y(c);
    return s;
  } catch {
    throw new L("Invalid address");
  }
}
export {
  b as A,
  Ft as B,
  it as C,
  gt as I,
  mt as M,
  L as O,
  Tt as U,
  It as a,
  rr as b,
  Pt as c,
  nr as d,
  Ct as e,
  et as f,
  bt as g,
  gr as h,
  St as i,
  Et as j,
  Rt as k,
  Fr as l,
  Nt as m,
  At as n,
  _t as o,
  Ut as t,
  kt as v
};
