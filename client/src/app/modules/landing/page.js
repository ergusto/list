import Component from 'component';
import template from 'template';
import LandingContainer from './container.js';
import VerticallyCenteredComponent from "components/vertically-centred";

const { div, p } = template;

export default class LandingPage extends Component {

	render() {
		const container = new LandingContainer();

		const component = new VerticallyCenteredComponent({
			children: container.element
		});

		return div({
			class: "padding-horizontal-4",
			content: component.element
		});
	}

}