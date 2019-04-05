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
		const new_order = Number(item.order) - 1;

		const below = this.query().filter(model => {
			if(model.list !== item.list) {
				return false;
			}

			if(model.order <= new_order) {
				return true;
			}

			return false;
		}).execute();
	}

	moveDown(item) {
		// move down in the list - i.e., increase order by 1

		const above = this.query().filter(model => {
			console.log(model.id, model.order);

			if(model.list !== item.list) {
				return false;
			}

			if(model.order > item.order) {
				return true;
			}

			return false;
		}).execute();

		above.forEach(model => {
			model.order += 1;
			console.log(model.id, model.order);
		});

		this.updateMany(above);
	}

}