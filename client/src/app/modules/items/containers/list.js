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

		this.renderItems = this.renderItems.bind(this);

		this.state.limit = initialLimit;
		this.state.offset = 0;
	}

	onMount() {
		Items.onAddMany(this.renderItems);
		Items.onAdd(this.renderItems);
		Items.onCreated(this.renderItems);
		Items.onDelete(this.renderItems);
		Items.onUpdateMany(this.onUpdateMany.bind(this));
		Items.onUpdate(this.renderItems);
		
		this.fetch();
	}

	onUpdateMany() {
		this.renderItems();
	}

	fetch() {
		const { listId: list } = this.props;
		const { limit, offset } = this.state;

		Items.list({ list, limit, offset, order: "-order" }).then(resp => {
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
			query = Items.query();

		query.filter({ list: Number(listId) });
		query.sort('order');

		const result = query.execute();
			
		this.list.update(result);
	}

	onDrop(dropped, target) {
		Items.moveTo(dropped, target.order);
	}

	preRender() {
		this.list = new ItemListComponent({
			onDrop: this.onDrop.bind(this)
		});
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