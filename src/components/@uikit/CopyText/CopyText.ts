import { Placement, createPopper, Instance } from "@popperjs/core";
import { createPlacementHandler } from "utils/popperModifiers";
import getCssVariable from "utils/getCssVariable";
import copyToClipboard from "utils/copyToClipboard";

const parsePlacement = (className: string): Placement | undefined => {
	return (className.match(/left|right|top|bottom/g) || [])[0] as Placement | undefined;
};

const SHOW_TIME_MS = 2000;

window.addEventListener("load", () => {
	const ANIMATION_SLOW_MS = parseFloat(getCssVariable("--animation-slow")) * 1000;

	document.querySelectorAll(".copy-text").forEach((copyText) => {
		const value = copyText.querySelector(".copy-text__value")?.textContent?.trim();
		const tooltip = copyText.querySelector(".copy-text__success-tooltip");

		if (!value || !(tooltip instanceof HTMLElement)) return;

		let popper: Instance | undefined;
		let hidingTimeout: number | undefined;
		let autoHidingTimeout: number | undefined;

		const showTooltip = () => {
			clearTimeout(hidingTimeout);
			popper = createPopper(copyText, tooltip, {
				placement: parsePlacement(tooltip.className) ?? "auto",
				strategy: "absolute",
				modifiers: [
					{
						name: "flip",
						options: {
							fallbackPlacements: ["auto"],
						},
					},
					createPlacementHandler((placement, element) => {
						element.classList.remove("top");
						element.classList.remove("left");
						element.classList.remove("right");
						element.classList.remove("bottom");
						element.classList.add(placement);
					}),
				],
			});
			tooltip.classList.add("show");
			tooltip.classList.remove("fade-out-slow");
		};

		const hideTooltip = (options: { rightNow?: boolean } = {}) => {
			clearTimeout(hidingTimeout);
			if (options.rightNow) {
				tooltip.classList.remove("show");
				tooltip.classList.remove("fade-out-slow");
			} else {
				tooltip.classList.add("fade-out-slow");
				hidingTimeout = window.setTimeout(() => {
					tooltip.classList.remove("show");
					tooltip.classList.remove("fade-out-slow");
					popper?.destroy();
				}, ANIMATION_SLOW_MS);
			}
		};

		const onClickOutside = (e: MouseEvent) => {
			if (e.target instanceof HTMLElement && e.target.closest(".copy-text") === copyText) return;
			hideTooltip({ rightNow: true });
			document.documentElement.removeEventListener("click", onClickOutside);
		};

		copyText.addEventListener("click", () => {
			copyToClipboard(value).then(() => {
				clearTimeout(autoHidingTimeout);
				showTooltip();
				autoHidingTimeout = window.setTimeout(() => {
					hideTooltip();
					document.documentElement.removeEventListener("click", onClickOutside);
				}, SHOW_TIME_MS);
			});
			document.documentElement.addEventListener("click", onClickOutside);
		});

		document.body.appendChild(tooltip);
	});
});
