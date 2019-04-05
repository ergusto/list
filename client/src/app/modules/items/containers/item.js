import Component from 'component';
import Item from '../components/item.js';
import { redirect } from 'router';
import { Items } from 'collections';

export default class ItemContainer extends Component {

	moveUp() {
		// move up in the list - i.e., increase order
		const { item } = this.props;

		return Items.moveUp(item);
	}

	moveDown() {
		// move down in the list - i.e., decrease order
		const { item } = this.props;

		return Items.moveDown(item);
	}

	render() {
		const { item } = this.props;

		return new Item({
			item,
			moveUp: this.moveUp.bind(this),
			moveDown: this.moveDown.bind(this)
		}).element;
	}

}