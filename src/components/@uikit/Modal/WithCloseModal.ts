import { closeModal, getModalParent } from "./helpers";

window.addEventListener("load", () => {
	document.querySelectorAll("[data-close-modal]").forEach((trigger) => {
		const modalQuery = trigger.getAttribute("data-close-modal");
		const modals = modalQuery ? Array.from(document.querySelectorAll(modalQuery)) : [getModalParent(trigger)];

		if (trigger && modals.length > 0) {
			trigger.addEventListener("click", () => {
				modals.forEach((modal) => closeModal(modal));
			});
		}
	});
});
