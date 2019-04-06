import Component from 'component';
import ItemForm from '../components/form.js';
import { redirect } from 'router';
import { Items } from 'collections';
import template from 'template';

const { div, p, button } = template;

export default class ItemCreateContainer extends Component {

	create(item) {
		const { listId } = this.props;

		if(listId) {
			item.list = listId;
		}

		return Items.post(item);
	}

	render() {
		const { onCancel } = this.props;
		
		const form = new ItemForm({
			submit: this.create.bind(this),
			onCancel: onCancel
		});

		return div({
			content: form.element
		});
	}

}