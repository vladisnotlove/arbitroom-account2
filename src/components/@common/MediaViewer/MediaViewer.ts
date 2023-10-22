window.addEventListener("load", () => {
	const mediaViewer = document.querySelector(".media-viewer");
	const nextButton = mediaViewer?.querySelector(".media-viewer__next");
	const prevButton = mediaViewer?.querySelector(".media-viewer__prev");

	if (mediaViewer && nextButton && prevButton) {
		let mediaIndex = 0;

		const close = () => {
			mediaViewer.classList.remove("open");
			document.documentElement.classList.remove("media-viewer-open");
		};

		const open = (img: HTMLImageElement) => {
			const downloadImage = mediaViewer.querySelector(".media-viewer__download-image");
			const image = mediaViewer.querySelector(".media-viewer__image");
			const downloadHref = img.getAttribute("data-download-url") ?? img.src;
			const previewSrc = img.src;
			const currentIndex = Array.from(document.querySelectorAll("[data-viewable]")).findIndex(
				(item) => item === img
			);

			if (downloadImage && image && previewSrc && downloadHref && currentIndex !== -1) {
				downloadImage.setAttribute("href", downloadHref);
				image.setAttribute("src", previewSrc);
				mediaIndex = currentIndex;

				mediaViewer.classList.add("open");
				document.documentElement.classList.add("media-viewer-open");
			}
		};

		const openNext = () => {
			const medias = document.querySelectorAll("[data-viewable]");
			const nextMedia = medias[mediaIndex + 1];

			if (nextMedia && nextMedia instanceof HTMLImageElement) {
				mediaIndex++;
				open(nextMedia);
			}
		};

		const openPrev = () => {
			const medias = document.querySelectorAll("[data-viewable]");
			const prevMedia = medias[mediaIndex - 1];

			if (prevMedia && prevMedia instanceof HTMLImageElement) {
				mediaIndex--;
				open(prevMedia);
			}
		};

		mediaViewer.addEventListener("click", (e) => {
			const target = e.target;
			if (
				target instanceof Element &&
				(target.classList.contains("media-viewer") || target.classList.contains("media-viewer__body"))
			) {
				close();
			}
		});
		nextButton.addEventListener("click", openNext);
		prevButton.addEventListener("click", openPrev);

		document.documentElement.addEventListener("click", (e) => {
			const target = e.target;
			if (target instanceof HTMLImageElement && target.hasAttribute("data-viewable")) {
				open(target);
			}
		});
	}
});
