import Component from 'component';
import template from 'template';
import { ListListComponent } from 'modules/lists';
import { Lists } from 'collections';
import { removeChildren } from 'lib';
import { redirect } from 'router';

const { div, p, button, h2 } = template;

const initialLimit = 2000;

export default class HomeContainer extends Component {

	constructor(props) {
		super(props);

		this.state.selected = null;
		this.state.limit = initialLimit;
		this.state.offset = 0;
	}

	onMount() {
		this.fetch();
	}

	fetch() {
		const { limit, offset } = this.state;

		Lists.list({ limit, offset }).then(resp => {
			const { results } = resp;

			if(!results.length) {
				redirect('/create');
			} else {
				this.renderLists();
			}
		});
	}

	renderLists() {
		const lists = Lists.all(),
			component = new ListListComponent({
				lists
			});

		removeChildren(this.element);
		this.element.appendChild(component.element);
	}

	render() {
		return div();
	}

}