import Component from "component";
import template from "template";
import Collapse from "components/collapse";
import Icon from "components/icon";

import './item.scss';

const { div, h4, button, p, a } = template;

const collapseOpenClasses = ["item-component--open"];

export default class Item extends Component {

	renderCollapseContent() {
		const { item: { description, url } } = this.props;
		return div({
			class: "padding-all-4",
			children: [
				p({ text: description }),
				url ? a({ text: "Visit", class: "button button--black", href: url }) : null
			]
		});
	}

	toggle() {
		if(this.collapse.isOpen()) {
			this.collapse.close();
			collapseOpenClasses.forEach(this.element.classList.remove.bind(this.element.classList));
		} else {
			this.collapse.open();
			collapseOpenClasses.forEach(this.element.classList.add.bind(this.element.classList));
		}
	}

	onCheckClick(event) {
		const { item } = this.props;

		event.preventDefault();
		event.stopImmediatePropagation();
	}

	render() {
		const { item } = this.props;

		this.collapse = new Collapse({
			content: this.renderCollapseContent()
		});

		const closeIcon = new Icon({ name: "times" }),
			checkIcon = new Icon({ name: "check" });

		return div({
			class: "item-component",
			children: [
				div({
					class: "padding-horizontal-4 padding-vertical block background-color-light-grey-on-hover cursor-pointer",
					children: [
						a({
							class: "item-component__icon float-right padding-top-tiny padding-horizontal display-none color-grey color-black--on-hover",
							content: closeIcon.element,
							events: {
								click: this.onCheckClick.bind(this)
							}
						}),
						a({
							class: "item-component__icon float-right padding-top-tiny padding-horizontal display-none color-grey color-black--on-hover",
							content: checkIcon.element,
							events: {
								click: this.onCheckClick.bind(this)
							}
						}),
						h4({
							text: item.title,
							class: "font-weight-medium font-size-big"
						}),
					],
					events: {
						click: this.toggle.bind(this)
					}
				}),
				this.collapse.element
			]
		});
	}

}