class s extends Error {
  constructor(r = "Request canceled by user.") {
    super(r), this.name = "BrowserWalletRequestCancelledByUserError";
  }
}
class t extends Error {
  constructor(r) {
    super(r), this.name = "BrowserWalletSigningError";
  }
}
export {
  s as B,
  t as a
};
