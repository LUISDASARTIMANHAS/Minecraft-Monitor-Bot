const inventory = require("../../bot/inventory");

/**
 * Banco de receitas simples (base inicial).
 * Depois vamos migrar isso para automático via bot.registry.
 */
const RECIPES = {
  wooden_planks: {
    requires: ["log"],
    result: "planks",
  },

  sticks: {
    requires: ["planks"],
    result: "stick",
  },

  wooden_pickaxe: {
    requires: ["stick", "planks"],
    result: "wooden_pickaxe",
  },
};

/**
 * Resolve dependências de crafting.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} itemName
 * @returns {Array<{name:string,run:Function}>}
 */
function resolve(bot, itemName) {
  const chain = [];

  const recipe = RECIPES[itemName];

  if (!recipe) {
    return chain;
  }

  for (const req of recipe.requires) {
    if (!inventory.has(bot, req)) {
      chain.push({
        name: `craft:${req}`,
        run: async () => {
          console.log(`[RECIPE] Precisa de: ${req}`);
        },
      });
    }
  }

  chain.push({
    name: `craft:${itemName}`,
    run: async () => {
      console.log(`[RECIPE] Craftando ${itemName}`);

      const item = bot.registry.itemsByName[itemName];

      if (!item) {
        throw new Error(`Item inexistente: ${itemName}`);
      }

      const recipes = bot.recipesFor(item.id, null, 1, null);

      if (!recipes.length) {
        throw new Error(`Sem receita para: ${itemName}`);
      }

      await bot.craft(recipes[0], 1, null);
    },
  });

  return chain;
}

module.exports = {
  resolve,
};
