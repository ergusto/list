import Collection from 'lib/collection';

const UP_DIRECTION = 'UP_DIRECTION',
	DOWN_DIRECTION = 'DOWN_DIRECTION';

export default class ItemCollection extends Collection {

	constructor(props = {}) {
		props.urlBase = '/api/items/';
		super(props);
	}

	moveTo(obj, new_order) {
		let other, to_update;

		if(obj.order > new_order) {
			// move up
			other = this.query().filter(model => {
				return model.list == obj.list && model.order < obj.order && model.order >= new_order;
			}).execute();

			to_update = other.map(model => Object.assign({}, model, {
				order: 1 + model.order
			}));
		} else {
			// move down
			other = this.query().filter(model => {
				return model.list == obj.list && model.order <= new_order && model.order > obj.order;
			}).execute();

			to_update = other.map(model => Object.assign({}, model, {
				order: model.order - 1
			}));
		}

		const updated_obj = Object.assign({}, obj, {
			order: new_order
		});

		to_update.push(updated_obj);

		this.updateMany(to_update);

		return this.put(updated_obj);
	}

	moveUp(item) {
		// move up in the list - i.e., decrease order by 1
		// 1 is first in the list, and comes first in the ui. 
		// decreasing the number increases position in list
		const new_order = Number(item.order) - 1,
			new_previous_order = Number(item.order);

		if(new_order === 0) {
			console.log('already at top of list');
			return;
		}

		const previous = this.find(model => {
			if(model.list !== item.list) {
				return false;
			}
			return model.order === new_order;
		});

		if(!previous) {
			console.log('no previous item');
			return;
		}

		const updated_item = Object.assign({}, item, {
			order: new_order
		});

		const updated_previous = Object.assign({}, previous, {
			order: new_previous_order
		});

		this.updateMany([
			updated_item,
			updated_previous
		]);

		return this.put(updated_item);
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

		return this.put(updatedItem);
	}

}