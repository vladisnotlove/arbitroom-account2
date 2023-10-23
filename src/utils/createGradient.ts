function createGradient(
	startColor: string,
	endColor: string,
	options: { height?: number; startPercent?: number } = {}
) {
	const height = options.height ?? 260;
	const startPercent = options.startPercent ?? 0;

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, 0, height);
	gradient.addColorStop(startPercent, startColor);
	gradient.addColorStop(1, endColor);
	canvas.remove();
	return gradient;
}

export default createGradient;
