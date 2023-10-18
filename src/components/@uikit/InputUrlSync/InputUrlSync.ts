const INPUT_VALUE_SEP = ",";

window.addEventListener("load", () => {
	const elements = document.querySelectorAll(".input-url-sync:not([data-url-sync-disabled])");

	const updateValue = (input: HTMLInputElement) => {
		const url = new URL(window.location.href);

		const paramValues = url.searchParams.getAll(input.name);
		const value = paramValues.join(INPUT_VALUE_SEP);

		if (input.value !== value) {
			input.setAttribute("value", value);
			input.dispatchEvent(new Event("change"));
		}
	};

	const updateUrl = (input: HTMLInputElement) => {
		const name = input.name;
		const value = input.value;

		const url = new URL(window.location.href);
		url.searchParams.set(name, value);

		if (window.location.href !== url.href) {
			window.localStorage.setItem("page-scroll-top", "" + document.documentElement.scrollTop);
			window.location.replace(url.href);
		}
	};

	elements.forEach((element) => {
		element.addEventListener("change", (e) => {
			if (!(e.currentTarget instanceof HTMLInputElement)) return;
			if (e.currentTarget.getAttribute("data-only-init") !== null) return;
			updateUrl(e.currentTarget);
		});
		if (element instanceof HTMLInputElement) updateValue(element);
	});

	window.addEventListener("locationchange", (e) => {
		elements.forEach((element) => {
			if (element instanceof HTMLInputElement) updateValue(element);
		});
	});

	const pageScrollTop = parseFloat(window.localStorage.getItem("page-scroll-top") || "0");
	document.documentElement.style.scrollBehavior = "auto";
	window.scrollTo({ top: pageScrollTop });
	document.documentElement.style.scrollBehavior = "";
});
