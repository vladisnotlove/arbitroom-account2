import createGradient from "utils/createGradient";

type TAvgIncomeData = {
	green: {
		x: number[];
		y: number[];
	};
	blue: {
		x: number[];
		y: number[];
	};
	purple: {
		x: number[];
		y: number[];
	};
};

const varintToColors: Record<string, { gradientStart: string; gradientEnd: string; border: string }> = {
	green: {
		gradientStart: "rgba(37, 255, 1, 0.40)",
		gradientEnd: "rgba(37, 255, 1, 0.00)",
		border: "#25FF01",
	},
	blue: {
		gradientStart: "rgba(1, 224, 255, 0.40)",
		gradientEnd: "rgba(1, 224, 255, 0.00)",
		border: "#01E0FF",
	},
	purple: {
		gradientStart: "rgba(171, 41, 250, 0.40)",
		gradientEnd: "rgba(171, 41, 250, 0.00)",
		border: "#AB29FA",
	},
};

window.addEventListener("load", () => {
	const root = document.getElementById("avgIncome");
	const sourceUrl = root.getAttribute("data-source");
	const charts = root.querySelectorAll(".avg-income__chart");

	if (!sourceUrl || !charts || !window.Chart) return;

	fetch(sourceUrl)
		.then((response) => response.json())
		.then((allData: TAvgIncomeData) => {
			charts.forEach((chart) => {
				const variant = chart.getAttribute("data-variant");

				if (!variant || !(chart instanceof HTMLCanvasElement)) return;

				const { gradientStart, gradientEnd, border } = varintToColors[variant];
				const data = allData[variant];

				new window.Chart(chart, {
					type: "line",
					data: {
						labels: data.x,
						datasets: [
							{
								data: data.y,
								backgroundColor: ({ chart }) => {
									const { chartArea } = chart;
									if (chartArea) {
										return createGradient(gradientStart, gradientEnd, { height: chartArea.height });
									}
								},
								borderColor: border,
								borderWidth: 2,
								pointRadius: 0,
								cubicInterpolationMode: "monotone",
								tension: 0.4,
								fill: true,
							},
						],
					},
					options: {
						interaction: {
							intersect: false,
							mode: "index",
						},
						scales: {
							x: {
								ticks: {
									display: false,
								},
								grid: {
									display: false,
								},
							},
							y: {
								ticks: {
									display: false,
								},
								grid: {
									display: false,
									offset: false,
								},
							},
						},
						responsive: true,
						aspectRatio: 4,
						maintainAspectRatio: false,
					},
				});
			});
		});
});
