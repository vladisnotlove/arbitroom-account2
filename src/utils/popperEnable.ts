import type { Instance } from "@popperjs/core";

const enablePopper = (popper: Instance) => {
	popper.setOptions((options) => ({
		...options,
		modifiers: [...(options.modifiers || []), { name: "eventListeners", enabled: true }],
	}));

	popper.update();
};

const disablePopper = (popper: Instance) => {
	popper.setOptions((options) => ({
		...options,
		modifiers: [...(options.modifiers || []), { name: "eventListeners", enabled: false }],
	}));
};

export { enablePopper, disablePopper };
