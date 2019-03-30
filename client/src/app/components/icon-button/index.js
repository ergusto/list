import Icon from "components/icon";
import template from "template";

const { a } = template;

export default class IconButtonComponent extends Component {

	render() {
		const { name } = this.props;

		return a({
			class: 'icon-button color-blue--on-hover',
			content: Icon({ name }).element
		})
	}

}