const addOnAttrChange = <T extends string>(
	element: Element,
	attrName: T,
	callback: (attr: string | null) => void,
	options: { callOnCreate?: boolean } = {}
) => {
	const callOnCreate = options.callOnCreate ?? false;
	let prevAttr = element.getAttribute(attrName);

	if (callOnCreate) {
		callback(prevAttr);
	}

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
