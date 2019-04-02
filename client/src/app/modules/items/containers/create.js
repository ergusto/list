import Component from 'component';
import ItemForm from '../components/form.js';
import { redirect } from 'router';
import { Items } from 'collections';

export default class ItemCreateContainer extends Component {

	create(item) {
		const { listId } = this.props;

		if(listId) {
			item.list = listId;
		}

		return Items.create(item);
	}

	render() {
		const { onCancel } = this.props;
		const form = new ItemForm({
			submit: this.create.bind(this),
			onCancel: onCancel
		});
		return form.element;
	}

}