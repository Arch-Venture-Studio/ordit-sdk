"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./index-Dfqe4I64.cjs"),f=require("bitcoinjs-lib"),c=require("./BrowserWalletSigningError-CXaOQVy_.cjs"),g={mainnet:"livenet",testnet:"testnet",signet:"testnet"},E={bitcoin:{mainnet:"BITCOIN_MAINNET",testnet:"BITCOIN_TESTNET",signet:"BITCOIN_SIGNET"},"fractal-bitcoin":{mainnet:"FRACTAL_BITCOIN_MAINNET",testnet:"FRACTAL_BITCOIN_TESTNET",signet:"FRACTAL_BITCOIN_TESTNET"}};function l(){if(typeof window>"u")throw new t.OrditSDKError("Cannot call this function outside a browser");return typeof window.unisat<"u"}async function T(o="mainnet",r="bitcoin",n={}){const{readOnly:a=!1}=n;if(!l())throw new t.BrowserWalletNotInstalledError("Unisat not installed");try{if(typeof window.unisat.getChain>"u"){if(r==="fractal-bitcoin")throw new t.OrditSDKError("Fractal bitcoin is only supported on Unisat extension >= 1.4.0");const d=await window.unisat.getNetwork(),w=g[o];d!==w&&await window.unisat.switchNetwork(w)}else{const d=await window.unisat.getChain(),w=E[r][o];d!==w&&await window.unisat.switchChain(w)}const e=a?await window.unisat.getAccounts():await window.unisat.requestAccounts(),s=await window.unisat.getPublicKey(),i=e[0];if(!i)return[];const u=t.getAddressFormat(i,o,r);return[{publicKey:s,address:i,format:u}]}catch(e){if(e instanceof t.OrditSDKError)throw e;const s=e;throw s.code===4001?new c.BrowserWalletRequestCancelledByUserError:new t.OrditSDKError(s.message)}}async function h(o,{finalize:r=!0,extractTx:n=!0}={}){if(!l())throw new t.BrowserWalletNotInstalledError("Unisat not installed");if(n&&!r)throw new t.BrowserWalletExtractTxFromNonFinalizedPsbtError;const a=o.toHex();let e="";try{e=await window.unisat.signPsbt(a,{autoFinalized:r})}catch(i){if(i.code===4001)throw new c.BrowserWalletRequestCancelledByUserError}if(!e)throw new c.BrowserWalletSigningError("Failed to sign psbt hex using Unisat");const s=f.Psbt.fromHex(e);if(n)try{return{base64:null,hex:s.extractTransaction().toHex()}}catch(i){throw i instanceof Error&&i.message==="Not finalized"?new t.BrowserWalletExtractTxFromNonFinalizedPsbtError:new t.OrditSDKError("Failed to extract transaction from PSBT")}else return{base64:s.toBase64(),hex:s.toHex()}}async function N(o,r="ecdsa"){if(!l())throw new t.BrowserWalletNotInstalledError("Unisat not installed");let n="";try{n=await window.unisat.signMessage(o,r)}catch(a){if(a.code===4001)throw new c.BrowserWalletRequestCancelledByUserError}if(!n)throw new c.BrowserWalletSigningError("Failed to sign message using Unisat");return{base64:n,hex:t.Buffer.from(n,"base64").toString("hex")}}exports.getAddresses=T;exports.isInstalled=l;exports.signMessage=N;exports.signPsbt=h;
