import type { Chart } from "chart.js";

declare global {
	interface Window {
		Chart?: typeof Chart;
	}
}

export {};
