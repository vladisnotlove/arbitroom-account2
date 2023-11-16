import { Picker } from "emoji-mart";

window.addEventListener("load", () => {
	document.querySelectorAll(".emoji-picker").forEach((root) => {
		const locale = root.getAttribute("data-locale") || "ru";
		const picker = new Picker({
			onEmojiSelect: (data: any) => {
				const customEvent = new CustomEvent("emoji-select", { detail: { data: data.native } });
				root.dispatchEvent(customEvent);
			},
			data: async () => {
				const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

				return response.json();
			},
			locale,
			theme: "dark",
			previewPosition: "none",
		});
		// @ts-ignore
		root.appendChild(picker);
	});
});
