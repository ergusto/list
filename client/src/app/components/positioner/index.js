import Component from "component";
import template from 'template';

const { div, p, button, h2 } = template;

export default class Positioner extends Component {

	constructor(props) {
		super(props);

		this.visible = false;

		this.reference = props.reference;
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

		this.horizontalDistance = props.horizontalDistance;
		this.verticalDistance = props.verticalDistance;

		this.repositionAtWindowEdge = (props.repositionAtWindowEdge === undefined) ? false : props.repositionAtWindowEdge;
		this.hideOnScroll = (props.hideOnScroll === undefined) ? false : props.hideOnScroll;

		this.onShow = props.onShow;
		this.onHide = props.onHide;

		if(!this.fromLeft && !this.fromRight) this.fromLeft = true;
		if(!this.fromBottom && !this.fromTop) this.fromTop = true;
		
		this.updatePosition = this.updatePosition.bind(this);
		this.scrollCallback = this.scrollCallback.bind(this);
	}

	render() {
		const { element } = this.props;
		const wrapper = div();
		wrapper.classList.add("fixed");
		wrapper.appendChild(element);
		return wrapper;
	}

	updatePosition() {
		var left,
			top,
			hide,
			width,
			coordinates = this.reference.getBoundingClientRect();
		
		this.element.style.position = "fixed";

		if(this.left) {
			if(this.fromLeft) {
				left = coordinates.left;
			} else if(this.fromRight) {
				left = coordinates.left - this.element.offsetWidth;
			}

			if(this.fullWidth) {
				width = coordinates.right - left;
			}
		} 

		else if(this.right) {
			if(this.fromLeft) {
				left = coordinates.right;
			} else if(this.fromRight) {
				left = coordinates.right - this.element.offsetWidth;
			}

			if(this.fullWidth) {
				width = coordinates.right - left;
			}
		}

		else if(this.horizontalMiddle) {
			left = coordinates.left + (this.reference.offsetWidth - this.element.offsetWidth) / 2;
		}

		if(this.bottom) {
			if(this.fromBottom) {
				top = coordinates.bottom - this.element.offsetHeight;
			} else if(this.fromTop) {
				top = coordinates.bottom;
			}
		}

		else if(this.top) {
			if(this.fromBottom) {
				top = coordinates.top - this.element.offsetHeight;
			} else if(this.fromTop) {
				top = coordinates.top;
			}
		}

		else if(this.verticalMiddle) {
			top = coordinates.top + (this.reference.offsetHeight - this.element.offsetHeight) / 2;
		}

		if(left > 0 && left < 10) {
			if(this.repositionAtWindowEdge) {
				left = 10;
			} else {
				return this.hide();
			}
		}

		if(left < 0) {
			if(this.repositionAtWindowEdge) {
				left = 10;
			} else {
				return this.hide();
			}
		}

		if(left > (window.innerWidth - this.element.offsetWidth)) {
			if(this.repositionAtWindowEdge) {
				left = (window.innerWidth - this.element.offsetWidth);
			} else {
				return this.hide();
			}
		}

		if(top > 0 && top < 10) {
			if(this.repositionAtWindowEdge) {
				top = 10;
			} else {
				return this.hide();
			}
		}

		if((top > (window.innerHeight - this.element.offsetHeight)) || (top < 0)) {
			if(this.repositionAtWindowEdge) {
				top = (window.innerHeight - this.element.offsetHeight);
			} else {
				return this.hide();
			}
		}

		if(this.visible) {
			this.element.style.left = left + "px";
			this.element.style.top = top + "px";
			
			if(width) {
				this.element.style.width = width + "px";
			}
		}
	}

	scrollCallback() {
		if(this.hideOnScroll) {
			return this.hide();
		}
		this.updatePosition();
	}

	show() {
		this.visible = true;
		document.body.appendChild(this.element);
		document.addEventListener("scroll",this.scrollCallback,true);
		window.addEventListener("resize",this.updatePosition);
		if(this.onShow) {
			this.onShow();
		}
	}

	hide() {
		this.visible = false;
		if(this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
		document.removeEventListener("scroll",this.scrollCallback);
		window.removeEventListener("resize",this.updatePosition);
		if(this.onHide) {
			this.onHide();
		}
	}

	isVisible() {
		return !!this.visible;
	}

}