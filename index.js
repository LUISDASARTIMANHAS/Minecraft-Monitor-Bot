require("./backend/socket");
require("./frontend/server");
const createBot = require("./backend/src/bot/createBot");
// const startWebServer = require("./web/server");
const state = require("./backend/src/state/botState");

state.bot = createBot();
