/**
 * Estado interno da Inteligência Artificial.
 *
 * Este módulo NÃO executa nenhuma ação.
 * Apenas armazena informações utilizadas pelos módulos da IA.
 */
class AIState {
	constructor() {
		this.reset();
	}

	/**
	 * Reinicia completamente o estado da IA.
	 *
	 * @returns {void}
	 */
	reset() {
		/**
		 * Objetivo atual.
		 * Ex.: collect_logs, craft_wooden_pickaxe...
		 *
		 * @type {string|null}
		 */
		this.goal = null;

		/**
		 * Nome da ação atualmente em execução.
		 *
		 * @type {string|null}
		 */
		this.currentAction = null;

		/**
		 * Última ação concluída.
		 *
		 * @type {string|null}
		 */
		this.lastAction = null;

		/**
		 * Indica se a IA está ocupada.
		 *
		 * @type {boolean}
		 */
		this.busy = false;

		/**
		 * Timestamp do último ciclo.
		 *
		 * @type {number}
		 */
		this.lastThink = 0;

		/**
		 * Timestamp da última ação executada.
		 *
		 * @type {number}
		 */
		this.lastActionTime = 0;

		/**
		 * Quantidade de tentativas por objetivo.
		 *
		 * Exemplo:
		 * {
		 *    collect_logs: 3
		 * }
		 *
		 * @type {Object<string, number>}
		 */
		this.retries = {};

		/**
		 * Cooldowns internos.
		 *
		 * Exemplo:
		 * {
		 *    collect_logs: 1712345678
		 * }
		 *
		 * @type {Object<string, number>}
		 */
		this.cooldowns = {};

		/**
		 * Memória temporária da IA.
		 *
		 * Pode armazenar qualquer informação útil.
		 *
		 * @type {Map<string, any>}
		 */
		this.memory = new Map();
	}

	/**
	 * Define o objetivo atual.
	 *
	 * @param {string|null} goal
	 */
	setGoal(goal) {
		this.goal = goal;
	}

	/**
	 * Obtém o objetivo atual.
	 *
	 * @returns {string|null}
	 */
	getGoal() {
		return this.goal;
	}

	/**
	 * Define a ação atual.
	 *
	 * @param {string|null} action
	 */
	setAction(action) {
		this.currentAction = action;
		this.busy = action !== null;
	}

	/**
	 * Finaliza a ação atual.
	 *
	 * @returns {void}
	 */
	finishAction() {
		this.lastAction = this.currentAction;
		this.currentAction = null;
		this.busy = false;
		this.lastActionTime = Date.now();
	}

	/**
	 * Incrementa uma tentativa.
	 *
	 * @param {string} key
	 */
	increaseRetry(key) {
		this.retries[key] = (this.retries[key] || 0) + 1;
	}

	/**
	 * Obtém número de tentativas.
	 *
	 * @param {string} key
	 * @returns {number}
	 */
	getRetry(key) {
		return this.retries[key] || 0;
	}

	/**
	 * Remove contador de tentativas.
	 *
	 * @param {string} key
	 */
	clearRetry(key) {
		delete this.retries[key];
	}

	/**
	 * Define um cooldown.
	 *
	 * @param {string} key
	 * @param {number} milliseconds
	 */
	setCooldown(key, milliseconds) {
		this.cooldowns[key] = Date.now() + milliseconds;
	}

	/**
	 * Verifica se ainda existe cooldown.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 */
	hasCooldown(key) {
		return (this.cooldowns[key] || 0) > Date.now();
	}
}

module.exports = new AIState();
