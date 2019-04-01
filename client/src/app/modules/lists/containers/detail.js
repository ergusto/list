import Component from 'component';
import template from 'template';
import ListDetailComponent from '../components/detail.js';
import { Lists } from 'collections';
import { removeChildren } from 'lib';
import { redirect } from 'router';

const { div, p, button, h2 } = template;

export default class ListDetailContainer extends Component {

	onMount() {
		this.fetch();
	}

	fetch() {
		const { id } = this.props;

		Lists.retrieve(id).then(list => {
			this.renderList(list);
		});
	}

	renderList(list) {
		const component = new ListDetailComponent({ list });

		this.element.appendChild(component.element);
	}

	render() {
		return div();
	}

}