import Component from 'component';
import { getAuth, onAuthChange, offAuthChange } from 'auth';
import template from 'template';

const { div, a } = template;

export default class Header extends Component {

	main() {
		return div({
			class: "padding-horizontal-3 font-weight-regular clearfix",
			children: [
				a({
					text: "home",
					href: "/",
					class: "padding-horizontal padding-vertical-2 no-decoration block float-left color-darker-blue--on-hover"
				}),
				a({
					text: "register",
					href: "/register",
					class: "padding-horizontal padding-vertical-2 no-decoration block float-left color-darker-blue--on-hover"
				}),
				a({
					text: "login",
					href: "/login",
					class: "padding-horizontal padding-vertical-2 no-decoration block float-left color-darker-blue--on-hover"
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