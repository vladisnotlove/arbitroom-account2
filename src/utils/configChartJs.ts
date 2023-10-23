if (window.Chart) {
	const defaults = window.Chart.defaults;

	defaults.font = {
		...defaults.font,
		family: "Golos",
		size: 9,
	};

	defaults.animations = {};

	defaults.borderColor = "transparent";
	defaults.scales.category = {
		...defaults.scales.category,
		grid: {
			display: false,
		},
	};
	defaults.scale = {
		...defaults.scale,
		grid: {
			...defaults.scale.grid,
			color: "rgba(255, 255, 255, 0.08)",
			tickColor: "transparent",
		},
	};

	defaults.datasets.bar = {
		...defaults.datasets.bar,
		barPercentage: 0.75,
		maxBarThickness: 16,
	};

	defaults.elements.bar = {
		...defaults.elements.bar,
		borderRadius: 16,
	};

	defaults.aspectRatio = 1;
	defaults.plugins.legend.display = false;
}
