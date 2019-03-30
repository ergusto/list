import Component from 'component';
import template from 'template';
import { getAuth } from 'auth';

const { div, h2, p } = template;

export default class Profile extends Component {

	render() {
		const { username } = getAuth();

		return div({
			class: "padding-horizontal",
			children: [
				div({
					class: "max-width-7 margin-top-5 centred",
					children: [
						div({
							class: "padding-all-2 border-all border-color-blue-grey box-shadow-large background-color-white border-radius-all",
							children: [
								h2({
									text: username,
									class: "margin-bottom-medium"
								}),
								p({
									text: "Your personal profile. This is different to a user detail page"
								})
							]
						})
					]
				})
			]
		});
	}

}