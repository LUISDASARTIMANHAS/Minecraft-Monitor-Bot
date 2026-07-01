require("./backend/socket");
require("./frontend/server");
const createBot = require("./backend/src/bot/createBot");
const state = require("./backend/src/state/botState");

state.bot = createBot();
