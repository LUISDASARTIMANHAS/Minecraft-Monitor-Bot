const tasks = {
	collect_logs: require("./tasks/collectLogs"),
	craft_wooden_pickaxe: require("./tasks/craftWoodenPickaxe"),
	mine_cobblestone: require("./tasks/mineCobblestone"),
};

/**
 * Executa o objetivo solicitado.
 *
 * O planner apenas localiza a Task responsável.
 * Toda a lógica fica dentro da Task.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string|null} goal
 * @returns {Promise<boolean>}
 */
module.exports = async function planner(bot, goal) {
	if (!goal) {
		return false;
	}

	const task = tasks[goal];

	if (!task) {
		console.warn(`[PLANNER] Task inexistente: ${goal}`);
		return false;
	}

	console.log(`[PLANNER] ${goal}`);

	await task(bot);

	return true;
};
