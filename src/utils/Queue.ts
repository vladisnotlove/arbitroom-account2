class QNode<T> {
	value: T;
	next: QNode<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}
}

class Queue<T> {
	first: QNode<T> | null;
	last: QNode<T> | null;
	size: number;

	constructor() {
		this.first = null;
		this.last = null;
		this.size = 0;
	}

	isEmpty() {
		return !this.size;
	}

	enqueue(item: T) {
		const newNode = new QNode(item);

		if (this.isEmpty()) {
			this.first = newNode;
			this.last = newNode;
		} else {
			(this.last as QNode<T>).next = newNode;
			this.last = newNode;
		}
		this.size++;
		return this;
	}

	dequeue() {
		if (this.isEmpty()) return null;
		const itemToBeRemoved = this.first;

		if (this.first === this.last) {
			this.last = null;
		}
		this.first = (this.first as QNode<T>).next;
		this.size--;
		return itemToBeRemoved?.value || null;
	}

	peek() {
		return this.first;
	}
}

export default Queue;
