import template from "template";
import ListComponent from "components/list";
import ListItem from './item.js';

const { div, h2,  } = template;

export default class ListList extends ListComponent {

	renderItem(list) {
		return new ListItem({ list }).element;
	}

}