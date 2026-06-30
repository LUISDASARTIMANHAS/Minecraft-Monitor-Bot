module.exports = {
  bot: null,

  status: "offline", // offline | connecting | login | ready
  lastError: null,
  lastDisconnectReason: null,

  reconnectAttempts: 0,
  reconnectLock: false,

  setStatus(status) {
    this.status = status;
  },

  setError(err) {
    this.lastError = err?.message || err;
  },

  setDisconnect(reason) {
    this.lastDisconnectReason = reason;
  },

  reset() {
    this.bot = null;
    this.status = "offline";
    this.lastError = null;
    this.lastDisconnectReason = null;
  },
};