const { Server } = require("socket.io");

const state = require("../state/botState");

/**
 * @param {import('http').Server} server
 */
module.exports = function setupSocket(server) {
	const io = new Server(server, {
		cors: {
			origin: "*",
		},
	});

	io.on("connection", (socket) => {
		console.log("[WEB] Cliente conectado");

		socket.on("chat", (message) => {
			const bot = state.bot;

			if (!bot) return;

			bot.chat(message);
		});

		setInterval(() => {
			const bot = state.bot;

			if (!bot || !bot.entity) return;

			socket.emit("status", {
				health: bot.health,
				food: bot.food,
				level: bot.experience.level,

				position: {
					x: bot.entity.position.x.toFixed(2),
					y: bot.entity.position.y.toFixed(2),
					z: bot.entity.position.z.toFixed(2),
				},

				inventory: bot.inventory.items().map((item) => ({
					name: item.name,
					count: item.count,
				})),
			});
		}, 1000);
	});
};
