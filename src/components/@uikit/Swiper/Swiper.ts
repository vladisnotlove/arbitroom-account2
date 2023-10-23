import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

window.addEventListener("load", () => {
	new Swiper(".swiper", {
		modules: [Navigation, Pagination],
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		loop: true,
	});
});
