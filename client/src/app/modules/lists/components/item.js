import Component from "component";
import template from "template";

const { div, h4, a } = template;

export default class ListItem extends Component {

	render() {
		const { list } = this.props;
		
		return div({
			children: [
				a({
					class: "no-decoration padding-horizontal-4 padding-vertical block background-color-light-grey-on-hover cursor-pointer",
					href: "/list/" + list.id + "/" + list.slug,
					children: [
						h4({
							text: list.title,
							class: "font-weight-medium font-size-big"
						})
					]
				})
			]
		});
	}

}