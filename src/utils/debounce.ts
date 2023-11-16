export function debounce<T extends Function>(cb: T, ms = 20) {
	let timeoutId = 0;
	let callable = (...args: any) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => cb(...args), ms);
	};
	return <T>(<any>callable);
}
