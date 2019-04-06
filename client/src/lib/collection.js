import Emitter from './emitter';
import { isArray, isFunction } from './index.js';
import Query from './query.js';
import { getRequest, postRequest, putRequest, patchRequest, deleteRequest, encodeParams } from 'api';

const MODEL_CREATED = "MODEL_CREATED",
	MODEL_ADDED = "MODEL_ADDED",
	MODEL_UPDATED = "MODEL_UPDATED",
	MODELS_UPDATED = "MODELS_UPDATED",
	MODEL_REMOVED = "MODEL_REMOVED",
	MODELS_ADDED = "MODELS_ADDED";

export default class Collection {

	constructor(props = {}) {
		this.models = {};
		this.emitter = new Emitter();
		this.urlBase = props.urlBase;

		if(!this.urlBase[this.urlBase.length] === '/') {
			this.urlBase = this.urlBase + '/';
		}

		if(props.urlBase == undefined) {
			throw 'this.urlBase not defined on ' + this.constructor.name + ' collection';
		}
	}

	post(model) {
		return postRequest(this.urlBase, model).then(json => {
			this.add(json, {
				silent: true
			});
			this.emitCreated(json);
			return new Promise(resolve => resolve(json));
		});
	}

	get(id) {
		let model = this.models[id];
		if(model) {
			return new Promise(resolve => resolve(model));
		} else {
			return getRequest((this.urlBase + id)).then(json => {
				this.add(json);
				return new Promise(resolve => resolve(json));
			});
		}
	}

	put(model) {
		const { id } = model;
		return putRequest((this.urlBase +  id), model).then(json => {
			this.add(json);
			return new Promise(resolve => resolve(json));
		});
	}

	destroy(id) {
		return deleteRequest((this.urlBase + id)).then(json => {
			return this.retrieve(id).then(model => {
				this.delete(model);
				return new Promise(resolve => resolve(model));
			});
		});
	}

	list(params) {
		let url = this.urlBase;
		if(params && Object.keys(params).length) {
			url = encodeParams(url, params);
		}
		return getRequest(url).then(json => {
			const { results } = json;
			this.addMany(results);
			return new Promise(resolve => resolve(json));
		});
	}

	all() {
		return this.toArray();
	}

	count() {
		return this.all().length;
	}

	toArray() {
		return Object.keys(this.models).map(key => this.models[key]);
	}

	find(callback) {
		return this.toArray().find(callback);
	}

	query() {
		return new Query({ collection: this });
	}

	add(model,options) {
		options = options || {};
		const id = model['id'],
			existing = this.models[id];
		if(model) {
			if(existing) {
				this.update(model);
			} else {
				this.models[id] = model;
				if(!options.silent) {
					this.emitAdd(model);
				}
			}
		}
	}

	addMany(models,options) {
		options = options || {};
		if(!isArray(models)) {
			models = [models];
		}
		if(models && models.length) {
			models.forEach(model => {
				this.add(model, {
					silent: true,
				});
			});
			if(!options.silent) {
				this.emitAddMany(models);
			}
		}
	}

	update(model,options) {
		const id = model['id'],
			oldModel = this.models[id];
		options = options || {};
		this.models[id] = model;
		if(!options.silent) {
			this.emitUpdate(model);
		}
	}

	updateMany(models) {
		if(!isArray(models)) {
			models = [models];
		}
		if(models && models.length) {
			this.emitUpdateMany(models);
			models.forEach(model => {
				this.update(model);
			});
		}
	}

	delete(model,options) {
		const id = model['id'];
		options = options || {};
		delete this.models[id];
		if(!options.silent) {
			this.emitDelete(model);
		}
	}

	deleteMany(models) {
		if(!isArray(models)) {
			models = [models];
		}
		models.forEach(model => {
			this.delete(model);
		});
	}

	emit() {
		this.emitter.emit.apply(this.emitter,arguments);
	}

	emitAdd(model) {
		this.emit(MODEL_ADDED,model);
	}

	emitAddMany(models) {
		this.emit(MODELS_ADDED,models);
	}

	emitCreated(model) {
		this.emit(MODEL_CREATED,model);
	}

	emitUpdate(model) {
		const id = model['id'],
			eventName = MODEL_UPDATED + ":" + id;
		this.emit(eventName,model);
		this.emit(MODEL_UPDATED,model);
	}

	emitUpdateMany(models) {
		this.emit(MODELS_UPDATED,models);
	}

	emitDelete(model) {
		const id = model['id'],
			eventName = MODEL_REMOVED + ":" + id;
		this.emit(eventName,model);
		this.emit(MODEL_REMOVED,model);
	}

	on(eventName,callback) {
		this.emitter.on(eventName, callback);
	}

	off(eventName,callback) {
		this.emitter.off(eventName, callback);
	}

	onAdd(callback) {
		this.on(MODEL_ADDED, callback);
	}

	offAdd(callback) {
		this.off(MODEL_ADDED, callback);
	}

	onAddMany(callback) {
		this.on(MODELS_ADDED, callback);
	}

	offAddMany(callback) {
		this.off(MODELS_ADDED, callback);
	}

	onCreated(callback) {
		this.on(MODEL_CREATED, callback);
	}

	offCreated(callback) {
		this.off(MODEL_CREATED, callback);
	}

	onUpdate(id,callback) {
		let eventName = MODEL_UPDATED;
		if(isFunction(id)) {
			callback = id;
		} else {
			eventName = MODEL_UPDATED + ":" + id;
		}
		this.on(eventName,callback);
	}

	offUpdate(id,callback) {
		let eventName = MODEL_UPDATED;
		if(isFunction(id)) {
			callback = id;
		} else {
			eventName = eventName + ":" + id;
		}
		this.off(eventName,callback);
	}

	onUpdateMany(callback) {
		this.on(MODELS_UPDATED,callback);
	}

	offUpdateMany(callback) {
		this.off(MODELS_UPDATED,callback);
	}

	onDelete(id, callback) {
		let eventName = MODEL_REMOVED;
		if(isFunction(id)) {
			callback = id;
		} else {
			eventName = eventName + ":" + id;
		}
		this.on(eventName, callback);
	}

	offDelete(id, callback) {
		let eventName = MODEL_REMOVED;
		if(isFunction(id)) {
			callback = id;
		} else {
			eventName = eventName + ":" + id;
		}
		this.off(eventName, callback);
	}

}