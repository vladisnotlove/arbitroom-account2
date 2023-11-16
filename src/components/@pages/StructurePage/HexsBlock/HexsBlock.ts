window.addEventListener("load", () => {
	const root = document.querySelector(".hexs-block");
	const navBtns = root.querySelectorAll(".hexs-block__navigation > .button");
	const hexs = root.querySelector(".hexs-block__hexs");

	if (!root || !navBtns || !hexs) return;

	navBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const source = btn.getAttribute("data-change-source");
			if (source) hexs.setAttribute("data-source", source);
		});
	});
});
