const goalManager = require("./goalManager");

/**
 * Decide qual deve ser o próximo objetivo da IA.
 *
 * Este módulo NÃO executa ações.
 * Apenas define um objetivo para o planner executar.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {string|null}
 */
module.exports = function survival(bot) {
	/*
	|--------------------------------------------------------------------------
	| Já existe um objetivo em execução
	|--------------------------------------------------------------------------
	*/

	if (goalManager.isRunning()) {
		return goalManager.get();
	}

	const items = bot.inventory.items();

	/*
	|--------------------------------------------------------------------------
	| Madeira
	|--------------------------------------------------------------------------
	*/

	const hasLogs = items.some((item) => item.name.includes("log"));

	if (!hasLogs) {
		goalManager.set("collect_logs");
		return goalManager.get();
	}

	/*
	|--------------------------------------------------------------------------
	| Picareta de madeira
	|--------------------------------------------------------------------------
	*/

	const hasWoodPickaxe = items.some((item) => item.name === "wooden_pickaxe");

	if (!hasWoodPickaxe) {
		goalManager.set("craft_wooden_pickaxe");
		return goalManager.get();
	}

	/*
	|--------------------------------------------------------------------------
	| Pedra
	|--------------------------------------------------------------------------
	*/

	const hasCobblestone = items.some((item) => item.name === "cobblestone");

	if (!hasCobblestone) {
		goalManager.set("mine_cobblestone");
		return goalManager.get();
	}

	/*
	|--------------------------------------------------------------------------
	| Nenhum objetivo
	|--------------------------------------------------------------------------
	*/

	return null;
};
