import type { Modifier } from "@popperjs/core";

export const sameWidth: Partial<Modifier<any, any>> = {
	name: "sameWidth",
	enabled: true,
	phase: "beforeWrite",
	requires: ["computeStyles"],
	fn: ({ state }: any) => {
		state.styles.popper.width = `${state.rects.reference.width}px`;
	},
	effect: ({ state }: any) => {
		state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
	},
};

export const createPlacementHandler = (
	onPlacementChange: (placement: string, element: HTMLElement) => void
): Partial<Modifier<any, any>> => {
	return {
		name: "placementHandler",
		enabled: true,
		phase: "beforeWrite",
		requires: ["computeStyles"],
		fn: ({ state }: any) => {
			onPlacementChange(state.placement, state.elements.popper);
		},
	};
};
