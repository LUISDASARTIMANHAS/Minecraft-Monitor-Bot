const collectWood = require("../skills/wood/collectWood");

const craftWoodPickaxe = require("../skills/crafting/craftWoodPickaxe");

const mineStone = require("../skills/mining/mineStone");

/**
 * @param {import('mineflayer').Bot} bot
 */
module.exports = async function survival(bot) {
	/*
	|--------------------------------------------------------------------------
	| SEM MADEIRA
	|--------------------------------------------------------------------------
	*/

	const hasLogs = bot.inventory.items().some((i) => i.name.includes("log"));

	if (!hasLogs) {
		console.log("[AI] Coletando madeira");

		await collectWood(bot);

		return;
	}

	/*
	|--------------------------------------------------------------------------
	| SEM PICARETA
	|--------------------------------------------------------------------------
	*/

	const hasPickaxe = bot.inventory
		.items()
		.some((i) => i.name === "wooden_pickaxe");

	if (!hasPickaxe) {
		console.log("[AI] Craftando picareta");

		await craftWoodPickaxe(bot);

		return;
	}

	/*
	|--------------------------------------------------------------------------
	| PEGAR PEDRA
	|--------------------------------------------------------------------------
	*/

	const hasCobble = bot.inventory.items().some((i) => i.name === "cobblestone");

	if (!hasCobble) {
		console.log("[AI] Minerando pedra");

		await mineStone(bot);
	}
};
