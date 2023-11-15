import addOnAttrChange from "utils/addOnAttrChange";

type Partner = {
	name: string;
	registeredDate: string;
	status: string;
	level: 4;
	full: string;
	chatUrl: string;
};

const updateRowWithPartner = (row: Element, partner: Partner) => {
	row.querySelector('[data-name="name"] > .table__cell-value').textContent = partner.name;
	row.querySelector('[data-name="registeredDate"] > .table__cell-value').textContent = partner.registeredDate;
	row.querySelector('[data-name="status"] > .table__cell-value').textContent = partner.status;
	row.querySelector('[data-name="level"] > .table__cell-value').textContent = "" + partner.level;
	row.querySelector('[data-name="full"] > .table__cell-value').textContent = partner.full;
	row.querySelector('[data-name="chatUrl"] a').setAttribute("href", partner.chatUrl);
};

window.addEventListener("load", () => {
	document.querySelectorAll(".partners-table").forEach((root) => {
		const rows = root.querySelectorAll(".table__body .table__row");

		const loadSource = () => {
			const source = root.getAttribute("data-source");
			if (!source) return;

			fetch(source)
				.then((data) => data.json())
				.then((partners: Partner[]) => {
					try {
						for (let i = 0; i < partners.length && i < rows.length; i++) {
							const row = rows[i];
							const partner = partners[i];
							updateRowWithPartner(row, partner);
						}
						root.classList.remove("loading");
					} catch (e) {
						console.error(e);
					}
				});
		};

		addOnAttrChange(root, "data-source", () => {
			root.classList.add("loading");
			loadSource();
		});
		loadSource();
	});
});
