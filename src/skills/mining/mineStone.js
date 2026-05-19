const { goals } = require("mineflayer-pathfinder");

/**
 * @param {import('mineflayer').Bot} bot
 */
module.exports = async function mineStone(bot) {
	const stone = bot.findBlock({
		matching: (block) => block.name === "stone",

		maxDistance: 64,
	});

	if (!stone) {
		console.log("[MINE] Pedra não encontrada");

		return;
	}

	await bot.pathfinder.goto(
		new goals.GoalNear(stone.position.x, stone.position.y, stone.position.z, 1),
	);

	await bot.dig(stone);

	console.log("[MINE] Pedra minerada");
};
