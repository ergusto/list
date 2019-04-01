import Component from 'component';
import template from 'template';
import { Lists } from 'collections';
import { removeChildren } from 'lib';
import Select from "components/select";

const { div, p, button } = template;

const initialLimit = 200;

export default class ListListContainer extends Component {

	constructor(props) {
		super(props);

		this.state.limit = initialLimit;
		this.state.offset = 0;
	}

	renderLists() {
		const { listContainer } = this.refs,
			lists = Lists.all(),
			component = new ListListComponent({
				lists
			});

		removeChildren(listContainer);
		listContainer.appendChild(component.element);
	}

	renderSelectItem(item) {
		return div({
			content: item
		});
	}

	render() {
		return div({
			children: [
				div({
					content: select.element,
					ref: { context: this.refs, name: "listContainer"}
				}),
			]
		});
	}

}