window.addEventListener("load", () => {
	document.querySelectorAll(".textarea-autosize").forEach((root) => {
		if (!(root instanceof HTMLTextAreaElement)) {
			console.error("Element with class 'textarea-autosize' is not textarea", root);
			return;
		}

		root.addEventListener("input", () => {
			const maxHeight = parseFloat(root.dataset.textareaAutosizeMaxWidth || "0");
			const initialHeight = root.style.height;

			console.log(initialHeight);

			root.style.height = "auto";

			if (maxHeight > 0 && root.scrollHeight < maxHeight) {
				root.style.height = root.scrollHeight + "px";
				root.style.overflowY = "hidden";
			} else {
				root.style.height = initialHeight;
				root.style.overflowY = "auto";
			}
		});
	});
});
