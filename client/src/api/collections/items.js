import Collection from 'lib/collection';

export default class ItemCollection extends Collection {

	constructor(props = {}) {
		props.urlBase = '/api/items/';
		super(props);
	}

}