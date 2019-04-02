import Component from "component";
import template from "template";
import Collapse from "components/collapse";

const { div, h4, button, p, a } = template;

export default class Item extends Component {

	renderCollapseContent() {
		const { item: { description, url } } = this.props;
		return div({
			class: "padding-all-4 background-color-light-grey",
			children: [
				p({ text: description }),
				url ? a({ text: "Visit", class: "button button--black", href: url }) : null
			]
		});
	}

	toggle() {
		if(this.collapse.isOpen()) {
			this.collapse.close();
			this.element.classList.remove("background-color-light-grey");
		} else {
			this.collapse.open();
			this.element.classList.add("background-color-light-grey");
		}
	}

	render() {
		const { item } = this.props;

		this.collapse = new Collapse({
			content: this.renderCollapseContent()
		});

		return div({
			children: [
				div({
					class: "padding-horizontal-4 padding-vertical block background-color-light-grey-on-hover cursor-pointer",
					children: [
						h4({
							text: item.title,
							class: "font-weight-medium font-size-big"
						}),
					],
					events: {
						click: this.toggle.bind(this)
					}
				}),
				this.collapse.element
			]
		});
	}

}