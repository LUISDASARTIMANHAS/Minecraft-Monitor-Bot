const mineflayer = require("mineflayer");
const { mineflayer: viewer } = require("prismarine-viewer");

const config = require("../config");

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

		monitorPosition(bot);
		bot.chat("Monitor online");
	});

	bot.on("chat", (username, message) => {
		console.log(`[CHAT] ${username}: ${message}`);
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

/**
 * Monitora posição do bot
 * Detecta quedas, prisão ou travamento
 *
 * @param {import('mineflayer').Bot} bot
 */
function monitorPosition(bot) {
	setInterval(() => {
		if (!bot.entity) return;

		const pos = bot.entity.position;

		console.log(
			`[POS] X=${pos.x.toFixed(2)} Y=${pos.y.toFixed(2)} Z=${pos.z.toFixed(2)}`,
		);
	}, 10000);
}

module.exports = createBot;
