import Component from 'component';
import { getAuth } from 'auth';
import Icon from 'components/icon';

import './style.scss';

import template from 'template';

const { div, a, p } = template;

export default class Header extends Component {

	render() {
		const { username } = getAuth();

		return div({
			id: "site-header",
			class: "site-header border-bottom border-color-black",
			children: [
				div({
					class: "padding-horizontal-3 background-color-white font-weight-medium clearfix",
					children: [
						a({
							href: "/",
							class: "padding-horizontal-medium padding-vertical no-decoration float-left line-height-normal cursor-pointer color-blue--on-hover",
							children: [new Icon({ name: "home" }).element]
						}),
						a({
							href: "/create",
							class: "padding-horizontal-medium padding-vertical margin-left no-decoration float-left line-height-normal cursor-pointer color-blue--on-hover",
							children: [new Icon({ name: "plus" }).element]
						}),
						a({
							href: "/logout",
							class: "padding-horizontal-medium padding-vertical font-weight-medium no-decoration padding-top-tiny float-right cursor-pointer line-height-normal color-blue--on-hover",
							children: [new Icon({ name: "sign-out-alt" }).element]
						}),
						p({
							text:  username,
							class: "padding-horizontal-medium padding-vertical font-weight-medium no-decoration block float-right"
						})
					]
				})
			]
		});
	}

}