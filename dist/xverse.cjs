"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./index-Brp88U15.cjs"),n=require("./index-Dfqe4I64.cjs");function r(){var e;if(typeof window>"u")throw new n.OrditSDKError("Cannot call this function outside a browser");return typeof((e=window.XverseProviders)==null?void 0:e.BitcoinProvider)<"u"}async function i(){if(!r())throw new n.BrowserWalletNotInstalledError("Xverse not installed");return window.XverseProviders.BitcoinProvider}async function d(e="mainnet"){if(!r())throw new n.BrowserWalletNotInstalledError("Xverse not installed");return t.satsConnectWalletGetAddresses(i,t.Wallet.XVERSE,e)}async function u(e,{finalize:s=!0,extractTx:o=!0,network:l,inputsToSign:a}={network:"mainnet",inputsToSign:[]}){if(!r())throw new n.BrowserWalletNotInstalledError("Xverse not installed");return t.satsConnectWalletSignPsbt(i,e,t.Wallet.XVERSE,{finalize:s,extractTx:o,network:l,inputsToSign:a})}async function w(e,s,o="mainnet"){if(!r())throw new n.BrowserWalletNotInstalledError("Xverse not installed");return t.satsConnectWalletSignMessage(i,e,s,t.Wallet.XVERSE,o)}exports.getAddresses=d;exports.isInstalled=r;exports.signMessage=w;exports.signPsbt=u;
