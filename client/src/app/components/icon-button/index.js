import Icon from "components/icon";
import template from "template";
import Component from 'component';

const { a } = template;

export default class IconButtonComponent extends Component {

	render() {
		const { name } = this.props;

		return a({
			class: 'icon-button color-blue--on-hover',
			content: new Icon({ name }).element
		})
	}

}