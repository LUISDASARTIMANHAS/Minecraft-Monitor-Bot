const survival = require("./survival");

/**
 * Loop principal da IA
 *
 * @param {import('mineflayer').Bot} bot
 */
module.exports = function brain(bot) {
	setInterval(async () => {
		try {
			await survival(bot);
		} catch (err) {
			console.error("[AI]", err.message);
		}
	}, 5000);
};
