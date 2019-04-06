import Component from 'component';
import Item from '../components/item.js';
import { redirect } from 'router';
import { Items } from 'collections';
import template from 'template';

const { div, p, button } = template;

export default class ItemContainer extends Component {

	moveUp(item) {
		// move up in the list - i.e., increase order
		return Items.moveUp(item);
	}

	moveDown(item) {
		// move down in the list - i.e., decrease order
		return Items.moveDown(item);
	}

	render() {
		const { item } = this.props;

		const component = new Item({
			item,
			moveUp: this.moveUp,
			moveDown: this.moveDown
		});

		return div({
			content: component.element
		});
	}

}