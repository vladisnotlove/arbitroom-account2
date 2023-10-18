const getFinishDate = (el: Element) => {
	const str = el.getAttribute("data-timer-finish-date");
	const finishDate = str ? new Date(str) : undefined;
	return finishDate;
};

const getFormat = (el: Element) => {
	const str = el.getAttribute("data-timer-format");
	return str || "hhhh:mm:ss";
};

const updateTimer = (timer: Element) => {
	const finishDate = getFinishDate(timer);
	const format = getFormat(timer);

	if (!finishDate) return;

	const finish = finishDate.getTime();
	const now = Date.now();
	let diff = finish - now;
	diff = diff > 0 ? diff : 0;

	let seconds = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
	let minutes = String(Math.floor(diff / (60 * 1000)) % 60).padStart(2, "0");
	let allhours = Math.floor(diff / (60 * 60 * 1000));
	let hours = String(Math.floor(allhours % 24)).padStart(2, "0");
	let days = Math.floor(diff / (60 * 60 * 1000 * 24));

	timer.textContent = format
		.replace("dd", "" + days)
		.replace("hhhh", "" + allhours)
		.replace("hh", "" + hours)
		.replace("mm", "" + minutes)
		.replace("ss", "" + seconds);
};

window.addEventListener("load", () => {
	const timers = document.querySelectorAll(".timer");

	timers.forEach((timer) => {
		const finishDate = getFinishDate(timer);
		if (!finishDate) {
			console.warn("timer has no finish date", timer);
			return;
		}

		window.setInterval(() => {
			updateTimer(timer);
		}, 1000);

		updateTimer(timer);
	});
});
