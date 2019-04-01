import Component from 'component';
import { getAuth, onAuthChange, offAuthChange } from 'auth';
import template from 'template';

import AuthHeader from './auth.js';
import UnauthHeader from './unauth.js';

const { header } = template;

export default class SiteHeader extends Component {

	onAuthChange = ({ authenticated }) => {
		while(this.refs.header.firstChild) {
			this.refs.header.removeChild(this.refs.header.firstChild);
		}
		this.refs.header.appendChild(authenticated ? this.auth() : this.unauth());
	};

	onMount() {
		onAuthChange(this.onAuthChange);
	}

	onUnmount() {
		offAuthChange(this.onAuthChange);
	}

	auth() {
		const header = new AuthHeader();
		return header.element;
	}

	unauth() {
		const header = new UnauthHeader();
		return header.element;
	}

	render() {
		const { authenticated } = getAuth();

		return header({
			class: "margin-bottom-3",
			id: "site-header",
			ref: { name: "header", context: this.refs },
			content: authenticated ? this.auth() : this.unauth()
		});
	}

}