import Component from 'component';
import template from 'template';
import ListDetailContainer from '../containers/detail.js';
import { ItemListContainer } from 'modules/items';

const { div, h2 } = template;

export default class ListDetailPage extends Component {

	render() {
		const { listId } = this.props,
			detailContainer = new ListDetailContainer({ id: listId }),
			itemsContainer = new ItemListContainer({ listId });

		return div({
			children: [
				detailContainer.element,
				itemsContainer.element
			]
		});
	}

}