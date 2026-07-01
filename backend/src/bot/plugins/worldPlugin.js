/**
 * Plugin de percepção do mundo (READ ONLY).
 */
function worldPlugin(bot) {
	bot.world = {
		/**
		 * Procura bloco mais próximo
		 */
		findNearestBlock(blockNames, maxDistance = 32) {
			const names = Array.isArray(blockNames) ? blockNames : [blockNames];

			const ids = names
				.map((name) => bot.registry.blocksByName[name]?.id)
				.filter((id) => id !== undefined);

			if (!ids.length) return null;

			return (
				bot.findBlock({
					matching: ids,
					maxDistance,
				}) || null
			);
		},

		/**
		 * Procura múltiplos blocos
		 */
		findBlocks(blockNames, maxDistance = 32, count = 20) {
			const names = Array.isArray(blockNames) ? blockNames : [blockNames];

			const ids = names
				.map((name) => bot.registry.blocksByName[name]?.id)
				.filter((id) => id !== undefined);

			if (!ids.length) return [];

			return bot.findBlocks({
				matching: ids,
				maxDistance,
				count,
			});
		},

		/**
		 * Árvore
		 */
		findTree() {
			return this.findNearestBlock([
				"oak_log",
				"birch_log",
				"spruce_log",
				"jungle_log",
				"dark_oak_log",
				"acacia_log",
				"mangrove_log",
				"cherry_log",
			]);
		},

		findStone() {
			return this.findNearestBlock(["stone", "deepslate"]);
		},

		findCoal() {
			return this.findNearestBlock(["coal_ore", "deepslate_coal_ore"]);
		},

		findIron() {
			return this.findNearestBlock(["iron_ore", "deepslate_iron_ore"]);
		},

		findCraftingTable() {
			return this.findNearestBlock("crafting_table");
		},

		findFurnace() {
			return this.findNearestBlock("furnace");
		},

		distanceTo(block) {
			if (!block) return null;
			return bot.entity.position.distanceTo(block.position);
		},
	};
}

module.exports = worldPlugin;
