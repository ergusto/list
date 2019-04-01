import Component from 'component';
import template from 'template';

const { h1, div, p } = template;

export default class LandingComponent extends Component {

	render() {
		return div({
			class: "padding-horizontal-small text-align-center",
			children: [
				h1({
					text: "Leest",
					class: "font-size-huge font-weight-medium"
				}),
				p({
					text: "Somewhere to make lists and shit",
					class: "margin-top font-size-large font-weight-medium"
				})
			]
		});
	}

}