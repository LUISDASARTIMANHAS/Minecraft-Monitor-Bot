const express = require("express");
const http = require("http");
const path = require("path");

const setupSocket = require("./socket");

const config = require("../config");

module.exports = function startWebServer() {

	const app = express();

	const server = http.createServer(app);

	setupSocket(server);

	app.use(express.static(
		path.join(__dirname, "public")
	));

	server.listen(config.web.port, "::", () => {
		console.log(
			`[WEB] http://localhost:${config.web.port}`
		);
	});

};