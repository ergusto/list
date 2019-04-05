import { isFunction, dynamicSort } from 'lib';

export default class Query {

	constructor(options) {
		this.options = options || {};
		this.collection = options.collection;
		this.id = this.collection.id;
		this.filters = [];
		this.sorter = null;
	}

	filter(filter) {
		this.filters.push(filter);
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
			this.filters.forEach(filter => {
				if(isFunction(filter)) {
					result = result.filter(filter);
				} else {
					result = result.filter(model => {
						return Object.keys(filter).every(key => {
							return model[key] === filter[key];
						});
					});
				}
			});
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