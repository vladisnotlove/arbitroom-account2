window.addEventListener("load", () => {
	const headerTitle = document.querySelector("#header .header__title");

	if (headerTitle instanceof HTMLElement) {
		new ResizeObserver(() => {
			if (headerTitle.scrollWidth > headerTitle.clientWidth) {
				headerTitle.classList.add("overflow");
			} else {
				headerTitle.classList.remove("overflow");
			}
		}).observe(headerTitle);
	}
});
