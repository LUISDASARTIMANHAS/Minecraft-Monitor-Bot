const socket = io();

const inventoryEl = document.getElementById("inventory");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");

/*
|--------------------------------------------------------------------------
| CHAT INPUT
|--------------------------------------------------------------------------
*/
chatInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const message = chatInput.value.trim();
  if (!message) return;

  socket.emit("chat", message);
  chatInput.value = "";
});

/*
|--------------------------------------------------------------------------
| SNAPSHOT (FULL UI)
|--------------------------------------------------------------------------
*/
socket.on("snapshot", (data) => {
  const system = data.system;
  const bot = data.bot;

  /*
  |--------------------------------------------------------------------------
  | SYSTEM STATUS
  |--------------------------------------------------------------------------
  */
  const systemEl = document.getElementById("systemStatus");

  const map = {
    offline: "OFFLINE",
    connecting: "CONECTANDO",
    login: "LOGIN",
    ready: "ONLINE",
    error: "ERRO",
  };

  systemEl.innerText = map[system.status] || "UNKNOWN";

  /*
  |--------------------------------------------------------------------------
  | BOT FLAGS
  |--------------------------------------------------------------------------
  */
  document.getElementById("onlineStat").innerText =
    bot.online ? "SIM" : "NÃO";

  document.getElementById("ingameStat").innerText =
    bot.inGame ? "SIM" : "NÃO";

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */
  document.getElementById("healthStat").innerText =
    bot.health ?? "--";

  document.getElementById("foodStat").innerText =
    bot.food ?? "--";

  document.getElementById("xpStat").innerText =
    bot.level ?? "--";

  /*
  |--------------------------------------------------------------------------
  | POSITION
  |--------------------------------------------------------------------------
  */
  const pos = document.getElementById("positionStat");

  if (bot.position) {
    pos.innerHTML = `
      X: ${bot.position.x}<br>
      Y: ${bot.position.y}<br>
      Z: ${bot.position.z}
    `;
  } else {
    pos.innerText = "--";
  }

  /*
  |--------------------------------------------------------------------------
  | INVENTORY
  |--------------------------------------------------------------------------
  */
  inventoryEl.innerHTML = "";

  (bot.inventory || []).forEach((item) => {
    inventoryEl.innerHTML += `
      <div class="inventory-item">
        ${escapeHtml(item.name)} x${item.count}
      </div>
    `;
  });

  /*
  |--------------------------------------------------------------------------
  | DEBUG (IMPORTANTE PRA VER SE TA CHEGANDO)
  |--------------------------------------------------------------------------
  */
  console.log("[SNAPSHOT RECEBIDO]", data);
});

/*
|--------------------------------------------------------------------------
| CHAT MC -> FRONT
|--------------------------------------------------------------------------
*/
socket.on("chatMessage", (msg) => {
  const time = new Date(msg.time).toLocaleTimeString();

  chatBox.innerHTML += `
    <div class="chat-message">
      <span class="chat-time">[${time}]</span>
      <b>${escapeHtml(msg.username)}</b>:
      ${escapeHtml(msg.message)}
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;
});

/*
|--------------------------------------------------------------------------
| SAFE HTML
|--------------------------------------------------------------------------
*/
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}