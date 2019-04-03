import Component from 'component';
import template from 'template';
import { ItemListComponent } from 'modules/items';
import { Items } from 'collections';
import { removeChildren } from 'lib';

const { div, p, button } = template;

const initialLimit = 2;

export default class ItemListContainer extends Component {

	constructor(props) {
		super(props);

		this.state.limit = initialLimit;
		this.state.offset = 0;
	}

	onMount() {
		Items.onAddMany(this.renderItems.bind(this));
		Items.onAdd(this.renderItems.bind(this));
		Items.onCreated(this.renderItems.bind(this));
		Items.onDelete(this.renderItems.bind(this));
		
		this.fetch();
	}

	fetch() {
		const { listId: list } = this.props;
		const { limit, offset } = this.state;

		Items.list({ list, limit, offset }).then(resp => {
			const { next } = resp;

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

		const next = div({
			class: "padding-horizontal-4 margin-vertical",
			content: button({
				text: "Next",
				class: "button button--black button--block",
				events: {
					click: this.clickNext.bind(this)
				}
			})
		});

		nextContainer.appendChild(next);
	}

	clickNext() {
		this.fetch();
		this.removeNext();
	}

	removeNext() {
		const { nextContainer } = this.refs;

		removeChildren(nextContainer);
	}

	renderItems() {
		const { listId } = this.props,
			items = Items.filter({ list: Number(listId) });
			
		this.list.update(items);
	}

	preRender() {
		this.list = new ItemListComponent();
	}

	render() {
		return div({
			children: [
				this.list.element,
				div({
					ref: { context: this.refs, name: "nextContainer"}
				})
			]
		});
	}

}