const addOnFontsLoad = (
	fonts: string[],
	callback: () => void,
	options: {
		maxCheckTime?: number;
	} = {}
) => {
	const maxCheckTime = options.maxCheckTime ?? 10000;
	const startTime = performance.now();

	const intervalId = setInterval(() => {
		const loaded = fonts.reduce((loaded, font) => {
			return loaded && document.fonts.check(font);
		}, true);

		if (loaded) {
			callback();
			clearInterval(intervalId);
		} else {
			const currentTime = performance.now();
			if (currentTime - startTime > maxCheckTime) {
				clearInterval(intervalId);
			}
		}
	}, 100);
};

export default addOnFontsLoad;
