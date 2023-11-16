window.addEventListener("load", () => {
	document.querySelectorAll("[data-change-attribute]").forEach((elem) => {
		if (!(elem instanceof HTMLElement)) return;
		const attributeName = elem.dataset.changeAttribute;
		const attributeValue = elem.dataset.attributeValue;
		const selector = elem.dataset.target;
		const targets = selector ? document.querySelectorAll(selector) : undefined;

		if (attributeName && targets) {
			elem.addEventListener("click", (e) => {
				targets.forEach((target) => {
					target.setAttribute(attributeName, attributeValue);
				});
			});
		}
	});
});
