/**
 * Sistema anti AFK
 *
 * @param {import('mineflayer').Bot} bot
 */
module.exports = function antiAfk(bot) {
  setInterval(() => {
    bot.setControlState("jump", true);

    setTimeout(() => {
      bot.setControlState("jump", false);
    }, 500);

  }, 30000);
};