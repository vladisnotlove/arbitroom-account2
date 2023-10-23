if (window.Chart) {
	const defaults = window.Chart.defaults;
	const overrides = window.Chart.overrides;

	defaults.font = {
		...defaults.font,
		family: "Golos",
		size: 9,
	};

	// bar

	defaults.borderColor = "transparent";
	defaults.scales.category = {
		...defaults.scales.category,
		grid: {
			display: false,
		},
	};

	// @ts-ignore
	defaults.scale = {
		...defaults.scale,
		grid: {
			...defaults.scale.grid,
			color: "rgba(255, 255, 255, 0.08)",
			tickColor: "transparent",
		},
		ticks: {
			...defaults.scale.ticks,
			color: "rgba(255, 255, 255, 0.32)",
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

	// doughnut
	defaults.datasets.doughnut = {
		...defaults.datasets.doughnut,
		borderColor: "transparent",
		spacing: 4,
	};

	overrides.doughnut = {
		...overrides.doughnut,
		radius: "100%",
		cutout: "84%",
	};

	defaults.aspectRatio = 1;
	defaults.plugins.legend.display = false;
}
