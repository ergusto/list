import Collection from 'lib/collection';

const UP_DIRECTION = 'UP_DIRECTION',
	DOWN_DIRECTION = 'DOWN_DIRECTION';

export default class ItemCollection extends Collection {

	constructor(props = {}) {
		props.urlBase = '/api/items/';
		super(props);
	}

	moveUp(item) {
		// move up in the list - i.e., decrease order by 1
		// 1 is first in the list, but comes first in the ui. 
		// decreasing the number increases position in list
		const new_item_order = Number(item.order) - 1,
			new_previous_order = Number(item.order);

		if(new_item_order === 0) {
			console.log('already at top of list');
			return;
		}

		const previous = this.find(model => {
			if(model.list !== item.list) {
				return false;
			}
			return model.order === new_item_order;
		});

		if(!previous) {
			console.log('no previous item');
			return;
		}

		const updatedItem = Object.assign({}, item, {
			order: new_item_order
		});

		const updatedPrevious = Object.assign({}, previous, {
			order: new_previous_order
		});

		this.updateMany([
			updatedItem,
			updatedPrevious
		]);

		return this.put(updatedItem).then((model) => {
			console.log(model);
		});
	}

	moveDown(item) {
		// move down in the list - i.e., increase order by 1
		const new_order = Number(item.order) + 1,
			new_next_order = Number(item.order),
			count = this.query().filter({
				list: item.list
			}).count();

		if(new_order > count) {
			console.log('already at bottom of list');
			return;
		}

		const next = this.find(model => {
			if(model.list !== item.list) {
				return false;
			}
			return model.order === new_order;
		});

		if(!next) {
			return;
		}

		const updatedItem = Object.assign({}, item, {
			order: new_order
		});

		const updatedNext = Object.assign({}, next, {
			order: new_next_order
		});

		this.updateMany([
			updatedItem,
			updatedNext
		]);

		return this.put(updatedItem).then(model => {
			console.log(model);
		});
	}

}