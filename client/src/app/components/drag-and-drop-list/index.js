import Component from 'component';
import ListComponent from 'components/list';
import template from 'template';

import './style.scss';

const { div, h4, button, p, a, span } = template;

const ELEMENT_DRAG_OVER_CLASS = "drag-and-drop__drag-over";

export default class DragAndDropListComponent extends ListComponent {

	constructor(props = {}) {
		props.className = "drag-and-drop__list";
		super(props);

		this.draggedItem = null;
	}

	onDragStart(itemComponent, event) {
		const { item } = itemComponent.props;

		this.draggedItem = item;
	}

	onDragOver(itemComponent, event) {
		if(event.preventDefault){
			event.preventDefault();
		}

		event.dataTransfer.dropEffect = "move";

		return false;
	}

	onDragEnter(itemComponent, event) {
		const { element } = itemComponent;

		element.classList.add(ELEMENT_DRAG_OVER_CLASS);
	}

	onDragLeave(itemComponent, event) {
		const { element } = itemComponent;

		if(event.currentTarget.contains(event.relatedTarget)) {
			return;
		}

		element.classList.remove(ELEMENT_DRAG_OVER_CLASS);
	}

	_onDrop(itemComponent, event) {
		const { element, props: { item } } = itemComponent;

		element.classList.remove(ELEMENT_DRAG_OVER_CLASS);

		if(!this.draggedItem) {
			return;
		}

		if(this.onDrop) {
			this.onDrop(this.draggedItem, item);
		}
	}

	onDragEnd(itemComponent, event) {
		const { element } = itemComponent;
		element.classList.remove(ELEMENT_DRAG_OVER_CLASS);
		this.draggedItem = null;
	}

	renderItem(item) {
		const Component = this.props.component,
			itemComponent = new Component({ item });

		const element = div({
			draggable: true,
			content: itemComponent.element,
		});

		element.addEventListener("dragstart", this.onDragStart.bind(this, itemComponent));
		element.addEventListener("dragenter", this.onDragEnter.bind(this, itemComponent));
		element.addEventListener("dragover", this.onDragOver.bind(this, itemComponent));
		element.addEventListener("dragleave", this.onDragLeave.bind(this, itemComponent));
		element.addEventListener("drop", this._onDrop.bind(this, itemComponent));
		element.addEventListener("dragend", this.onDragEnd.bind(this, itemComponent));

		return element;
	}

}