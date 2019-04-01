import Component from 'component';
import template from 'template';
import LoginFormContainer from '../containers/login';
import VerticallyCenteredComponent from "components/vertically-centred";

const { div, p } = template;

export default class LoginPage extends Component {

	render() {
		const container = new LoginFormContainer();

		const component = new VerticallyCenteredComponent({
			children: container.element
		});

		return div({
			class: "padding-horizontal-4",
			content: component.element
		});
	}

}