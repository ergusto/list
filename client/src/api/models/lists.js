import Collection from './collection.js';
import { isString } from 'lib';

export default class Lists extends Collection {

	constructor(props = {}) {
		props.urlBase = '/api/lists/';
		super(props);
	}

}