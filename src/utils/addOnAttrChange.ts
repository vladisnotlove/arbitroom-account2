const addOnAttrChange = <T extends string>(element: Element, attrName: T, callback: (attr: string | null) => void) => {
	let prevAttr = element.getAttribute(attrName);

	const observer = new MutationObserver((mutationList) => {
		const attr = element.getAttribute(attrName);

		if (attr !== prevAttr) {
			callback(attr);
		}
		prevAttr = attr;
	});

	observer.observe(element, {
		attributes: true,
		attributeFilter: [attrName],
	});

	return () => {
		observer.disconnect();
	};
};

export default addOnAttrChange;
