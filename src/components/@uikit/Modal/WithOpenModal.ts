import { openModal } from "./helpers";

window.addEventListener("load", () => {
	document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
		const modalQuery = trigger.getAttribute("data-open-modal");
		const modals = Array.from(document.querySelectorAll(modalQuery));

		if (trigger && modals.length > 0) {
			trigger.addEventListener("click", () => {
				modals.forEach((modal) => openModal(modal));
			});
		}
	});
});
