const { Server } = require("socket.io");

const state = require("../state/botState");

/**
 * @param {import('http').Server} server
 */
module.exports = function setupSocket(server) {

	const io = new Server(server, {
		cors: {
			origin: "*"
		}
	});

	io.on("connection", (socket) => {

		console.log("[WEB] Cliente conectado");

		/*
		|--------------------------------------------------------------------------
		| BOT
		|--------------------------------------------------------------------------
		*/

		const bot = state.bot;

		if (!bot) {
			console.log("[WEB] Bot inexistente");
			return;
		}

		/*
		|--------------------------------------------------------------------------
		| CHAT WEB -> MC
		|--------------------------------------------------------------------------
		*/

		socket.on("chat", (message) => {

			if (!message?.trim()) return;

			bot.chat(message);

		});

		/*
		|--------------------------------------------------------------------------
		| CHAT MC -> WEB
		|--------------------------------------------------------------------------
		*/

		const onChat = (username, message) => {

			socket.emit("chatMessage", {
				username,
				message,
				time: Date.now()
			});

		};

		bot.on("chat", onChat);

		/*
		|--------------------------------------------------------------------------
		| STATUS LOOP
		|--------------------------------------------------------------------------
		*/

		const statusInterval = setInterval(() => {

			if (!bot.entity) return;

			socket.emit("statusUpdate", {

				health: bot.health,

				food: bot.food,

				level: bot.experience.level,

				position: {
					x: bot.entity.position.x.toFixed(2),
					y: bot.entity.position.y.toFixed(2),
					z: bot.entity.position.z.toFixed(2)
				}

			});

		}, 1000);

		/*
		|--------------------------------------------------------------------------
		| INVENTORY
		|--------------------------------------------------------------------------
		*/

		const sendInventory = () => {

			socket.emit(
				"inventoryUpdate",

				bot.inventory.items().map(item => ({
					name: item.name,
					count: item.count,
					slot: item.slot
				}))
			);

		};

		bot.inventory.on(
			"updateSlot",
			sendInventory
		);

		sendInventory();

		/*
		|--------------------------------------------------------------------------
		| DISCONNECT
		|--------------------------------------------------------------------------
		*/

		socket.on("disconnect", () => {

			console.log(
				"[WEB] Cliente desconectado"
			);

			clearInterval(statusInterval);

			bot.removeListener(
				"chat",
				onChat
			);

			bot.inventory.removeListener(
				"updateSlot",
				sendInventory
			);

		});

	});

};