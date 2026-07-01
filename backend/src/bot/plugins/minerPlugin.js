/**
 * Plugin de mineração inteligente usando collectBlock.
 */
function minerPlugin(bot) {
  bot.miner = {
    /**
     * Minerar bloco pelo nome (API de alto nível)
     *
     * @param {string|string[]} blockNames
     * @param {number} maxDistance
     */
    async mine(blockNames, maxDistance = 32) {
      const names = Array.isArray(blockNames)
        ? blockNames
        : [blockNames];

      const block = bot.findBlock({
        matching: (b) => b && names.includes(b.name),
        maxDistance,
      });

      if (!block) {
        console.log("[MINER] Nenhum bloco encontrado:", names);
        return false;
      }

      try {
        await bot.collectBlock.collect(block);

        console.log("[MINER] Coletado:", block.name);

        return true;
      } catch (err) {
        console.error("[MINER] Erro ao coletar:", err.message);
        return false;
      }
    },

    /**
     * Minerar bloco específico já resolvido (baixo nível)
     *
     * @param {import("prismarine-block").Block} block
     */
    async mineBlock(block) {
      if (!block) return false;

      try {
        await bot.collectBlock.collect(block);

        console.log("[MINER] Bloco coletado:", block.name);

        return true;
      } catch (err) {
        console.error("[MINER] Falha:", err.message);
        return false;
      }
    },
  };
}

module.exports = minerPlugin;