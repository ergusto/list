import Component from 'component';
import template from 'template';
import { removeChildren } from 'lib';

const { div, p, button, h2 } = template;

export default class ListDetailComponent extends Component {

	render() {
		const { list } = this.props;

		return div({
			class: "padding-horizontal-4 padding-top-2 padding-bottom",
			children: [
				h2({
					text: list.title + ":",
					class: "font-weight-bold font-size-huge margin-right-4"
				})
			]
		});
	}

}