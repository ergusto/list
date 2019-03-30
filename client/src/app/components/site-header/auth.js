import Component from 'component';
import { getAuth } from 'auth';

import template from 'template';

const { div, a } = template;

export default class Header extends Component {

	render() {
		const { username } = getAuth();

		return div({
			children: [
				div({
					class: "padding-horizontal-3 background-color-white font-weight-medium clearfix",
					children: [
						a({
							text: "logout",
							href: "/logout",
							class: "padding-horizontal-medium padding-vertical no-decoration block float-right color-black--on-hover"
						})
					]
				})
			]
		});
	}

}