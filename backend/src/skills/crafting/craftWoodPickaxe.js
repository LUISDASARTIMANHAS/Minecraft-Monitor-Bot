/**
 * @param {import('mineflayer').Bot} bot
 */
module.exports = async function craftWoodPickaxe(bot) {
	const item = bot.registry.itemsByName.wooden_pickaxe;

	if (!item) return;

	const recipe = bot.recipesFor(item.id, null, 1, null)[0];

	if (!recipe) {
		console.log("[CRAFT] Receita inexistente");

		return;
	}

	await bot.craft(recipe, 1, null);

	console.log("[CRAFT] Picareta criada");
};
