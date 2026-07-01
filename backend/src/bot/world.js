/**
 * Consulta do mundo.
 *
 * Este módulo apenas consulta informações do ambiente.
 * Nenhuma função modifica o mundo.
 */

/**
 * Procura o bloco mais próximo pelo nome.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string|string[]} blockNames
 * @param {number} [maxDistance=32]
 * @returns {import("prismarine-block").Block|null}
 */
function findNearestBlock(bot, blockNames, maxDistance = 32) {
  const names = Array.isArray(blockNames) ? blockNames : [blockNames];

  const ids = names
    .map((name) => bot.registry.blocksByName[name]?.id)
    .filter((id) => id !== undefined);

  if (!ids.length) {
    return null;
  }

  return (
    bot.findBlock({
      matching: ids,
      maxDistance,
    }) || null
  );
}

/**
 * Procura vários blocos.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string|string[]} blockNames
 * @param {number} [maxDistance=32]
 * @param {number} [count=20]
 * @returns {import("prismarine-block").Block[]}
 */
function findBlocks(bot, blockNames, maxDistance = 32, count = 20) {
  const names = Array.isArray(blockNames) ? blockNames : [blockNames];

  const ids = names
    .map((name) => bot.registry.blocksByName[name]?.id)
    .filter((id) => id !== undefined);

  if (!ids.length) {
    return [];
  }

  return bot.findBlocks({
    matching: ids,
    maxDistance,
    count,
  });
}

/**
 * Procura uma árvore.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-block").Block|null}
 */
function findNearestTree(bot) {
  return findNearestBlock(bot, [
    "oak_log",
    "birch_log",
    "spruce_log",
    "jungle_log",
    "dark_oak_log",
    "acacia_log",
    "mangrove_log",
    "cherry_log",
  ]);
}

/**
 * Procura pedra.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-block").Block|null}
 */
function findStone(bot) {
  return findNearestBlock(bot, ["stone", "deepslate"]);
}

/**
 * Procura carvão.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-block").Block|null}
 */
function findCoalOre(bot) {
  return findNearestBlock(bot, ["coal_ore", "deepslate_coal_ore"]);
}

/**
 * Procura ferro.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-block").Block|null}
 */
function findIronOre(bot) {
  return findNearestBlock(bot, ["iron_ore", "deepslate_iron_ore"]);
}

/**
 * Procura crafting table.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-block").Block|null}
 */
function findCraftingTable(bot) {
  return findNearestBlock(bot, "crafting_table");
}

/**
 * Procura furnace.
 *
 * @param {import("mineflayer").Bot} bot
 * @returns {import("prismarine-block").Block|null}
 */
function findFurnace(bot) {
  return findNearestBlock(bot, "furnace");
}

/**
 * Distância entre o bot e um bloco.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {import("prismarine-block").Block|null} block
 * @returns {number|null}
 */
function distanceTo(bot, block) {
  if (!block) {
    return null;
  }

  return bot.entity.position.distanceTo(block.position);
}

module.exports = {
  findNearestBlock,
  findBlocks,

  findNearestTree,

  findStone,
  findCoalOre,
  findIronOre,

  findCraftingTable,
  findFurnace,

  distanceTo,
};
