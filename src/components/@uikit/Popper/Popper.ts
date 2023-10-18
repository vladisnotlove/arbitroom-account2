import { createPopper, Instance } from "@popperjs/core";
import getCssVariable from "utils/getCssVariable";

window.addEventListener("load", () => {
	const POPPER_VIEWPORT_PADDING = getCssVariable("--popper-viewport-padding");
	const ANIMATION_SLOW_MS = parseFloat(getCssVariable("--animation-slow")) * 1000;

	document.querySelectorAll(".popper").forEach((popperElement) => {
		if (!(popperElement instanceof HTMLElement)) return;

		const onHover = !!popperElement.getAttribute("data-popper-on-hover");
		const anchorElementQuery = popperElement.getAttribute("data-popper-anchor-element");
		const anchorElement = document.querySelector(anchorElementQuery);
		const closeElements = popperElement.querySelectorAll("[data-popper-close-element]");

		if (!anchorElement) console.warn(popperElement, "has no 'data-popper-anchor-element'");

		let overlay: HTMLElement | undefined;
		let popper: Instance | undefined;
		let closingTimeout: number | undefined;

		const openPopper = (currentAnchorElement: HTMLElement, options: { disableOverlay?: boolean } = {}) => {
			const disableOverlay = options.disableOverlay ?? false;
			clearTimeout(closingTimeout);
			if (!popper)
				popper = createPopper(currentAnchorElement, popperElement, {
					strategy: "fixed",
					modifiers: [
						{
							name: "preventOverflow",
							options: {
								altAxis: true,
								padding: POPPER_VIEWPORT_PADDING,
							},
						},
					],
				});
			if (!options.disableOverlay) {
				overlay = document.createElement("div");
				overlay.classList.add("popper-overlay");
				overlay.addEventListener("click", closePopper);
				document.body.prepend(overlay);
			}
			popperElement.classList.add("open");
		};
		const closePopper = () => {
			if (overlay) {
				overlay.remove();
				overlay = undefined;
			}
			popperElement.classList.remove("open");
			clearTimeout(closingTimeout);
			closingTimeout = window.setTimeout(() => {
				popper?.destroy();
				popper = undefined;
			}, ANIMATION_SLOW_MS);
		};

		if (onHover) {
			anchorElement.addEventListener("mouseenter", (e) => {
				const isOpen = popperElement.classList.contains("open");
				if (!isOpen) {
					openPopper(e.currentTarget as HTMLElement, { disableOverlay: true });
				}
			});
			anchorElement.addEventListener("mouseenter", (e) => {});
			anchorElement.addEventListener("mouseleave", () => {
				const isOpen = popperElement.classList.contains("open");
				if (isOpen) {
					closePopper();
				}
			});
		} else {
			closeElements.forEach((closeElement) => {
				closeElement.addEventListener("click", closePopper);
			});
			anchorElement.addEventListener("click", (e) => {
				const isOpen = popperElement.classList.contains("open");
				if (!isOpen) {
					openPopper(e.currentTarget as HTMLElement);
				} else {
					closePopper();
				}
			});
			window.addEventListener("blur", () => {
				closePopper();
			});
		}
	});
});
