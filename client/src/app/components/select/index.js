import Component from 'component';
import Popover from "components/popover";
import template from 'template';

import { capitalise, clickEventType, isString, isObject, removeChildren } from "lib";
import Icon from "components/icon";

const { div, li, select, input, span, ul } = template;

import './select.css';

const elementOpenClassname = "select--open",
	elementInvisibleInputClassName = "select--invisible",
	optionsOpenClassname = "select__options--open",
	listPositionClass = "select__options--position-bottom",
	alignRightClass = "select--chevron-left",
	listInvertedPositionClass = "select__options--position-top";

export default class Select extends Component {

	constructor(props) {
		super(props);

		this.selected = null;

		this.onClick = this.onClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);

		this.positionDropdown = this.positionDropdown.bind(this);

		this.element = this.render();
	}

	preRender() {
		this.props.toggle = (this.props.toggle === undefined ? true : this.props.toggle);
		this.props.alignRight = (this.props.alignRight === undefined ? false : this.props.alignRight);
		this.props.options = (this.props.options == undefined ? [] : this.props.options)
	}

	postRender() {
		this.field.addEventListener("click", () => {
			this.onClick();
		});
		
		this.popover = new Popover({
			fromTop: true,
			bottom: true,
			left: true,
			right: true,
			verticalDistance: 20,
			trigger: this.field,
			content: this.list,
			hideOnScroll: true,
			rerenderOnShow: true,
			fullWidth: true,
			onHide: this.onHide.bind(this)
		});
	}

	positionDropdown() {
		this.popover.reposition();
	}

	show() {
		this.element.classList.add(elementOpenClassname);
		this.list.classList.add(optionsOpenClassname);
		document.body.addEventListener(clickEventType,this.onBodyClick);
		window.addEventListener("resize",this.positionDropdown);
		this.popover.show();
		this.positionDropdown();
	}

	hide() {
		this.element.classList.remove(elementOpenClassname);
		this.list.classList.remove(optionsOpenClassname);
		document.body.removeEventListener(clickEventType,this.onBodyClick);
		window.removeEventListener("resize",this.positionDropdown);
		this.positionDropdown();
	}

	onHide() {
		this.element.classList.remove(elementOpenClassname);
		this.list.classList.remove(optionsOpenClassname);
	}

	onItemClick(value,option) {
		const { onSelect } = this.props;
		this.input.value = value;
		this.text.textContent = value;
		this.hide();
		if(onSelect) onSelect(value,option);
	}

	reverseChevron() {
		if(this.field.contains(this.chevronDown)) {
			this.field.removeChild(this.chevronDown);
			this.field.appendChild(this.chevronUp);
		} else {
			this.field.removeChild(this.chevronUp);
			this.field.appendChild(this.chevronDown);
		}
	}

	initChevron() {
		if(!this.field.contains(this.chevronDown)) {
			this.field.removeChild(this.chevronUp);
			this.field.appendChild(this.chevronDown);
		}
	}

	reset() {
		const { defaultText } = this.props;
		this.text.textContent = defaultText;
	}

	renderItem(option) {
		var item = option.item,
			element = li({ class: "select__option" }),
			content;

		if(this.template) {
			content = this.template(option);
		} else {
			content = div({
				class: "padding-horizontal-medium padding-vertical-small border-bottom border-color-lighter-grey cursor-pointer",
				content: item
			});
		}

		element.addEventListener(clickEventType,this.onItemClick.bind(this,item,option));

		element.appendChild(content);
		return element;
	}

	isVisible() {
		return this.list.classList.contains(optionsOpenClassname);
	}

	onClick(event) {
		const { toggle } = this.props;
		if(this.isVisible()) {
			if(toggle) {
				this.hide();
			}
		} else {
			this.show();
		}
	}

	onBodyClick(event) {
		var target = event.target;
		if(!this.element.contains(target) && this.element !== target) {
			this.hide();
		}
	}

	renderOptions() {
		const { options } = this.props;
		const fragment = document.createDocumentFragment();
		
		options.forEach(option => {
			const element = this.renderItem(option);
			fragment.appendChild(element);
		});

		return fragment;
	}

	updateOptions(options) {
		this.options = options;
		removeChildren(this.list);
		this.list.appendChild(this.renderOptions());
	}

	renderPopover() {
		return this.list;
	}

	render() {
		const { defaultText, optionsClass, alignRight, className } = this.props,
			element = div({ class: "select" }),
			options = this.renderOptions();

		const chevronDown = new Icon({ name: "chevron-down", ref: { context: this.refs, name: "chevronDown" } }).element;
		const chevronUp = new Icon({ name: "chevron-up", ref: { context: this.refs, name: "chevronUp" } }).element;

		this.input = input({ type: "text", class: "select__field" });
		this.field = div({ class: "select__value field-input cursor-pointer relative" });
		this.text = span({ text: defaultText });
		this.list = ul({ class: "select__options" });

		if(className) {
			className.split(" ").forEach(className => {
				this.field.classList.add(className);
			});
		}

		if(alignRight) {
			element.classList.add(alignRightClass);
		}

		if(this.props.invisible) {
			element.classList.add(elementInvisibleInputClassName);
		}

		if(optionsClass) {
			optionsClass.split(" ").forEach(className => {
				this.list.classList.add(className);
			});
		}

		element.appendChild(this.input);
		element.appendChild(this.field);
		if(alignRight) {
			this.field.appendChild(chevronDown);
			this.field.appendChild(this.text);
		} else {
			this.field.appendChild(this.text);
			this.field.appendChild(chevronDown);
		}
		this.list.appendChild(options);

		return element;
	}

}