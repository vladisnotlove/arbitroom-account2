window.addEventListener("load", () => {
	document.querySelectorAll("[data-toggle-class]").forEach((elem) => {
		if (!(elem instanceof HTMLElement)) return;
		const className = elem.dataset.toggleClass;
		const selector = elem.dataset.target;
		const targets = selector ? document.querySelectorAll(selector) : undefined;

		if (className && targets) {
			elem.addEventListener("click", (e) => {
				targets.forEach((target) => {
					target.classList.toggle(className);
				});
			});
		}
	});
});
