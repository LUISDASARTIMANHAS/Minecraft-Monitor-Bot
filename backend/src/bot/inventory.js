/**
 * Utilidades para consulta do inventário do bot.
 *
 * Este módulo NÃO altera o inventário.
 * Apenas consulta informações.
 */

/**
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-item").Item[]}
 */
function items(bot) {
	return bot.inventory.items();
}

/**
 * Verifica se existe um item.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} itemName
 * @returns {boolean}
 */
function has(bot, itemName) {
	return items(bot).some((item) => item.name === itemName);
}

/**
 * Conta quantos itens existem.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} itemName
 * @returns {number}
 */
function count(bot, itemName) {
	return items(bot)
		.filter((item) => item.name === itemName)
		.reduce((total, item) => total + item.count, 0);
}

/**
 * Procura um item.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} itemName
 * @returns {import("prismarine-item").Item|null}
 */
function find(bot, itemName) {
	return items(bot).find((item) => item.name === itemName) || null;
}

/**
 * Procura qualquer item que contenha um texto.
 *
 * Exemplo:
 *
 * contains(bot, "log")
 *
 * retorna oak_log, spruce_log...
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} text
 * @returns {boolean}
 */
function contains(bot, text) {
	return items(bot).some((item) => item.name.includes(text));
}

/**
 * Conta itens cujo nome contém um texto.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} text
 * @returns {number}
 */
function countContains(bot, text) {
	return items(bot)
		.filter((item) => item.name.includes(text))
		.reduce((total, item) => total + item.count, 0);
}

/**
 * Verifica se o bot possui uma ferramenta.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {"wooden"|"stone"|"iron"|"golden"|"diamond"|"netherite"} material
 * @param {"pickaxe"|"axe"|"shovel"|"hoe"|"sword"} tool
 * @returns {boolean}
 */
function hasTool(bot, material, tool) {
	return has(bot, `${material}_${tool}`);
}

/**
 * Lista todos os nomes dos itens.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {string[]}
 */
function names(bot) {
	return items(bot).map((item) => item.name);
}

/**
 * Lista resumida do inventário.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {Array<{name:string,count:number}>}
 */
function summary(bot) {
	return items(bot).map((item) => ({
		name: item.name,
		count: item.count,
	}));
}

module.exports = {
	items,
	has,
	hasTool,
	count,
	find,
	contains,
	countContains,
	names,
	summary,
};
