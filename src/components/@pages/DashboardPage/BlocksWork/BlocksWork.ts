type TData = {
	yUnit: string;
	x: number[];
	y: number[];
};

const varintToColors: Record<string, [string, string] | undefined> = {
	green: ["#25FF01", "#25FF011F"],
	blue: ["#01E0FF", "#01E0FF1F"],
	purple: ["#AB29FA", "#AB29FA1F"],
};

function createGradient(startColor: string, endColor: string) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, 0, 260);
	gradient.addColorStop(0, startColor);
	gradient.addColorStop(1, endColor);
	canvas.remove();
	return gradient;
}

window.addEventListener("load", () => {
	const root = document.getElementById("blocksWork");

	// set tabs logic
	const tabs = root.querySelectorAll(".blocks-work__tab");
	const contents = root.querySelectorAll(".blocks-work__tab-content");

	tabs.forEach((tab, index) => {
		const content = contents[index];
		tab.addEventListener("click", () => {
			tabs.forEach((tab) => tab.classList.remove("active"));
			contents.forEach((content) => content.classList.remove("active"));

			tab.classList.add("active");
			content.classList.add("active");
		});
	});

	// set charts logic
	const charts = root.querySelectorAll(".blocks-work__chart");
	charts.forEach((chart) => {
		const sourceUrl = chart.getAttribute("data-source");
		const variant = chart.getAttribute("data-variant");

		if (!sourceUrl || !variant || !(chart instanceof HTMLCanvasElement)) return;

		fetch(sourceUrl)
			.then((response) => response.json())
			.then((data: TData) => {
				if (window.Chart) {
					const colors = varintToColors[variant];
					new window.Chart(chart, {
						type: "bar",
						data: {
							labels: data.x,
							datasets: [
								{
									data: data.y,
									backgroundColor: colors ? createGradient(...colors) : undefined,
								},
							],
						},
					});
				}
			});
	});
});
