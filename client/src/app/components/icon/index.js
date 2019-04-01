import Component from "component";
import template from "template";

const { i } = template;

export default class IconComponent extends Component {

	render() {
		const { name, className, ...rest } = this.props;

		return i({
			class: (("icon fas fa-" + name) + (className ? (' ' + className) : '')),
			...rest
		});
	}

}