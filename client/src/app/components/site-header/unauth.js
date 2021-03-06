import Component from 'component';
import { getAuth, onAuthChange, offAuthChange } from 'auth';
import template from 'template';

import './style.scss';

const { div, a } = template;

export default class Header extends Component {

	main() {
		return div({
			id: "site-header",
			class: "site-header padding-horizontal-3 background-color-white font-weight-medium clearfix",
			children: [
				a({
					text: "home",
					href: "/",
					class: "padding-horizontal padding-vertical no-decoration block float-left color-blue--on-hover"
				}),
				a({
					text: "login",
					href: "/login",
					class: "padding-horizontal padding-vertical no-decoration block float-right color-blue--on-hover"
				}),
				a({
					text: "register",
					href: "/register",
					class: "padding-horizontal padding-vertical no-decoration block float-right color-blue--on-hover"
				})
			]
		});
	}

	render() {
		return div({
			content: this.main()
		});
	}

}