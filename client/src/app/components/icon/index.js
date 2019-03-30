import Component from "component";
import template from "template";

const { i } = template;

export default class IconComponent extends Component {

	render() {
		const { name, className } = this.props;

		return i({
			class: (("fas fa-" + name) + (className ? (' ' + className) : ''))
		});
	}

}