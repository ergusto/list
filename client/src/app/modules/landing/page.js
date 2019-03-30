import Component from 'component';
import template from 'template';
import LandingContainer from './container.js';

const { div, p } = template;

export default class LandingPage extends Component {

	render() {
		const container = new LandingContainer();

		return div({
			class: "padding-vertical padding-horizontal-4",
			content: div({
				class: "max-width-5 margin-top-5",
				content: container.element
			})
		});
	}

}