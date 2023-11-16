window.addEventListener("load", () => {
	const root = document.querySelector(".structure");
	const btns = root.querySelectorAll("[data-change-hexs-source]");
	const hexs = root.querySelector(".structure__hexs");

	if (!root || !btns || !hexs) return;

	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const source = btn.getAttribute("data-change-hexs-source");
			if (source) hexs.setAttribute("data-source", source);
		});
	});
});
