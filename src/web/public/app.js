const socket = io();

const statusEl = document.getElementById("status");
const inventoryEl = document.getElementById("inventory");

const chatInput = document.getElementById("chatInput");

chatInput.addEventListener("keydown", (e) => {
	if (e.key !== "Enter") return;

	socket.emit("chat", chatInput.value);

	chatInput.value = "";
});

socket.on("status", (data) => {
	statusEl.innerHTML = `
		<p><b>Vida:</b> ${data.health}</p>
		<p><b>Fome:</b> ${data.food}</p>
		<p><b>XP:</b> ${data.level}</p>

		<p>
			<b>Posição:</b><br>

			X: ${data.position.x}<br>
			Y: ${data.position.y}<br>
			Z: ${data.position.z}
		</p>
	`;

	inventoryEl.innerHTML = "";

	data.inventory.forEach((item) => {
		inventoryEl.innerHTML += `
			<div class="inventory-item">
				${item.name} x${item.count}
			</div>
		`;
	});
});
