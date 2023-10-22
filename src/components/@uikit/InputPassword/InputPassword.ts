window.addEventListener("load", () => {
	document.querySelectorAll("input-password").forEach((root) => {
		const input = root.querySelector("input");
		const eyeBtn = root.querySelector(".input-password__eye-btn");

		if (!input || !eyeBtn) return;

		const turnEyeOn = () => {
			input.classList.add("eye-on");
			input.classList.remove("eye-off");
			input.setAttribute("type", "text");
		};

		const turnEyeOff = () => {
			input.classList.remove("eye-on");
			input.classList.add("eye-off");
			input.setAttribute("type", "password");
		};

		eyeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			if (input.classList.contains("eye-on")) {
				turnEyeOff();
			} else {
				turnEyeOn();
			}
		});
	});
});
