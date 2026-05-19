/**
 * Movimentação aleatória
 *
 * @param {import('mineflayer').Bot} bot
 */
module.exports = function movement(bot) {
  const actions = [
    "forward",
    "back",
    "left",
    "right"
  ];

  setInterval(() => {
    const action =
      actions[
        Math.floor(Math.random() * actions.length)
      ];

    bot.clearControlStates();

    bot.setControlState(action, true);

    setTimeout(() => {
      bot.clearControlStates();
    }, 2000);

  }, 15000);
};