import Component from "component";
import template from "template";
import ListComponent from "components/list";
import Item from './item.js';

const { div, h2,  } = template;

export default class ItemList extends ListComponent {

	renderItem(item) {
		return new Item({ item }).element;
	}

}