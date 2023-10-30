import { closeModal, openModal } from "./helpers";

window.addEventListener("load", () => {
	document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
		const modalQuery = trigger.getAttribute("data-open-modal");
		const modals = Array.from(document.querySelectorAll(modalQuery));

		const allModals = document.querySelectorAll(".modal");

		if (trigger && modals.length > 0) {
			trigger.addEventListener("click", () => {
				allModals.forEach((modal) => closeModal(modal));
				modals.forEach((modal) => openModal(modal));
			});
		}
	});
});
