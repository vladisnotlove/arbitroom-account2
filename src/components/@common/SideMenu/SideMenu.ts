window.addEventListener("load", () => {
	const sideMenu = document.getElementById("sideMenu");

	if (!sideMenu) return;

	const sideMenuBody = sideMenu.querySelector(".side-menu__body");
	const overlay = sideMenu.querySelector(".side-menu__overlay");
	const burger = document.querySelector("#header .header__burger-btn");

	// side-menu

	const openMenu = () => {
		if (sideMenu && burger && sideMenuBody) {
			sideMenuBody.scrollTop = 0;
			sideMenu.classList.add("open");
			burger.classList.add("open");
			document.documentElement.classList.add("side-menu-open");
		}
	};
	const closeMenu = () => {
		if (sideMenu && burger) {
			sideMenu.classList.remove("open");
			burger.classList.remove("open");
			document.documentElement.classList.remove("side-menu-open");
		}
	};
	const toggleMenu = () => {
		if (sideMenu.classList.contains("open")) {
			closeMenu();
		} else {
			openMenu();
		}
	};

	if (overlay) overlay.addEventListener("click", closeMenu);
	if (burger) burger.addEventListener("click", toggleMenu);

	// tab-group

	document.querySelectorAll(".tab-group").forEach((tabGroup) => {
		const label = tabGroup.querySelector(".tab-group__label");

		if (label)
			label.addEventListener("click", () => {
				tabGroup.classList.toggle("expanded");
			});
	});
});
