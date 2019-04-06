import Component from "component";
import template from "template";
import Collapse from "components/collapse";
import Icon from "components/icon";

import { formatDate } from "lib";
import { Items } from "collections";

import './item.scss';

const { div, h4, button, p, a, span } = template;

const collapseOpenClasses = ["item-component--open","background-color-light-grey"],
	collapseClosedClasses = ["item-component--closed"];

export default class Item extends Component {

	constructor(props) {
		super(props);

		this.onUpdate = this.onUpdate.bind(this);
	}

	onUpdate(item) {
		this.props.item = item;
		this.refs.order.textContent = String(item.order);
	}

	onMount() {
		const { item: { id } } = this.props;
		Items.onUpdate(id, this.onUpdate);
	}

	onUnmount() {
		const { item: { id } } = this.props;
		Items.offUpdate(id, this.onUpdate);
	}

	renderCollapseContent() {
		const { item: { description, url, created } } = this.props;

		return div({
			class: "padding-horizontal-4 padding-bottom-4 padding-top-medium",
			children: [
				p({ class: "font-size-tiny font-weight-medium", text: formatDate(created) }),
				url ? a({ text: "Visit", class: "button button--black", href: url, target: "_blank" }) : null,
				p({ text: description, class: "margin-top" })
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

	onMoveUpClick(event) {
		const { item } = this.props;
		// move up in the list - i.e., decrease order
		event.preventDefault();
		event.stopImmediatePropagation();

		this.props.moveUp(item);
	}

	onMoveDownClick(event) {
		const { item } = this.props;
		// move down in the list - i.e., increase order
		event.preventDefault();
		event.stopImmediatePropagation();

		this.props.moveDown(item);
	}

	render() {
		const { item } = this.props;

		this.collapse = new Collapse({
			content: this.renderCollapseContent()
		});

		const checkIcon = new Icon({ name: "check" });
		
		const moveUp = new Icon({
			name: "chevron-up",
			className: "block color-black--on-hover",
			events: { click: this.onMoveUpClick.bind(this) }
		});
		
		const moveDown = new Icon({
			name: "chevron-down",
			className: "block color-black--on-hover",
			events: { click: this.onMoveDownClick.bind(this) }
		});

		return div({
			class: "item-component item-component--closed",
			children: [
				div({
					class: "item-component__header padding-horizontal-4 padding-vertical block cursor-pointer background-color-light-grey-on-hover",
					children: [
						div({
							class: "item-component__move float-right padding-horizontal color-dark-grey",
							children: [
								moveUp.element,
								moveDown.element
							]
						}),
						a({
							class: "item-component__icon float-right padding-top-tiny padding-horizontal color-dark-grey color-black--on-hover",
							content: checkIcon.element,
							events: {
								click: this.onCheckClick.bind(this)
							}
						}),
						h4({
							class: "font-weight-medium font-size-big margin-right-9",
							children: [
								span({
									class: "item-component__order inline-block text-align-center margin-right color-dark-grey",
									text: String(item.order),
									ref: { context: this.refs, name: "order" }
								}),
								span({
									text: item.title
								})
							]
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