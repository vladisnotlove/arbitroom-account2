import { getRandomInt } from "utils/getRandomInt";

window.addEventListener("load", () => {
	document.querySelectorAll("[data-random-input]").forEach((element) => {
		const min = parseFloat(element.getAttribute("data-min") || "-1000");
		const max = parseFloat(element.getAttribute("data-max") || "1000");

		const input = element.querySelector(
			"input.random-input__input"
		) as HTMLInputElement;
		const button = element.querySelector(".random-input__button");

		if (!input || !button) return;

		button.addEventListener("click", () => {
			input.value = "" + getRandomInt(min, max);
		});
	});
});
