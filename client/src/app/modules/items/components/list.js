import Component from "component";
import template from "template";
import Item from './item.js';

const { div, h2,  } = template;

export default class ItemList extends Component {

	renderItems() {
		const { items } = this.props;

		return items.map(item => {
			const component = new Item({ item });
			return component.element;
		});
	}

	render() {
		return div({
			class: "margin-top",
			children: [...this.renderItems()]
		});
	}

}