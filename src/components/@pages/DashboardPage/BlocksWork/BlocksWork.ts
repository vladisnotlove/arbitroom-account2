import createGradient from "utils/createGradient";

type TBlockWorksData = {
	green: {
		yUnit: string;
		x: number[];
		y: number[];
	};
	blue: {
		yUnit: string;
		x: number[];
		y: number[];
	};
	purple: {
		yUnit: string;
		x: number[];
		y: number[];
	};
};

const varintToColors: Record<string, { gradientStart: string; gradientEnd: string }> = {
	green: {
		gradientStart: "#25FF01",
		gradientEnd: "#25FF011F",
	},
	blue: {
		gradientStart: "#01E0FF",
		gradientEnd: "#01E0FF1F",
	},
	purple: {
		gradientStart: "#AB29FA",
		gradientEnd: "#AB29FA1F",
	},
};

window.addEventListener("load", () => {
	const root = document.getElementById("blocksWork");
	const sourceUrl = root.getAttribute("data-source");
	const tabs = root.querySelectorAll(".blocks-work__tab");
	const chart = root.querySelector(".blocks-work__chart");

	if (!sourceUrl || !window.Chart || !tabs || !(chart instanceof HTMLCanvasElement)) return;

	fetch(sourceUrl)
		.then((response) => response.json())
		.then((allData: TBlockWorksData) => {
			let chartInstance;

			const updateChartData = (tab: Element) => {
				const variant = tab.getAttribute("data-variant");
				const data = allData[variant];

				if (!data) return;

				const { gradientStart, gradientEnd } = varintToColors[variant];

				if (chartInstance !== undefined) {
					chartInstance.data.labels = data.x;
					chartInstance.data.datasets = [
						{
							data: data.y,
							backgroundColor: createGradient(gradientStart, gradientEnd),
						},
					];
					chartInstance.update();
				} else {
					chartInstance = new window.Chart(chart, {
						type: "bar",
						data: {
							labels: data.x,
							datasets: [
								{
									data: data.y,
									backgroundColor: createGradient(gradientStart, gradientEnd),
								},
							],
						},
						options: {
							scales: {
								y: {
									ticks: {
										callback: (value) => `${value} ${data.yUnit}`,
										maxTicksLimit: 11,
									},
								},
							},
							responsive: true,
							maintainAspectRatio: false,
						},
					});
				}
			};

			tabs.forEach((tab) => {
				if (tab.classList.contains("active")) {
					// change chart data
					updateChartData(tab);
				}

				tab.addEventListener("click", () => {
					// set active tab
					tabs.forEach((tab) => tab.classList.remove("active"));
					tab.classList.add("active");

					// change chart data
					updateChartData(tab);
				});
			});
		});
});
