const socket = io();

/*
|--------------------------------------------------------------------------
| ELEMENTOS
|--------------------------------------------------------------------------
*/

const statusEl = document.getElementById("status");

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
| STATUS
|--------------------------------------------------------------------------
*/
socket.on("statusUpdate", (data) => {
	document.getElementById("healthStat").innerText = data.health;

	document.getElementById("foodStat").innerText = data.food;

	document.getElementById("xpStat").innerText = data.level;

	document.getElementById("positionStat").innerHTML = `
		X: ${data.position.x}<br>
		Y: ${data.position.y}<br>
		Z: ${data.position.z}
	`;
});

/*
|--------------------------------------------------------------------------
| INVENTÁRIO
|--------------------------------------------------------------------------
*/

socket.on("inventoryUpdate", (inventory) => {
	inventoryEl.innerHTML = "";

	inventory.forEach((item) => {
		inventoryEl.innerHTML += `
			<div class="inventory-item">

				${escapeHtml(item.name)}

				x${item.count}

			</div>
		`;
	});
});

/*
|--------------------------------------------------------------------------
| CHAT
|--------------------------------------------------------------------------
*/

socket.on("chatMessage", (msg) => {
	const time = new Date(msg.time).toLocaleTimeString();

	chatBox.innerHTML += `
		<div class="chat-message">

			<span class="chat-time">
				[${time}]
			</span>

			<b>
				${escapeHtml(msg.username)}
			</b>:

			${escapeHtml(msg.message)}

		</div>
	`;

	chatBox.scrollTop = chatBox.scrollHeight;
});

/*
|--------------------------------------------------------------------------
| XSS Protection
|--------------------------------------------------------------------------
*/

/**
 * @param {string} unsafe
 * @returns {string}
 */
function escapeHtml(unsafe) {
	return String(unsafe)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}
