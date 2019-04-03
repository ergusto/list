import Component from "component";
import template from "template";
import Collapse from "components/collapse";
import Icon from "components/icon";

import { Items } from "collections";

import './item.scss';

const { div, h4, button, p, a } = template;

const collapseOpenClasses = ["item-component--open","background-color-light-grey"],
	collapseClosedClasses = ["item-component--closed"];

export default class Item extends Component {

	renderCollapseContent() {
		const { item: { description, url } } = this.props;
		return div({
			class: "padding-horizontal-4 padding-bottom-4 padding-top-3",
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
			collapseClosedClasses.forEach(this.element.classList.add.bind(this.element.classList));
		} else {
			this.collapse.open();
			collapseClosedClasses.forEach(this.element.classList.remove.bind(this.element.classList));
			collapseOpenClasses.forEach(this.element.classList.add.bind(this.element.classList));
		}
	}

	onCheckClick(event) {
		const { item } = this.props;

		event.preventDefault();
		event.stopImmediatePropagation();
	}

	onDeleteClick(event) {
		const { item: { id } } = this.props;

		event.preventDefault();
		event.stopImmediatePropagation();

		Items.destroy(id);
	}

	render() {
		const { item } = this.props;

		this.collapse = new Collapse({
			content: this.renderCollapseContent()
		});

		const deleteIcon = new Icon({ name: "times" }),
			checkIcon = new Icon({ name: "check" });

		return div({
			class: "item-component item-component--closed",
			children: [
				div({
					class: "item-component__header padding-horizontal-4 padding-vertical block cursor-pointer background-color-light-grey-on-hover",
					children: [
						a({
							class: "item-component__icon float-right padding-top-tiny padding-horizontal color-dark-grey color-black--on-hover",
							content: deleteIcon.element,
							events: {
								click: this.onDeleteClick.bind(this)
							}
						}),
						a({
							class: "item-component__icon float-right padding-top-tiny padding-horizontal color-dark-grey color-black--on-hover",
							content: checkIcon.element,
							events: {
								click: this.onCheckClick.bind(this)
							}
						}),
						h4({
							text: item.title,
							class: "font-weight-medium font-size-big margin-right-9"
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