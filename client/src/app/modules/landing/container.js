import Component from 'component';
import template from 'template';
import { login } from 'api';
import { getAuth } from 'auth';

import LandingComponent from './component.js';

const { div, h2 } = template;

export default class LandingContainer extends Component {

	render() {
		const component = new LandingComponent();

		return div({
			content: component.element
		});
	}

}