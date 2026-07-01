function crafterPlugin(bot) {
	bot.crafter = {
		/**
		 * Craft inteligente de qualquer item.
		 *
		 * @param {string} itemName
		 * @param {number} amount
		 * @returns {Promise<boolean>}
		 */
		async craft(itemName, amount = 1) {
			const item = bot.registry.itemsByName[itemName];

			if (!item) {
				console.log("[CRAFTER] Item inexistente:", itemName);
				return false;
			}

			const recipes = bot.recipesFor(item.id, null, amount, null);

			if (!recipes || recipes.length === 0) {
				console.log("[CRAFTER] Sem receita:", itemName);
				return false;
			}

			try {
				await bot.craft(recipes[0], amount, null);

				console.log(`[CRAFTER] Criado: ${itemName} x${amount}`);
				return true;
			} catch (err) {
				console.error("[CRAFTER] Erro ao craftar:", err.message);
				return false;
			}
		},

		/**
		 * Verifica se pode craftar (pré-check)
		 *
		 * @param {string} itemName
		 */
		canCraft(itemName) {
			const item = bot.registry.itemsByName[itemName];
			if (!item) return false;

			const recipes = bot.recipesFor(item.id, null, 1, null);
			return recipes && recipes.length > 0;
		},
	};
}

module.exports = crafterPlugin;
