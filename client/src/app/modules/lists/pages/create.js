import Component from 'component';
import template from 'template';
import { ListCreateContainer } from 'modules/lists';
import VerticallyCenteredComponent from "components/vertically-centred";

const { div, h2 } = template;

export default class ListCreatePage extends Component {

	render() {
		const container = new ListCreateContainer();

		const formWrapper = div({
			class: "padding-horizontal-2 max-width-6 width-100-percent",
			children: [
				h2({ text: "Create List", class: "margin-bottom-small font-size-huge font-weight-bold padding-left-medium" }),
				container.element
			]
		})

		const component = new VerticallyCenteredComponent({
			children: formWrapper
		});

		return div({
			content: component.element
		});
	}

}