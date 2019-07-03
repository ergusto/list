import Component from 'component';
import template from 'template';
import { register } from 'api/auth';
import { getAuth, onAuthChange, offAuthChange } from 'auth';
import { redirect } from 'router';

import RegisterForm from '../components/register.js';

const { div, p } = template;

export default class RegisterContainer extends Component {

	onMount() {
		const { authenticated } = getAuth();
		if(authenticated) {
			redirect('/');
		}
		onAuthChange(this.onAuthChange);
	}

	onUnmount() {
		offAuthChange(this.onAuthChange);
	}

	onAuthChange({ authenticated, username }) {
		if(authenticated) {
			redirect('/');
		}
	}

	register(username, password) {
		const { authenticated } = getAuth();
		if(!authenticated) {
			return register(username, password);
		}
		return Promise.reject(new Error('You are already authenticated'));
	}

	render() {
		const form = new RegisterForm({
			register: this.register
		});
		return div({
			class: "max-width-4 width-100-percent padding-all box-shadow border-radius-all background-color-white border-radius border-color-light-grey border-all",
			content: form.element
		});
	}

}