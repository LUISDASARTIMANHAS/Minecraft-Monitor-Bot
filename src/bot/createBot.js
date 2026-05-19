const mineflayer = require("mineflayer");

const { mineflayer: viewer } = require("prismarine-viewer");

const { pathfinder } = require("mineflayer-pathfinder");

const pvp = require("mineflayer-pvp").plugin;

const collectBlock = require("mineflayer-collectblock").plugin;

const state = require("../state/botState");

const config = require("../config");

const antiAfk = require("./antiAfk");

const movement = require("./movement");

const setupReconnect = require("./reconnect");

const setupCommands = require("./commands");

/**
 * Cria bot
 *
 * @returns {Promise<import('mineflayer').Bot>}
 */
async function createBot() {
  /*
	|--------------------------------------------------------------------------
	| IMPORT ESM
	|--------------------------------------------------------------------------
	*/

  const autoEatModule = await import("mineflayer-auto-eat");
  const autoEat = autoEatModule.loader;

  /*
	|--------------------------------------------------------------------------
	| BOT
	|--------------------------------------------------------------------------
	*/

  const bot = mineflayer.createBot({
    host: config.minecraft.host,

    port: config.minecraft.port,

    username: config.minecraft.username,

    version: config.minecraft.version,
  });

  setupReconnect(bot);

  /*
	|--------------------------------------------------------------------------
	| PLUGINS
	|--------------------------------------------------------------------------
	*/

  bot.loadPlugin(pathfinder);

  bot.loadPlugin(pvp);

  bot.loadPlugin(autoEat);

  bot.loadPlugin(collectBlock);

  /*
	|--------------------------------------------------------------------------
	| STATE
	|--------------------------------------------------------------------------
	*/

  state.bot = bot;

  /*
	|--------------------------------------------------------------------------
	| SPAWN
	|--------------------------------------------------------------------------
	*/

  bot.once("spawn", () => {
    console.log(`[VIEWER] http://localhost:${config.viewer.port}`);

    console.log("[BOT] Spawnado");

    viewer(bot, {
      port: config.viewer.port,

      firstPerson: true,

      host: "::",
    });

    bot.autoEat.options = {
      priority: "foodPoints",

      startAt: 14,

      bannedFood: [],
    };

    antiAfk(bot);

    movement(bot);

    setupCommands(bot);

    bot.chat("Assistente online");
  });

  /*
	|--------------------------------------------------------------------------
	| EVENTS
	|--------------------------------------------------------------------------
	*/

  bot.on("kicked", console.log);

  bot.on("error", (err) => {
    console.error("[ERROR]", err.message);
  });

  return bot;
}

module.exports = createBot;
