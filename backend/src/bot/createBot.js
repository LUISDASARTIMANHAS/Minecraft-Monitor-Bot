const mineflayer = require("mineflayer");
const { mineflayer: viewer } = require("prismarine-viewer");

// plugins
const armorManager = require("mineflayer-armor-manager");
const pathfinder = require("mineflayer-pathfinder").pathfinder;
const Movements = require("mineflayer-pathfinder").Movements;
const { GoalNear } = require("mineflayer-pathfinder").goals;
const pvp = require("mineflayer-pvp").plugin;
const collectBlock = require("mineflayer-collectblock").plugin;
const minerPlugin = require("./plugins/minerPlugin");
const crafterPlugin = require("./plugins/crafterPlugin");
const {
  StateTransition,
  BotStateMachine,
  EntityFilters,
  BehaviorFollowEntity,
  BehaviorLookAtEntity,
  BehaviorGetClosestEntity,
  NestedStateMachine,
} = require("mineflayer-statemachine");

const state = require("../state/botState");
const config = require("../../config");

const antiAfk = require("./plugins/antiAfk");
const movement = require("./movement");
const setupReconnect = require("./reconnect");
const setupCommands = require("./commands");
const brain = require("../ai/brain");

async function createBot() {
  const autoEatModule = await import("mineflayer-auto-eat");
  const autoEat = autoEatModule.loader;

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

  /*
  |--------------------------------------------------------------------------
  | CLIENT DEBUG
  |--------------------------------------------------------------------------
  */
  bot._client.on("connect", () => console.log("[CLIENT] TCP conectado"));
  bot._client.on("session", () => console.log("[CLIENT] Sessão iniciada"));
  bot._client.on("state", (s) => console.log("[CLIENT] Estado:", s));
  bot._client.on("disconnect", (p) => console.log("[CLIENT] Disconnect:", p));
  bot._client.on("end", (r) => console.log("[CLIENT] End:", r));
  bot._client.on("error", (e) => console.error("[CLIENT] Error:", e));

  setupReconnect(bot);

  /*
  |--------------------------------------------------------------------------
  | PLUGINS
  Os plugins e módulos adicionais do Mineflayer servem para expandir as capacidades nativas do bot
  |--------------------------------------------------------------------------
  */
  const plugins = [
    pathfinder,
    autoEat,
    pvp,
    collectBlock,
    armorManager,
    antiAfk,
    minerPlugin,
    crafterPlugin,
  ];
  console.log("[BOT] Carregando plugins...");
  for (const plugin of plugins) {
    console.log(
      "[BOT] Carregando plugin: ",
      plugin.name || plugin.constructor.name,
    );
    bot.loadPlugin(plugin);
  }

  console.log("[BOT] Plugins carregados!");
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */
  state.bot = bot;
  state.setStatus("connecting");

  /*
  |--------------------------------------------------------------------------
  | SPAWN
  |--------------------------------------------------------------------------
  */
  bot.once("spawn", () => {
    console.log(`[VIEWER] http://localhost:${config.viewer.port}`);
    console.log("[BOT] Spawnado");

    // ✅ RESET DO RECONNECT AQUI (IMPORTANTE)
    state.reconnectAttempts = 0;
    state.reconnectLock = false;

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

    bot.chat("Oi");
    brain(bot);
  });

  /*
  |--------------------------------------------------------------------------
  | LIFECYCLE
  |--------------------------------------------------------------------------
  */
  bot.on("login", () => state.setStatus("login"));

  bot.on("spawn", () => state.setStatus("ready"));

  bot.on("end", (reason) => {
    state.setStatus("offline");
    state.setDisconnect(reason);
    console.log("[BOT] End:", reason);
  });

  bot.on("kicked", (reason) => {
    state.setStatus("offline");
    state.setDisconnect(reason);
    console.log("[BOT] KICK:", reason);
  });

  bot.on("error", (err) => {
    state.setError(err);
    console.error("[BOT ERROR]", err);
  });

  return bot;
}

module.exports = createBot;
