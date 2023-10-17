window.addEventListener("load", () => {
	const stopCoef = 0.95;

	document.querySelectorAll("[data-drag-scroll]").forEach((element) => {
		if (!(element instanceof HTMLElement)) return;

		// for grab
		let startPos = {
			top: 0,
			left: 0,
			x: 0,
			y: 0,
		};
		let pos = {
			top: 0,
			left: 0,
			x: 0,
			y: 0,
		};
		let prevPos = { ...pos };
		let isGrabbed = false;

		// for intertia
		let transform = { x: 0, y: 0 };

		const onMouseDown = (e: MouseEvent) => {
			startPos = {
				left: element.scrollLeft,
				top: element.scrollTop,
				x: e.clientX,
				y: e.clientY,
			};
			pos = {
				...startPos,
			};
			prevPos = {
				...pos,
			};
			prevPos;
			isGrabbed = true;

			transform = {
				x: 0,
				y: 0,
			};

			element.style.cursor = "grabbing";
			element.style.userSelect = "none";
			element.querySelectorAll("img").forEach((img) => (img.draggable = false));

			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);

			requestAnimationFrame(move);
		};

		const onMouseMove = (e: MouseEvent) => {
			const dx = e.clientX - startPos.x;
			const dy = e.clientY - startPos.y;

			pos.left = startPos.left - dx;
			pos.top = startPos.top - dy;

			pos.x = e.clientX;
			pos.y = e.clientY;
		};

		const onMouseUp = (e: MouseEvent) => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			isGrabbed = false;

			element.style.cursor = "grab";
			element.style.removeProperty("user-select");

			requestAnimationFrame(moveByInertia);
		};

		const move = () => {
			if (!isGrabbed) return;

			transform = {
				x: prevPos.left - pos.left,
				y: prevPos.top - pos.top,
			};

			element.scrollTop = pos.top;
			element.scrollLeft = pos.left;

			prevPos = {
				...pos,
			};

			requestAnimationFrame(move);
		};

		const moveByInertia = () => {
			if (isGrabbed) return;
			if (Math.pow(transform.x, 2) + Math.pow(transform.y, 2) < 0.3) return;

			transform.x *= stopCoef;
			transform.y *= stopCoef;

			element.scrollLeft -= transform.x;
			element.scrollTop -= transform.y;

			requestAnimationFrame(moveByInertia);
		};

		const preventClickIfMove = (e: MouseEvent) => {
			const diff = {
				x: startPos.x - e.clientX,
				y: startPos.y - e.clientY,
			};
			const diffLength = Math.sqrt(diff.x * diff.x + diff.y * diff.y);

			if (diffLength > 4) {
				e.stopPropagation();
			}
		};

		element.style.cursor = "grab";
		element.addEventListener("mousedown", onMouseDown);
		element.addEventListener("click", preventClickIfMove, {
			capture: true,
		});
	});
});
