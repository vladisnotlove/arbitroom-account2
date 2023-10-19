window.addEventListener("load", () => {
	document.querySelectorAll("[data-switch-classes]").forEach((root) => {
		const classNames = root.getAttribute("data-switch-classes").split(" ");
		const targetQuery = root.getAttribute("data-target");
		const targets = document.querySelectorAll(targetQuery);
		const sourceQuery = root.getAttribute("data-source");
		const sources = root.querySelectorAll(sourceQuery);

		sources.forEach((source, sourceIndex) => {
			source.addEventListener("click", () => {
				targets.forEach((target) => {
					classNames.forEach((className, classNameIndex) => {
						// set classname
						if (sourceIndex === classNameIndex) {
							target.classList.add(className);
						} else {
							target.classList.remove(className);
						}
					});
				});
			});
		});
	});
});
