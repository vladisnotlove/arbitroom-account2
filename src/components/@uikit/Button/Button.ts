window.addEventListener("load", () => {
	document.querySelectorAll(".button").forEach((element) => {
		element.addEventListener("click", () => console.log("click"));
	});
});
