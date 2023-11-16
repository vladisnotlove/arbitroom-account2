const { setSmartInveral, clearSmartInterval } = (() => {
	// state

	const runningSmartIntervals = new Set<number>();
	let lastId = 0;

	// main functions

	const setSmartInveral = (callback: () => void, ms: number): number => {
		const id = lastId + 1;
		lastId++;

		runningSmartIntervals.add(id);

		let intervalMs = ms;
		let intervalId = -1;

		const intervalCallback = () => {
			if (!runningSmartIntervals.has(id)) {
				clearInterval(intervalId);
				return;
			}
			const start = performance.now();
			callback();
			const finish = performance.now();
			const delta = finish - start;

			if (delta > intervalMs) {
				intervalMs = delta + ms;
				clearInterval(intervalId);
				intervalId = window.setInterval(intervalCallback, intervalMs);
			}
		};

		intervalId = window.setInterval(intervalCallback, intervalMs);

		return id;
	};

	const clearSmartInterval = (id: number) => {
		runningSmartIntervals.delete(id);
	};

	return { setSmartInveral, clearSmartInterval };
})();

export default setSmartInveral;
export { clearSmartInterval };
