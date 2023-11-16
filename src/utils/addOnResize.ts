import { throttle } from "utils/throttle";

const addOnResize = (element: Element, onResize: () => void, options: { throttle?: number } = {}) => {
	const resizeObserver = new ResizeObserver(throttle(onResize, options.throttle ?? 100));
	resizeObserver.observe(element);

	return () => {
		resizeObserver.unobserve(element);
	};
};

export default addOnResize;
