import ListComponent from "components/list";
import Item from '../containers/item.js';

export default class ItemList extends ListComponent {

	renderItem(item) {
		return new Item({ item }).element;
	}

}