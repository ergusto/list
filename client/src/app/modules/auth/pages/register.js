import Component from 'component';
import template from 'template';
import RegisterFormContainer from '../containers/register';
import VerticallyCenteredComponent from "components/vertically-centred";

const { div, p } = template;

export default class RegisterPage extends Component {

	render() {
		const container = new RegisterFormContainer();

		const component = new VerticallyCenteredComponent({
			children: container.element
		});

		return div({
			class: "padding-horizontal-4",
			content: component.element
		});
	}

}