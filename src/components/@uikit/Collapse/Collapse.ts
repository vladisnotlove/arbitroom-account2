window.addEventListener("load", () => {
	try {
		document.querySelectorAll("[data-toggle-collapse]").forEach((trigger) => {
			if (!(trigger instanceof HTMLElement)) throw new Error("[data-toggle-collapse] is not HTMLElement");

			const str = trigger.getAttribute("data-toggle-collapse");
			const collapses = str ? document.querySelectorAll(str) : [];

			collapses.forEach((collapse) => {
				const content = collapse.querySelector(".collapse__content");

				if (!(collapse instanceof HTMLElement)) {
					throw new Error(`".collapse" is not HTMLElement`);
				}
				if (!(content instanceof HTMLElement)) {
					throw new Error(`Element ".collapse__content" is not found`);
				}

				collapse.style.height = "0px";
				collapse.style.overflow = "hidden";

				let heightAutoTimeout = -1;
				let collapseTimeout = -1;

				trigger.addEventListener("click", () => {
					const contentHeight = content.getBoundingClientRect().height;
					const animationTime = Math.sqrt(contentHeight) / 28;

					collapse.style.transition = `height ${animationTime}s`;

					clearTimeout(heightAutoTimeout);
					clearTimeout(collapseTimeout);

					if (trigger.classList.contains("expanded")) {
						collapse.style.height = contentHeight + "px";

						collapseTimeout = window.setTimeout(() => {
							trigger.classList.remove("expanded");
							collapse.classList.remove("expanded");
							collapse.style.height = "0";
						}, 1);
					} else {
						trigger.classList.add("expanded");
						collapse.classList.add("expanded");
						collapse.style.height = contentHeight + "px";

						heightAutoTimeout = window.setTimeout(() => {
							collapse.style.height = "auto";
						}, animationTime * 1000);
					}
				});
			});
		});
	} catch (e) {
		console.error(e);
	}
});
