import Component from 'component';
import { getAuth, onAuthChange, offAuthChange } from 'auth';
import template from 'template';

const { div, a } = template;

export default class Header extends Component {

	main() {
		return div({
			id: "site-header",
			class: "padding-horizontal-3 font-weight-medium clearfix border-bottom border-color-black",
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
		const element = div(),
			main = this.main();

		element.appendChild(main);
		return element;
	}

}