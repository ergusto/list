import Component from 'component';
import template from 'template';
import { getAuth } from 'auth';

const { div, p } = template;

export default class NotFoundContainer extends Component {

	render() {
		const element = div({ text: "Page not found" });

		return element;
	}

}