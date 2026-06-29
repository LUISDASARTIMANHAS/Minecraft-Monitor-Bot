/**
 * Sistema de reconexão automática
 *
 * @param {import('mineflayer').Bot} bot
 */
module.exports = function reconnect(bot) {
  bot.on("end", (reason) => {
    console.log("[BOT] Desconectado",reason);

    setTimeout(() => {
      console.log("[BOT] Reconectando...");

      delete require.cache[
        require.resolve("./createBot")
      ];

      const createBot = require("./createBot");

      createBot();

    }, 10*1000);
  });
};