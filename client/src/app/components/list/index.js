import Component from 'component';
import template from 'template';

const { div, p, button } = template;

export default class ListComponent extends Component {

	constructor(props) {
		super(props);

		this.elements = {};
	}

	render() {
		const parent = div();
		const { items } = this.props;

		items.forEach(item => {
			let element;
			if (this.elements[item.id]) {
				element = this.elements[item.id];
			} else {
				element = new 
			}
		});
	}

}