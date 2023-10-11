type CssVariableName = "--animation-slow" | "--popper-viewport-padding";

const getCssVariable = (name: CssVariableName) => {
	return getComputedStyle(document.body).getPropertyValue(name);
};

export default getCssVariable;
