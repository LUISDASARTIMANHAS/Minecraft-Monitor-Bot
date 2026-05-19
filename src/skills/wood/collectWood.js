const { goals } = require("mineflayer-pathfinder");

/**
 * @param {import('mineflayer').Bot} bot
 */
module.exports = async function collectWood(bot) {
  const log = bot.findBlock({
    matching: (block) => block.name.includes("log"),

    maxDistance: 64,
  });

  if (!log) {
    console.log("[WOOD] Nenhuma árvore");

    return;
  }

  console.log("[WOOD] Indo até árvore");

  await bot.pathfinder.goto(
    new goals.GoalNear(log.position.x, log.position.y, log.position.z, 1),
  );

  console.log("[WOOD] Quebrando madeira");

  await bot.dig(log);
};
