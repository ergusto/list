export default class Emitter {

	constructor() {
		this.events = {};
	}

	get(eventName) {
		let event = this.events[eventName];
		if (!event) {
			event = [];
			this.events[eventName] = event;
		}
		return event;
	}

	on(eventName,callback) {
		const event = this.get(eventName);
		event.push(callback);
	}

	off(eventName,callback) {
		const event = this.get(eventName),
			index = event.indexOf(callback);
		if(index > -1) {
			event.splice(index, 1);
		}
	}

	emit(eventName, ...args) {
		const event = this.get(eventName);
		event.forEach(callback => callback(...args));
	}

}