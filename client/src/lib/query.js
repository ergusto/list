import { isFunction, dynamicSort } from 'lib';

export default class Query {

	constructor(options) {
		this.options = options || {};
		this.collection = options.collection;
		this.id = this.collection.id;
		this.filters = [];
		this.sorter = null;
	}

	filter(filterProperties) {
		this.filters.push(filterProperties);
		return this;
	}

	clearFilter() {
		this.filters = [];
		return this;
	}

	sort(sort) {
		this.sorter = sort;
		return this;
	}

	clearSort() {
		return this.sort(null);
	}

	execute() {
		let result = this.collection.all();
		if(this.filters.length) {
			const filterProperties = {};
			this.filters.forEach(filter => {
				Object.keys(filter).forEach(key => {
					filterProperties[key] = filter[key];
				});
			});
			result = this.collection.filter(filterProperties);
		}
		if(this.sorter) {
			if(isFunction(this.sorter)) {
				result.sort(this.sorter);
			} else {
				result.sort(dynamicSort(this.sorter));
			}
		}
		return result;
	}

}