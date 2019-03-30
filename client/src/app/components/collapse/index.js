import { createElement, isFunction, clickEventType, animate, throttle, isInDOM } from 'lib';
import Component from "component";
import template from "template";

import './styles.scss';

const { header, span, div, h4, a } = template;

const mutationObserverOptions = {
	childList: true,
	attributes: true,
	subtree: true
};

const containerClass = "collapse__container",
	containerStartOpenClass = "collapse__container--start-open",
	collapseOpenClass = "collapse__container--open",
	contentClass = "collapse__content";

export default class Collapse extends Component {

	constructor(props) {
		super(props);

		this.toggle = throttle(this.toggle.bind(this), 500);
		this.recalculate = throttle(this.recalculate.bind(this), 500);
		this.open = throttle(this.open.bind(this), 500);
		this.close = throttle(this.close.bind(this), 500);
		this.onResize = this.onResize.bind(this);
		
		this.init();
	}

	init() {
		const { trigger } = this.props;
		if(trigger) {
			trigger.addEventListener(clickEventType, event => {
				event.preventDefault();
				event.stopPropagation();

				this.toggle();
			});
		}

		this.observer = new MutationObserver(this.observerCallback.bind(this));
	}

	onUnmount() {
		this.observer.disconnect();
		window.removeEventListener("resize",this.onResize);
	}

	isInDOM() {
		return isInDOM(this.element);
	}

	observerCallback(mutationList, observer) {
		mutationList.forEach(mutation => {
			if(this.isInDOM() && this.isOpen()) {
				this.onResize();
			}
		});
	}

	toggle() {
		if(this.isOpen()) {
			this.close();
		} else {
			this.open();
		}
	}

	onResize() {
		if(this.isInDOM()) {
			var content = this.element.querySelector("." + contentClass);
			if(this.element.clientHeight !== content.clientHeight) {
				this.recalculate();
			}
		} else {
			window.removeEventListener("resize",this.onResize);
		}
	}

	isOpen() {
		return this.element.classList.contains(collapseOpenClass);
	}

	isClosed() {
		return !this.isOpen();
	}

	open() {
		window.addEventListener("resize",this.onResize);
		this.element.classList.add(collapseOpenClass);
		this.observer.observe(this.element, mutationObserverOptions);
		this.recalculate();
	}

	drawRecalculate = progress => {
		const containerHeight = this.element.clientHeight,
			content = this.element.querySelector("." + contentClass),
			contentHeight = content.clientHeight,
			newHeight = containerHeight + ((contentHeight - containerHeight) * progress);
		this.element.style.minHeight = newHeight + "px";
	};

	recalculate() {
		if(this.isInDOM()) {
			animate({
				duration: 500,
				draw: this.drawRecalculate
			});
		}
	}

	close() {
		window.removeEventListener("resize",this.onResize);
		this.animateClose();
		this.element.classList.remove(collapseOpenClass);
		this.observer.disconnect();
	}

	drawClose = progress => {
		const invertedProgress = 1 - progress,
			containerHeight = this.element.clientHeight,
			progressPercentage = invertedProgress * 100,
			heightPercentage = containerHeight / 100,
			newHeight = heightPercentage * progressPercentage;
		this.element.style.minHeight = newHeight + "px";
	};

	animateClose() {
		animate({
			duration: 500,
			draw: this.drawClose
		});
	}

	render() {
		let { content } = this.props;

		const container = div({ class: containerClass }),
			element = div({ class: contentClass });

		if(isFunction(content)) {
			content = content();
		}

		if(this.startOpen) {
			container.classList.add(containerStartOpenClass);
		}

		element.appendChild(content);
		container.appendChild(element);
		return container;
	}

}