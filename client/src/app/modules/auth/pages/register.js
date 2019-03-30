import Component from 'component';
import template from 'template';
import RegisterFormContainer from '../containers/register';

const { div, p } = template;

export default class RegisterPage extends Component {

	render() {
		const container = new RegisterFormContainer();

		return div({
			class: "padding-vertical padding-horizontal-4",
			content: div({
				class: "max-width-5 margin-top-5",
				content: container.element
			})
		});
	}

}