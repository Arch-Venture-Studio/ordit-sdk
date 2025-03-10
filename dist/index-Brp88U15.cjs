"use strict";const c=require("./index-Dfqe4I64.cjs"),C=require("@bitcoinerlab/secp256k1"),E=require("bitcoinjs-lib"),o=require("sats-connect"),g=require("./BrowserWalletSigningError-CXaOQVy_.cjs"),F=require("./utils-BCPFyPtI.cjs");function O(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const s=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,s.get?s:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const N=O(C);var p=(e=>(e.UNISAT="unisat",e.XVERSE="xverse",e.MAGICEDEN="magiceden",e.LEATHER="leather",e.OKX="okx",e.PHANTOM="phantom",e.OYL="oyl",e))(p||{});o.BitcoinNetworkType.Mainnet,o.BitcoinNetworkType.Testnet,o.BitcoinNetworkType.Signet;function y(e,t){switch(e){case"mainnet":return o.BitcoinNetworkType.Mainnet;case"testnet":return t===p.XVERSE?o.BitcoinNetworkType.Testnet4:o.BitcoinNetworkType.Testnet;case"signet":return o.BitcoinNetworkType.Signet;default:return o.BitcoinNetworkType.Mainnet}}E.initEccLib(N);async function P(e,t,n="mainnet"){const s=[],d=r=>{if(!r||!r.addresses||r.addresses.length!==2)throw new g.BrowserWalletSigningError("Failed to retrieve addresses using selected wallet");r.addresses.forEach(i=>{const w=c.getAddressFormat(i.address,n);let l=i.publicKey;w==="taproot"&&(l=F.fromXOnlyToFullPubkey(i.publicKey)),s.push({publicKey:l,address:i.address,format:w})})},u=()=>{throw new g.BrowserWalletRequestCancelledByUserError},a={payload:{purposes:["ordinals","payment"],message:"Provide access to Payment address and Ordinals address",network:{type:y(n,t)}},getProvider:e,onFinish:r=>d(r),onCancel:u};return await o.getAddress(a),s}async function k(e,t,n,{finalize:s=!0,extractTx:d=!0,network:u,inputsToSign:a}={network:"mainnet",inputsToSign:[]}){if(!s&&d)throw new c.BrowserWalletExtractTxFromNonFinalizedPsbtError;if(!t||!u||!a.length)throw new c.OrditSDKError("Invalid options provided");let r,i=null;const w=m=>{const{psbtBase64:B}=m;if(!B)throw new g.BrowserWalletSigningError("Failed to sign psbt using selected wallet");const f=E.Psbt.fromBase64(B);if(s&&a.forEach(h=>{h.signingIndexes.forEach(S=>{try{f.finalizeInput(S)}catch(T){throw console.error("Sign psbt error",T),new c.OrditSDKError("Failed to finalize input")}})}),d){try{r=f.extractTransaction().toHex()}catch(h){throw h instanceof Error&&h.message==="Not finalized"?new c.BrowserWalletExtractTxFromNonFinalizedPsbtError:new c.OrditSDKError("Failed to extract transaction from PSBT")}i=null}else r=f.toHex(),i=f.toBase64()},l=()=>{throw new g.BrowserWalletRequestCancelledByUserError},b={payload:{network:{type:y(u,n)},message:"Sign PSBT",psbtBase64:t.toBase64(),broadcast:!1,inputsToSign:a},onFinish:w,onCancel:l,getProvider:e};return await o.signTransaction(b),{hex:r,base64:i}}async function x(e,t,n,s,d="mainnet"){if(!t||!d||!n)throw new c.OrditSDKError("Invalid options provided");let u,a=null;const r=l=>{if(!l)throw new g.BrowserWalletSigningError("Failed to sign message using selected wallet");u=c.Buffer.from(l,"base64").toString("hex"),a=l},i=()=>{throw new g.BrowserWalletRequestCancelledByUserError},w={payload:{network:{type:y(d,s)},message:t,address:n},getProvider:e,onFinish:r,onCancel:i};return await o.signMessage(w),{hex:u,base64:a}}exports.Wallet=p;exports.satsConnectWalletGetAddresses=P;exports.satsConnectWalletSignMessage=x;exports.satsConnectWalletSignPsbt=k;
