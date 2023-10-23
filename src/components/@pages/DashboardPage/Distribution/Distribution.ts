type TDistributionData = Array<{ label: string; value: number; type: "green" | "blue" | "purple" | "other" }>;

const typeToColor: Record<string, string | undefined> = {
	green: "#25FF01",
	blue: "#01E0FF",
	purple: "#AB29FA",
	other: "#121212",
};

window.addEventListener("load", () => {
	const root = document.getElementById("distribution");
	const chart = root.querySelector(".distribution__chart");
	const sourceUrl = chart.getAttribute("data-source");

	if (!(chart instanceof HTMLCanvasElement) || !window.Chart || !sourceUrl) return;

	fetch(sourceUrl)
		.then((resp) => resp.json())
		.then((data: TDistributionData) => {
			new window.Chart(chart, {
				type: "doughnut",
				data: {
					labels: data.map((item) => item.label),
					datasets: [
						{
							data: data.map((item) => item.value),
							backgroundColor: data.map((item) => typeToColor[item.type]),
						},
					],
				},
			});
		});
});
