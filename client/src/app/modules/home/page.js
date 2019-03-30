import Component from 'component';
import template from 'template';
import HomeContainer from './container.js';

const { div, p } = template;

export default class HomePage extends Component {

	render() {
		const container = new HomeContainer();

		return div({
			class: "padding-all",
			content: div({
				class: "max-width-7 margin-top-5",
				content: container.element
			})
		});
	}

}