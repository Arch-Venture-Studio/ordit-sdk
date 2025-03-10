"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("./index-Dfqe4I64.cjs"),u=require("bitcoinjs-lib"),h=require("./BrowserWalletNetworkMismatchError-CDpdIBHK.cjs");function c(){if(typeof window>"u")throw new r.OrditSDKError("Cannot call this function outside a browser");return typeof window.phantom<"u"}function l(t="mainnet"){if(!c())throw new r.BrowserWalletNotInstalledError("Phantom Wallet not installed");if(t!=="mainnet")throw new h.BrowserWalletNetworkMismatchError("Phantom Wallet only supports mainnet")}async function m(t="mainnet"){l(t);const s=await window.phantom.bitcoin.requestAccounts(),n=[],e=[];if(s.forEach(o=>{e.push(o.purpose);const i=r.getAddressFormat(o.address,t);if(o.purpose==="ordinals"&&i!=="taproot")throw new r.OrditSDKError("No taproot address found");n.push({publicKey:o.publicKey,address:o.address,format:i})}),!e.includes("ordinals"))throw new r.OrditSDKError("No taproot address found");return n}async function g(t,s,n="mainnet"){l(n);try{const{signature:e}=await window.phantom.bitcoin.signMessage(s,new TextEncoder().encode(t));return{hex:r.Buffer.from(e).toString("hex"),base64:r.Buffer.from(e).toString("base64")}}catch(e){throw console.error("Sign message error",e),new r.OrditSDKError("Failed to sign message with Phantom Wallet")}}async function p(t,{finalize:s=!0,extractTx:n=!0,network:e,inputsToSign:o}={network:"mainnet",inputsToSign:[]}){if(l(e),n&&!s)throw new r.BrowserWalletExtractTxFromNonFinalizedPsbtError;let i,a;try{i=await window.phantom.bitcoin.signPSBT(r.Buffer.from(t.toHex(),"hex"),{inputsToSign:o}),a=u.Psbt.fromBuffer(r.Buffer.from(i))}catch{throw new r.OrditSDKError("Failed to sign psbt with Phantom Wallet")}if(s&&o.forEach(d=>{d.signingIndexes.forEach(f=>{try{a.finalizeInput(f)}catch(w){throw console.error("Sign psbt error",w),new r.OrditSDKError("Failed to finalize input")}})}),n)try{return{base64:null,hex:a.extractTransaction().toHex()}}catch(d){throw d instanceof Error&&d.message==="Not finalized"?new r.BrowserWalletExtractTxFromNonFinalizedPsbtError:new r.OrditSDKError("Failed to extract transaction from PSBT")}return{hex:a.toHex(),base64:a.toBase64()}}exports.getAddresses=m;exports.isInstalled=c;exports.signMessage=g;exports.signPsbt=p;
