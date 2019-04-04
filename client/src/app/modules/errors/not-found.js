import Component from 'component';
import template from 'template';
import VerticallyCenteredComponent from 'components/vertically-centred';
import { getAuth } from 'auth';

const { div, p, h2 } = template;

export default class NotFoundContainer extends Component {

	render() {
		const children = h2({
			class: "font-size-large font-weight-bold",
			text: "Page not found"
		});

		const component = new VerticallyCenteredComponent({ children });

		return div({
			content: component.element
		});
	}

}