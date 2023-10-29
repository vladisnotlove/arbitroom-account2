window.addEventListener("load", () => {
	document.querySelectorAll(".input-password").forEach((root) => {
		const input = root.querySelector("input");
		const eyeBtn = root.querySelector(".input-password__eye-btn");

		if (!input || !eyeBtn) return;

		const turnEyeOn = () => {
			root.classList.add("eye-on");
			root.classList.remove("eye-off");
			input.setAttribute("type", "text");
		};

		const turnEyeOff = () => {
			root.classList.remove("eye-on");
			root.classList.add("eye-off");
			input.setAttribute("type", "password");
		};

		eyeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			if (root.classList.contains("eye-on")) {
				turnEyeOff();
			} else {
				turnEyeOn();
			}
		});
	});
});
