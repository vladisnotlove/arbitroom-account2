const isModal = (element: Element) => {
	return element.classList.contains("modal");
};

export const getModalParent = (element: Element): Element | null => {
	return element.closest(".modal");
};

export const openModal = (modal: Element) => {
	if (!isModal(modal)) {
		console.warn(`It is not a modal`, modal);
	}
	document.documentElement.classList.add("modal-open");
	modal.classList.add("open");
};

export const closeModal = (modal: Element) => {
	if (!isModal(modal)) {
		console.warn(`It is not a modal`, modal);
	}
	document.documentElement.classList.remove("modal-open");
	modal.classList.remove("open");
};
