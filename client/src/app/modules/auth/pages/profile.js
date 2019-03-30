import Component from 'component';
import template from 'template';
import ProfileContainer from '../containers/profile';

const { div, p } = template;

export default class ProfilePage extends Component {

	render() {
		const container = new ProfileContainer();

		return div({
			class: "padding-all",
			content: div({
				class: "max-width-7 margin-top-5",
				content: container.element
			})
		});
	}

}