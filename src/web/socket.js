const { Server } = require("socket.io");
const state = require("../state/botState");

function getSnapshot() {
  const bot = state.bot;

  return {
    system: {
      status: state.status,
      error: state.lastError,
      disconnectReason: state.lastDisconnectReason || null,
      time: Date.now(),
    },

    bot: {
      online: !!bot,
      inGame: !!bot?.entity,
      health: bot?.health ?? null,
      food: bot?.food ?? null,
      level: bot?.experience?.level ?? null,

      position: bot?.entity
        ? {
            x: bot.entity.position.x.toFixed(2),
            y: bot.entity.position.y.toFixed(2),
            z: bot.entity.position.z.toFixed(2),
          }
        : null,

      inventory: bot?.inventory
        ? bot.inventory.items().map((item) => ({
            name: item.name,
            count: item.count,
            slot: item.slot,
          }))
        : [],
    },
  };
}

module.exports = function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("[socket.io] Cliente conectado");

    /*
    |--------------------------------------------------------------------------
    | CHAT -> MC
    |--------------------------------------------------------------------------
    */
    socket.on("chat", (message) => {
      const bot = state.bot;

      if (!bot?.chat) {
        console.log("[socket.io] Bot ainda não pronto");
        return;
      }

      if (!message?.trim()) return;

      bot.chat(message);
    });

    /*
    |--------------------------------------------------------------------------
    | CHAT MC -> FRONT
    |--------------------------------------------------------------------------
    */
    const onChat = (username, message) => {
      socket.emit("chatMessage", {
        username,
        message,
        time: Date.now(),
      });
    };

    const bindChat = () => {
      const bot = state.bot;
      if (!bot?.on) return;

      bot.on("chat", onChat);
    };

    bindChat();

    /*
    |--------------------------------------------------------------------------
    | SNAPSHOT LOOP
    |--------------------------------------------------------------------------
    */
    const interval = setInterval(() => {
      socket.emit("snapshot", getSnapshot());
    }, 1000);

    /*
    |--------------------------------------------------------------------------
    | DISCONNECT
    |--------------------------------------------------------------------------
    */
    socket.on("disconnect", () => {
      console.log("[socket.io] Cliente desconectado");

      clearInterval(interval);

      const bot = state.bot;

      if (bot?.removeListener) {
        bot.removeListener("chat", onChat);
      }
    });
  });
};