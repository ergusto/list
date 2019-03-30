import Component from 'component';
import template from 'template';
import LoginFormContainer from '../containers/login';

const { div, p } = template;

export default class LoginPage extends Component {

	render() {
		const container = new LoginFormContainer();

		return div({
			class: "padding-vertical padding-horizontal-4",
			content: div({
				class: "max-width-5 margin-top-5",
				content: container.element
			})
		});
	}

}