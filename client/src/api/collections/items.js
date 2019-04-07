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
		const new_order = Number(item.order) - 1;
		return this.moveTo(item, new_order);
	}

	moveDown(item) {
		const new_order = Number(item.order) + 1;
		return this.moveTo(item, new_order);
	}

}