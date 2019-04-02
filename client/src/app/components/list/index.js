import Component from 'component';
import template from 'template';
import { isFunction, removeChildren } from 'lib';

const { div, ul, li } = template;

export default class ListComponent extends Component {

	constructor(props) {
		super(props);

		this.elements = {};
		this.orderedElements = {};

		if(!this.renderItem && !isFunction(this.renderItem)) {
			throw new Error('Please define a renderItem method on the subclass of ListComponent');
		}
	}

	onMount() {
		const { items } = this.props;

		if(items && items.length) {
			this.update(items);
		}
	}

	update(items) {
		const elements = this.renderItems(items);

		if(!this.element.children.length) {
			elements.forEach(element => {
				this.element.appendChild(li(element));
			});

			return;
		}

		elements.forEach((element, index) => {
			const children = this.element.children,
				child = children[index];

			if(child) {
				if(child.firstChild !== element) {
					removeChildren(child);
					child.appendChild(element);
				}
			} else {
				this.element.appendChild(li(element));
			}
		});
	}

	renderItems(items) {
		return items.map(item => {
			let element;
			if (this.elements[item.id]) {
				element = this.elements[item.id];
			} else {
				element = this.renderItem(item);
			}
			return element;
		});
	}

	render() {
		return ul();
	}

}