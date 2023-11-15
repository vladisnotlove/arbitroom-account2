window.addEventListener("load", () => {
	document.querySelectorAll(".top-partners").forEach((root) => {
		// table switch logic
		const toggleButtonGroup = root.querySelector(".toggle-button-group");
		const input = root.querySelector(".toggle-button-group input");
		const table = root.querySelector(".partners-table");

		if (input instanceof HTMLInputElement) {
			input.addEventListener("change", (e) => {
				const value = input.value;
				const source = toggleButtonGroup
					.querySelector(`[data-value="${value}"]`)
					.getAttribute("data-change-source");

				table.setAttribute("data-source", source);
			});
		}

		// expand / collapse logic
		const expandBtn = root.querySelector(".top-partners__expand-btn");
		const collapseBtn = root.querySelector(".top-partners__collapse-btn");

		if (expandBtn && collapseBtn) {
			expandBtn.addEventListener("click", () => {
				root.classList.add("expanded");
			});
			collapseBtn.addEventListener("click", () => {
				root.classList.remove("expanded");
			});
		}
	});
});
