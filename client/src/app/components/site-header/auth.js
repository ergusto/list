import Component from 'component';
import { getAuth } from 'auth';
import Icon from 'components/icon';

import template from 'template';

const { div, a } = template;

export default class Header extends Component {

	render() {
		const { username } = getAuth();

		return div({
			id: "site-header",
			class: "border-bottom border-color-black",
			children: [
				div({
					class: "padding-horizontal-3 background-color-white font-weight-medium clearfix",
					children: [
						a({
							href: "/",
							class: "padding-horizontal-medium padding-vertical no-decoration block float-left font-size-large line-height-normal cursor-pointer color-blue--on-hover",
							children: [new Icon({ name: "home" }).element]
						}),
						a({
							href: "/create",
							class: "padding-horizontal-medium padding-vertical margin-left no-decoration block float-left font-size-large line-height-normal cursor-pointer color-blue--on-hover",
							children: [new Icon({ name: "plus" }).element]
						}),
						a({
							text: "logout",
							href: "/logout",
							class: "padding-horizontal-medium padding-vertical font-weight-medium no-decoration block float-right color-blue--on-hover"
						})
					]
				})
			]
		});
	}

}