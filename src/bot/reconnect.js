const state = require("../state/botState");

function getDelay(attempt) {
  const base = 5000;
  const max = 60000;

  return Math.min(base * Math.pow(2, attempt), max);
}

module.exports = function setupReconnect(bot) {
  bot.on("end", async (reason) => {
    console.log("[BOT] Desconectado:", reason);

    state.setDisconnect(reason);
    state.setStatus("offline");

    if (state.reconnectLock) return;
    state.reconnectLock = true;

    state.reconnectAttempts++;

    const delay = getDelay(state.reconnectAttempts);

    console.log(`[BOT] Reconectando em ${delay / 1000}s...`);

    setTimeout(async () => {
      try {
        console.log("[BOT] Reiniciando bot...");

        state.reset();

        // 🔥 IMPORT CORRETO (SEM DESTRUCTURING)
        const createBot = require("./createBot");

        const newBot = await createBot();

        state.bot = newBot;

        state.reconnectLock = false;
      } catch (err) {
        console.error("[BOT] Falha no reconnect:", err);

        state.reconnectLock = false;

        setTimeout(() => {
          setupReconnect(bot);
        }, 5000);
      }
    }, delay);
  });
};