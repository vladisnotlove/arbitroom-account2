type CssVariableName = "--animation-normal" | "--animation-slow" | "--popper-viewport-padding";

const getCssVariable = (name: CssVariableName) => {
	return getComputedStyle(document.body).getPropertyValue(name);
};

export default getCssVariable;
