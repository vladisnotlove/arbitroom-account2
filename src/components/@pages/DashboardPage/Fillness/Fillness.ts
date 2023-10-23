window.addEventListener("load", () => {
	document.querySelectorAll(".fillness__progress-value").forEach((root) => {
		if (root instanceof HTMLElement) {
			const percent = parseFloat(root.getAttribute("data-percent") || "0");
			const turn = 0.68 * percent * 0.01;
			root.style.webkitMaskImage = `conic-gradient(from -0.34turn, #000 0turn, #000 ${turn}turn, transparent ${turn}turn)`;
			root.style.maskImage = `conic-gradient(from -0.34turn, #000 0turn, #000 ${turn}turn, transparent ${turn}turn)`;
		}
	});
});
