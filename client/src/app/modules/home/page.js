import Component from 'component';
import template from 'template';
import HomeContainer from './container.js';

const { div, p } = template;

export default class HomePage extends Component {

	render() {
		const container = new HomeContainer();

		return div({
			content: container.element
		});
	}

}