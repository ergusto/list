import Component from 'component';
import template from 'template';
import Collapse from 'components/collapse';
import ListDetailContainer from '../containers/detail.js';
import { ItemCreateContainer, ItemListContainer } from 'modules/items';

const { div, h2, button } = template;

export default class ListDetailPage extends Component {

	onCancel() {
		this.collapse.close();
	}

	render() {
		const { listId } = this.props,
			detailContainer = new ListDetailContainer({ id: listId }),
			itemCreateContainer = new ItemCreateContainer({ listId, onCancel: this.onCancel.bind(this) }),
			itemsContainer = new ItemListContainer({ listId }),
			createWrapper = div({
				content: itemCreateContainer.element,
				class: "padding-horizontal-4 padding-bottom"
			}),
			trigger = button({
				text: "Add item",
				class: "float-right button button--outline margin-right-4 margin-top-3 margin-left-2"
			});

		this.collapse = new Collapse({
			content: createWrapper,
			trigger
		});

		return div({
			children: [
				trigger,
				detailContainer.element,
				this.collapse.element,
				itemsContainer.element
			]
		});
	}

}