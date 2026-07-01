const survival = require("./survival");
const goalManager = require("./goalManager");
const actionQueue = require("../state/actionQueue");

/**
 * Loop principal da IA.
 *
 * @param {import("mineflayer").Bot} bot
 */
module.exports = async function brain(bot) {
  if (actionQueue.isRunning()) return;

  if (actionQueue.hasPending()) {
    await actionQueue.runNext();
    return;
  }

  const goal = survival(bot);
  if (!goal) return;

  console.log(`[AI] Objetivo: ${goal}`);

  switch (goal) {
    case "collect_logs":
      actionQueue.add("collect_logs", async () => {
        await bot.miner.mine("oak_log");
        goalManager.clear();
      });
      break;

    case "craft_wooden_pickaxe":
      actionQueue.add("craft_wooden_pickaxe", async () => {
        await bot.crafter.craft("wooden_pickaxe");
        goalManager.clear();
      });
      break;

    case "mine_cobblestone":
      actionQueue.add("mine_cobblestone", async () => {
        await bot.miner.mine("stone");
        goalManager.clear();
      });
      break;

    default:
      console.warn(`[AI] Objetivo desconhecido: ${goal}`);
      goalManager.clear();
      return;
  }

  await actionQueue.runNext();
};
