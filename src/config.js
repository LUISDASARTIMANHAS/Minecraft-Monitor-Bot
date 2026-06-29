require("dotenv").config();

/**
 * Configurações globais
 */
module.exports = {
	minecraft: {
		host: process.env.MC_HOST,
		port: Number(process.env.MC_PORT||25565),
		username: process.env.MC_USERNAME,
		version: false
	},

	viewer: {
		port: Number(process.env.VIEWER_PORT)
	},

	web: {
		port: Number(process.env.WEB_PORT)
	}
};