window.addEventListener("load", () => {
	document.querySelectorAll(".active-blocks").forEach((root) => {
		// hide / show logic
		const showBtn = root.querySelector(".active-blocks__show-btn");
		const hideBtn = root.querySelector(".active-blocks__hide-btn");

		if (showBtn && hideBtn) {
			showBtn.addEventListener("click", () => {
				root.classList.add("expanded");
			});

			hideBtn.addEventListener("click", () => {
				root.classList.remove("expanded");
			});
		}

		// form logic
		const blocks = root.querySelectorAll(".active-blocks__block.inactive");
		const input = root.querySelector("input");
		const activeBtn = root.querySelector(".active-blocks__active-btn");

		if (blocks && input && activeBtn) {
			blocks.forEach((block) => {
				const selectBlock = () => {
					// set selected
					blocks.forEach((block) => block.classList.remove("selected"));
					block.classList.add("selected");

					// set value in input
					const value = block.getAttribute("data-value");
					if (value) {
						input.value = value;
						input.dispatchEvent(new Event("change")); // trigger change handlers
					}

					// enable button
					activeBtn.classList.remove("disabled");
				};

				const unselectBlock = () => {
					block.classList.remove("selected");
					input.value = "";
					input.dispatchEvent(new Event("change")); // trigger change handlers
					activeBtn.classList.add("disabled");
				};

				block.addEventListener("click", (e) => {
					e.stopPropagation();
					selectBlock();
				});

				document.addEventListener("click", (e) => {
					if (e.target instanceof HTMLElement && !e.target.closest(".active-blocks__active-btn")) {
						unselectBlock();
					}
				});
			});
		}
	});
});
