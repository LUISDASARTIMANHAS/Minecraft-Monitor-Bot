/**
 * Gerenciador do objetivo atual da IA.
 *
 * Apenas um objetivo pode existir por vez.
 */
class GoalManager {
	constructor() {
		/**
		 * @type {string|null}
		 */
		this.goal = null;

		/**
		 * @type {boolean}
		 */
		this.running = false;

		/**
		 * @type {number|null}
		 */
		this.startedAt = null;
	}

	/**
	 * Define um novo objetivo.
	 *
	 * @param {string} goal
	 * @returns {void}
	 */
	set(goal) {
		this.goal = goal;
		this.running = true;
		this.startedAt = Date.now();
	}

	/**
	 * Remove o objetivo atual.
	 *
	 * @returns {void}
	 */
	clear() {
		this.goal = null;
		this.running = false;
		this.startedAt = null;
	}

	/**
	 * Retorna o objetivo atual.
	 *
	 * @returns {string|null}
	 */
	get() {
		return this.goal;
	}

	/**
	 * Verifica se existe um objetivo em execução.
	 *
	 * @returns {boolean}
	 */
	isRunning() {
		return this.running;
	}

	/**
	 * Verifica se o objetivo atual é o informado.
	 *
	 * @param {string} goal
	 * @returns {boolean}
	 */
	is(goal) {
		return this.goal === goal;
	}
}

module.exports = new GoalManager();
