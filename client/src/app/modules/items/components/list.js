import DragAndDropListComponent from "components/drag-and-drop-list";
import Item from '../containers/item.js';
import { Items } from 'collections';

export default class ItemList extends DragAndDropListComponent {

	constructor(props = {}) {
		props.component = Item;
		super(props);
	}

	onDrop(dropped, target) {
		Items.moveTo(dropped, target.order);
	}

}