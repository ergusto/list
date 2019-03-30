import Component from 'component';
import template from 'template';

const { h2, div, p } = template;

export default class LandingComponent extends Component {

	render() {
		return div({
			class: "padding-all-2 border-all border-color-blue-grey box-shadow-large background-color-white border-radius-all",
			children: [
				h2({
					text: "Leest"
				}),
				p({
					text: "Somewhere to make lists about shit",
					class: "margin-top"
				})
			]
		});
	}

}