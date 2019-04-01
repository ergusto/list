import Component from "component";
import template from "template";
import Select from "components/select";
import ListItem from './item.js';

const { div, h2,  } = template;

export default class ListList extends Component {

	renderItems() {
		const { lists } = this.props;

		return lists.map(list => {
			const component = new ListItem({ list });
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