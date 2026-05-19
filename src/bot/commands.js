/**
 * Comandos automáticos
 *
 * @param {import('mineflayer').Bot} bot
 */
module.exports = function commands(bot) {
	bot.on("messagestr", (message) => {
		console.log("[MSG]", message);

		if (message.includes("/register")) {
			bot.chat("/register senha123 senha123");
		}

		if (message.includes("/login")) {
			bot.chat("/login senha123");
		}
	});
};
