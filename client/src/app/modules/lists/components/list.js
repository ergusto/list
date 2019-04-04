import ListComponent from "components/list";
import ListItem from './item.js';

export default class ListList extends ListComponent {

	renderItem(list) {
		return new ListItem({ list }).element;
	}

}