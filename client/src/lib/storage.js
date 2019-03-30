import { isObject, isString } from 'lib';

class Store {

	constructor(name) {
		this.store = {};
		this.store[name] = {};
	}

	getItem(name) {
		return this.store[name];
	}

	setItem(name, value) {
		this.store[name] = value;
	}

}

function resetBrowserLocalStorage() {
	localStorage.clear();
}

export default class Storage {
	
	constructor(storeName) {
		this.storeName = storeName;
		this.hasLocalStorage = null;

		try {
			const test = 'test';
			localStorage.setItem(test, test);
			localStorage.removeItem(test, test);
			this.store = window.localStorage;
			this.hasLocalStorage = true;
		} catch(e) {
			this.store = new Store(storeName);
			this.hasLocalStorage = false;
		}
	}
 
	get(prop, defaultValue) {
		const store = this.store.getItem(this.storeName);
		const object = isString(store) ? JSON.parse(store) : {};
		if(prop) {
			const value = object[prop];
			if (value === undefined && defaultValue) {
				this.update(prop, defaultValue);
				return defaultValue;
			} else {
				return value;
			}
		} else {
			return object;
		}
	}

	remove(property) {
		const store = this.get();
		if (isString(property)) {
			property.split(' ').forEach(prop => store[prop] = null);
		} else if (isObject(property)) {
			for (var prop in property) {
				store[prop] = null;
			}
		}
		this.update(store);
	}

	set(store) {
		if (isObject(store)) store = JSON.stringify(store);
		this.store.setItem(this.storeName, store);
	}

	hasContents() {
		const store = this.get();
		if (isObject(store)) {
			return store && !!Object.keys(store).length;
		}
		return store && store.length;
	}

	update(property, value) {
		const store = this.get();
		if (isObject(property)) {
			for (let prop in property) {
				store[prop] = property[prop];
			}
		} else {
			store[property] = value;
		}
		this.set(store);
	}

	reset() {
		if(this.hasLocalStorage) {
			resetBrowserLocalStorage();
		} else {
			this.store = new Store(this.storeName);
		}
	}

}