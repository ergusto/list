import Component from 'component';
import template from 'template';
import { ItemListComponent } from 'modules/items';
import { Items } from 'collections';
import { removeChildren } from 'lib';

const { div, p, button } = template;

const initialLimit = 20;

export default class ItemListContainer extends Component {

	constructor(props) {
		super(props);

		this.state.limit = initialLimit;
		this.state.offset = 0;
	}

	onMount() {
		Items.onAddMany(this.renderItems.bind(this));
		Items.onAdd(this.renderItems.bind(this));
		
		this.fetch();
	}

	fetch() {
		const { listId } = this.props;
		const { limit, offset } = this.state;

		Items.list({ list_id: listId, limit, offset }).then(resp => {
			const { next } = resp;

			this.state.limit + initialLimit;
			this.state.offset = this.state.offset + initialLimit;

			if(next) {
				this.renderNext();
			} else {
				this.removeNext();
			}
		});
	}

	renderNext() {
		const { nextContainer } = this.refs;

		const next = button({
			text: "Next",
			class: "button button--black button--block margin-all",
			events: {
				click: this.fetch.bind(this)
			}
		});

		nextContainer.appendChild(next);
	}

	removeNext() {
		const { nextContainer } = this.refs;

		removeChildren(nextContainer);
	}

	renderItems() {
		const { listContainer } = this.refs,
			items = Items.all(),
			component = new ItemListComponent({
				items
			});

		removeChildren(listContainer);
		listContainer.appendChild(component.element);
	}

	render() {
		return div({
			children: [
				div({
					ref: { context: this.refs, name: "listContainer"}
				}),
				div({
					ref: { context: this.refs, name: "nextContainer"}
				})
			]
		});
	}

}