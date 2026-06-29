const createBot = require("./bot/createBot");
const startWebServer = require("./web/server");

const state = require("./state/botState");

startWebServer();

state.bot = createBot();
