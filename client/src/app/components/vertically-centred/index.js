import Component from "component";
import template from "template";
import { createForm, setError, setErrors } from "form";
import { isString } from 'lib';

const { div, h2, button } = template;

export default class VerticallyCenteredComponent extends Component {

	constructor(props) {
		super(props);

		this.resize = this.resize.bind(this);
	}

	onMount() {
		this.resize();
		window.addEventListener("resize", this.resize);
	}

	resize() {
		const header = document.querySelector("#site-header");
		const { wrapper } = this.refs;
		
		if (wrapper) {
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			wrapper.style.minHeight = (windowHeight - header.clientHeight) + 'px';
		}
	}

	render() {
		const { children } = this.props;

		return div({
			class: "justify-centre",
			ref: { name: "wrapper", context: this.refs },
			children: [children]
		});
	}

}