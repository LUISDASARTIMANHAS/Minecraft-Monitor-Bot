const express = require("express");
const http = require("http");
const path = require("path");

const config = require("../backend/config");

const app = express();

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));

server.listen(config.web.port, "::", () => {
  console.log(`[WEB] http://localhost:${config.web.port}`);
});
