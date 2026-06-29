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
  console.log("======================================");
  console.log("[BOT] Criando conexão...");
  console.log("[BOT] Configuração:");

  console.table({
    host: config.minecraft.host,
    port: config.minecraft.port,
    username: config.minecraft.username,
    version: config.minecraft.version || "auto",
    physicsEnabled: true,
    checkTimeoutInterval: 60000,
  });

  const bot = mineflayer.createBot({
    host: config.minecraft.host,
    port: config.minecraft.port,
    username: config.minecraft.username,
    version: config.minecraft.version,
    physicsEnabled: true,
    checkTimeoutInterval: 60000,
  });

  console.log("[BOT] Instância criada");
  console.log("======================================");

  bot._client.on("connect", () => {
    console.log("[CLIENT] TCP conectado");
  });

  bot._client.on("session", () => {
    console.log("[CLIENT] Sessão iniciada");
  });

  bot._client.on("state", (state) => {
    console.log("[CLIENT] Estado:", state);
  });

  bot._client.on("disconnect", (packet) => {
    console.log("[CLIENT] Disconnect:", packet);
  });

  bot._client.on("end", (reason) => {
    console.log("[CLIENT] End:", reason);
  });

  bot._client.on("error", (err) => {
    console.error("[CLIENT] Error:", err);
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

  bot.on("login", () => {
    console.log("[BOT] Login");
  });

  bot.on("spawn", () => {
    console.log("[BOT] Spawn");
  });

  bot.on("end", (reason) => {
    console.log("[BOT] End:", reason);
  });

  bot.on("kicked", (reason, loggedIn) => {
    console.log("[BOT] KICK");
    console.log(reason);
    console.log("loggedIn:", loggedIn);
  });

  bot.on("error", (err) => {
    console.error(err);
  });

  return bot;
}

module.exports = createBot;
