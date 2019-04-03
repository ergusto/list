export default class Query {

	constructor(options) {
		this.options = options || {};
		this.collection = options.collection;
		this.id = this.collection.id;
		this.filters = [];
		this.sortFn = null;
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
		this.sortFn = sort;
		return this;
	}

	clearSort() {
		return this.sort(null);
	}

	execute() {
		if(this.filters.length) {
			const filterProperties = {};
			this.filters.forEach(filter => {
				Object.keys(filter).forEach(key => {
					filterProperties[key] = filter[key];
				});
			});
			result = this.collection.filter(filterProperties);
		}
		if(this.sortFn) {
			result.sort(this.sortFn);
		}
		return result;
	}

}