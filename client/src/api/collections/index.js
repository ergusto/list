import Collection from 'lib/collection';
import ItemCollection from './items.js';

export const Items = new ItemCollection();
export const Lists = new Collection({ urlBase: '/api/lists/' });