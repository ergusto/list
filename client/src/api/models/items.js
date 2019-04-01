import Collection from './collection.js';
import { isString } from 'lib';

export default class Items extends Collection {

	constructor(props = {}) {
		props.urlBase = '/api/items/';
		super(props);
	}

}