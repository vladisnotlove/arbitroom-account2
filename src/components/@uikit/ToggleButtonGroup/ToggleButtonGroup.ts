// HELPERS

const setValue = (elements: { input: HTMLInputElement }, value: string) => {
	elements.input?.setAttribute("value", value);
	elements.input?.dispatchEvent(new Event("change"));
};

const updateActive = (elements: { toggleButtonGroup: HTMLElement; target?: Element[]; input: HTMLInputElement }) => {
	const value = elements.input.value;
	let activeIndex = 0;

	elements.toggleButtonGroup.querySelectorAll(".toggle-button").forEach((button, index) => {
		if (button.getAttribute("data-value") === value) {
			button.classList.add("active");
			activeIndex = index;
		} else {
			button.classList.remove("active");
		}
	});
	elements.target?.forEach((elem) => {
		Array.from(elem.children).forEach((child, index) => {
			if (index === activeIndex) {
				child.classList.add("active");
			} else {
				child.classList.remove("active");
			}
		});
	});
};

// MAIN

window.addEventListener("load", () => {
	document.querySelectorAll(".toggle-button-group:not([data-disable-js])").forEach((toggleButtonGroup) => {
		if (!(toggleButtonGroup instanceof HTMLElement)) {
			console.error(".toggleButtonGroup is not a HTMLElement", toggleButtonGroup);
			return;
		}

		const input = toggleButtonGroup.querySelector("input");
		const buttons = Array.from(toggleButtonGroup.querySelectorAll(".toggle-button"));

		const str = toggleButtonGroup.getAttribute("data-toggle-button-group-target");
		const target = str ? Array.from(document.querySelectorAll(str)) : undefined;

		toggleButtonGroup.addEventListener("click", (e) => {
			if (!(e.target instanceof HTMLElement) || !e.target.closest(".toggle-button")) return;

			const activeButton = e.target;
			const value = activeButton.getAttribute("data-value");

			// set value in input
			if (input && value !== null) {
				setValue({ input }, value);
			}

			// change active button
			buttons.forEach((button) => {
				if (button === activeButton) {
					button.classList.add("active");
				} else {
					button.classList.remove("active");
				}
			});

			// change active target
			if (target) {
				const activeIndex = buttons.findIndex((button) => button === activeButton);
				target.forEach((elem) => {
					Array.from(elem.children).forEach((child, index) => {
						if (index === activeIndex) {
							child.classList.add("active");
						} else {
							child.classList.remove("active");
						}
					});
				});
			}
		});

		if (input) {
			updateActive({ input, target, toggleButtonGroup });
			input.addEventListener("change", () => {
				updateActive({ input, target, toggleButtonGroup });
			});
		}
	});
});
