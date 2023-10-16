const getFinishDate = (el: Element) => {
	const str = el.getAttribute("data-timer-finish-date");
	const finishDate = str ? new Date(str) : undefined;

	return finishDate;
};

const getFormat = (el: Element) => {
	const str = el.getAttribute("data-timer-format");

	return str || "hhhh:mm:ss";
};

const updateTimer = ({
	timer,
	daysContainer,
	hoursContainer,
	minutesContainer,
	secondsContainer,
}: {
	timer: Element;
	daysContainer?: Element | null;
	hoursContainer?: Element | null;
	minutesContainer?: Element | null;
	secondsContainer?: Element | null;
}): {
	isFinished: boolean;
} => {
	const finishDate = getFinishDate(timer);
	const format = getFormat(timer);

	if (!finishDate) {
		return {
			isFinished: true,
		};
	}

	const finish = finishDate.getTime();
	const now = Date.now();
	let diff = finish - now;
	diff = diff > 0 ? diff : 0;

	let seconds = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
	let minutes = String(Math.floor(diff / (60 * 1000)) % 60).padStart(2, "0");
	let allhours = Math.floor(diff / (60 * 60 * 1000));
	let hours = String(Math.floor(allhours % 24)).padStart(2, "0");
	let days = Math.floor(diff / (60 * 60 * 1000 * 24));

	if (daysContainer) {
		daysContainer.textContent = "" + days;
	}

	if (hoursContainer) {
		hoursContainer.textContent = "" + hours;
	}

	if (minutesContainer) {
		minutesContainer.textContent = "" + minutes;
	}

	if (secondsContainer) {
		secondsContainer.textContent = "" + seconds;
	}

	if (!daysContainer && !hoursContainer && !minutesContainer && !secondsContainer) {
		timer.textContent = format
			.replace("dd", "" + days)
			.replace("hhhh", "" + allhours)
			.replace("hh", "" + hours)
			.replace("mm", "" + minutes)
			.replace("ss", "" + seconds);
	}

	return {
		isFinished: diff === 0,
	};
};

window.addEventListener("load", () => {
	const timers = document.querySelectorAll(".timer");

	timers.forEach((timer) => {
		const finishDate = getFinishDate(timer);
		if (!finishDate) {
			console.error("timer has no finish date", timer);
			return;
		}

		const daysContainer = timer.querySelector("[data-timer-days]");
		const hoursContainer = timer.querySelector("[data-timer-hours]");
		const minutesContainer = timer.querySelector("[data-timer-minutes]");
		const secondsContainer = timer.querySelector("[data-timer-seconds]");

		window.setInterval(() => {
			updateTimer({ timer, daysContainer, hoursContainer, minutesContainer, secondsContainer });
		}, 1000);

		updateTimer({ timer, daysContainer, hoursContainer, minutesContainer, secondsContainer });
	});
});
