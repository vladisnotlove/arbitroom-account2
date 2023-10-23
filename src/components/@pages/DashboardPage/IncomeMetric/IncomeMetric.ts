import createGradient from "utils/createGradient";

type TIncomeMetricData = {
	yUnit: string;
	x: string[];
	greenY: number[];
	blueY: number[];
	purpleY: number[];
};

window.addEventListener("load", () => {
	const root = document.getElementById("incomeMetric");
	const chart = root.querySelector(".income-metric__chart");
	const sourceUrl = chart.getAttribute("data-source");

	if (!(chart instanceof HTMLCanvasElement) || !sourceUrl || !window.Chart) return;

	fetch(sourceUrl)
		.then((resp) => resp.json())
		.then((data: TIncomeMetricData) => {
			const avgGreenY = data.greenY.reduce((prev, curr) => prev + curr, 0) / data.greenY.length;
			const avgBlueY = data.blueY.reduce((prev, curr) => prev + curr, 0) / data.blueY.length;
			const avgPurpleY = data.purpleY.reduce((prev, curr) => prev + curr, 0) / data.purpleY.length;

			const maxY = Math.max(...data.greenY, ...data.blueY, ...data.purpleY);

			new window.Chart(chart, {
				type: "bar",
				data: {
					labels: data.x,
					datasets: [
						{
							data: data.greenY,
							backgroundColor: createGradient("#25FF01", "#25FF011F", { startPercent: 1 - avgGreenY / maxY }),
						},
						{
							data: data.blueY,
							backgroundColor: createGradient("#01E0FF", "#01E0FF1F", { startPercent: 1 - avgBlueY / maxY }),
						},
						{
							data: data.purpleY,
							backgroundColor: createGradient("#AB29FA", "#AB29FA1F", { startPercent: 1 - avgPurpleY / maxY }),
						},
					],
				},
				options: {
					scales: {
						y: {
							ticks: {
								callback: (value) => `${value} ${data.yUnit}`,
								maxTicksLimit: 10,
							},
						},
					},
					responsive: true,
					maintainAspectRatio: false,
				},
			});
		});
});
