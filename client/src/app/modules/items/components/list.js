import DragAndDropListComponent from "components/drag-and-drop-list";
import Item from '../containers/item.js';

export default class ItemList extends DragAndDropListComponent {

	constructor(props = {}) {
		props.component = Item;
		super(props);
	}

	onDrop(dropped, target) {
		const { onDrop } = this.props;

		if(onDrop) {
			onDrop(dropped, target);
		}
	}

}