import Component from 'component';
import template from 'template';
import ListDetailContainer from '../containers/detail.js';

const { div, h2 } = template;

export default class ListDetailPage extends Component {

	render() {
		const { listId } = this.props,
			container = new ListDetailContainer({ id: listId });

		return div({
			content: container.element
		});
	}

}