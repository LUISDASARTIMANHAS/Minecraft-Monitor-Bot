/**
 * Fila simples de execução de ações da IA.
 *
 * Apenas uma ação pode ser executada por vez.
 */
class ActionQueue {
	constructor() {
		/**
		 * @type {Array<{
		 *   name: string,
		 *   action: Function
		 * }>}
		 */
		this.queue = [];

		/**
		 * Indica se uma ação está sendo executada.
		 *
		 * @type {boolean}
		 */
		this.running = false;
	}

	/**
	 * Adiciona uma ação à fila.
	 *
	 * @param {string} name
	 * @param {Function} action
	 * @returns {void}
	 */
	add(name, action) {
		this.queue.push({
			name,
			action,
		});
	}

	/**
	 * Executa a próxima ação da fila.
	 *
	 * @returns {Promise<boolean>}
	 */
	async runNext() {
		if (this.running) {
			return false;
		}

		const next = this.queue.shift();

		if (!next) {
			return false;
		}

		this.running = true;

		console.log(`[QUEUE] Executando: ${next.name}`);

		try {
			await next.action();
		} catch (err) {
			console.error(`[QUEUE] Erro em "${next.name}"`);
			console.error(err);
		} finally {
			this.running = false;
		}

		return true;
	}

	/**
	 * Limpa a fila.
	 *
	 * @returns {void}
	 */
	clear() {
		this.queue.length = 0;
	}

	/**
	 * Retorna a quantidade de ações pendentes.
	 *
	 * @returns {number}
	 */
	size() {
		return this.queue.length;
	}

	/**
	 * Verifica se existe alguma ação em andamento.
	 *
	 * @returns {boolean}
	 */
	isRunning() {
		return this.running;
	}

	/**
	 * Verifica se existem ações pendentes.
	 *
	 * @returns {boolean}
	 */
	hasPending() {
		return this.queue.length > 0;
	}
}

module.exports = new ActionQueue();
