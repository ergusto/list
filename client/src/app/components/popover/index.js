import Component from "component";
import Positioner from "components/positioner";
import { isFunction, clickEventType } from "lib";
import template from 'template';

import './popover.css';

const { div, p, button, h2 } = template;

export default class Popover extends Component {

	constructor(props) {
		super(props);

		this.toggle = !!props.toggle;
		this.trigger = props.trigger;
		this.content = props.content;

		this.left = props.left;
		this.bottom = props.bottom;
		this.right = props.right;
		this.top = props.top;

		this.fromLeft = props.fromLeft;
		this.fromBottom = props.fromBottom;
		this.fromRight = props.fromRight;
		this.fromTop = props.fromTop;

		this.fullWidth = props.fullWidth;

		this.horizontalMiddle = props.horizontalMiddle;
		this.verticalMiddle = props.verticalMiddle;

		this.verticalDistance = props.verticalDistance;
		this.horizontalDistance = props.horizontalDistance;

		this.repositionAtWindowEdge = (props.repositionAtWindowEdge === undefined) ? false : props.repositionAtWindowEdge;
		this.hideOnScroll = (props.hideOnScroll === undefined) ? false : props.hideOnScroll;

		this.rerenderOnShow = props.rerenderOnShow;

		this.onHide = props.onHide;
		this.onShow = props.onShow;

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		this.onClick = this.onClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);

		this.init();

	}

	render() {
		let { content } = this.props,
			element = div();

		element.appendChild(content);
		return element;
	}

	init() {
		this.trigger.addEventListener(clickEventType,this.onClick);
		this.initPositioner();
	}

	initPositioner() {
		this.positioner = new Positioner({
			left: this.left,
			bottom: this.bottom,
			right: this.right,
			top: this.top,
			fromLeft: this.fromLeft,
			fromBottom: this.fromBottom,
			fromRight: this.fromRight,
			fromTop: this.fromTop,
			fullWidth: this.fullWidth,
			horizontalMiddle: this.horizontalMiddle,
			verticalMiddle: this.verticalMiddle,
			reference: this.trigger,
			element: this.element,
			verticalDistance: this.verticalDistance,
			horizontalDistance: this.horizontalDistance,
			repositionAtWindowEdge: this.repositionAtWindowEdge,
			hideOnScroll: this.hideOnScroll,
			onHide: this.onHide,
			onShow: this.onShow
		});
	}

	reposition() {
		this.positioner.updatePosition();
	}

	show() {
		this.positioner.show();
		document.body.addEventListener(clickEventType,this.onBodyClick);
		this.reposition();
	}

	hide() {
		this.positioner.hide();
		document.body.removeEventListener(clickEventType,this.onBodyClick);
	}

	onClick(event) {
		if(event) event.preventDefault();

		if(!this.element) {
			this.render();
		}

		if(!this.positioner) {
			this.initPositioner();
		} else if(this.positioner.visible) {
			if(this.toggle) {
				this.hide();
			}
		}
	}

	onBodyClick(event) {
		var target = event.target;
		if(this.positioner.visible) {
			if(!this.element.contains(target) && this.element !== target) {
				if(!this.trigger.contains(target) && this.trigger !== target) {
					this.hide();
				}
			}
		}
	}

}