window.addEventListener("load", () => {
	document.querySelectorAll(".input").forEach((root) => {
		const input = root.querySelector("input");

		if (!input) return;

		root.addEventListener("click", () => {
			input.focus();
		});
		input.addEventListener("focus", () => {
			input.classList.add("focus");
		});
		input.addEventListener("blur", () => {
			input.classList.remove("focus");
		});
	});
});
