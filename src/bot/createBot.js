const mineflayer = require("mineflayer");
const { mineflayer: viewer } = require("prismarine-viewer");

const config = require("../config");

const state = require("../state/botState");
const antiAfk = require("./antiAfk");
const movement = require("./movement");
const setupReconnect = require("./reconnect");
const setupCommands = require("./commands");

/**
 * Cria e configura o bot
 * @returns {import('mineflayer').Bot}
 */
function createBot() {
  const bot = mineflayer.createBot({
    host: config.minecraft.host,
    port: config.minecraft.port,
    username: config.minecraft.username,
    version: config.minecraft.version,
  });

  setupReconnect(bot);

  bot.once("spawn", () => {
    console.log("[BOT] Spawnado");

    viewer(bot, {
      port: config.viewer.port,
      firstPerson: true,
      host: "::",
    });

    console.log(`[VIEWER] http://localhost:${config.viewer.port}`);

    antiAfk(bot);
    movement(bot);
    setupCommands(bot);

    bot.chat("Monitor online");
  });


  bot.on("chat", (username, message) => {
    const chatMessage = {
      username,
      message,
      time: Date.now(),
    };

    console.log(`[CHAT] ${username}: ${message}`);

    state.chat.push(chatMessage);

    if (state.chat.length > 100) {
      state.chat.shift();
    }
  });

  bot.on("health", () => {
    console.log(`[STATUS] Vida=${bot.health} Food=${bot.food}`);
  });

  bot.on("kicked", console.log);

  bot.on("error", (err) => {
    console.error("[ERROR]", err.message);
  });

  return bot;
}

module.exports = createBot;
