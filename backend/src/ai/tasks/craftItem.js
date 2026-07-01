const aiState = require("../../state/aiState");
const goalManager = require("../goalManager");

const recipes = require("./recipes");

/**
 * Task genérica de crafting.
 *
 * Resolve qualquer item automaticamente.
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} itemName
 * @param {number} [amount=1]
 * @returns {Promise<boolean>}
 */
module.exports = async function craftItem(bot, itemName, amount = 1) {
  aiState.setAction(`craft_${itemName}`);

  console.log(`[TASK] Crafting dinâmico: ${itemName}`);

  try {
    const recipeChain = recipes.resolve(bot, itemName);

    if (!recipeChain.length) {
      console.log("[CRAFT] Nenhuma receita encontrada");
      return false;
    }

    for (const step of recipeChain) {
      console.log(`[CRAFT] Executando etapa: ${step.name}`);

      await step.run(bot);
    }

    aiState.clearRetry(`craft_${itemName}`);
    goalManager.clear();

    return true;
  } catch (err) {
    console.error(`[CRAFT] Falha ao craftar ${itemName}`);
    console.error(err);

    aiState.increaseRetry(`craft_${itemName}`);

    return false;
  } finally {
    aiState.finishAction();
  }
};