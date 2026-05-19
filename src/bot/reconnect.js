/**
 * Sistema de reconexão automática
 *
 * @param {import('mineflayer').Bot} bot
 */
module.exports = function reconnect(bot) {
  bot.on("end", () => {
    console.log("[BOT] Desconectado");

    setTimeout(() => {
      console.log("[BOT] Reconectando...");

      delete require.cache[
        require.resolve("./createBot")
      ];

      const createBot = require("./createBot");

      createBot();

    }, 5000);
  });
};