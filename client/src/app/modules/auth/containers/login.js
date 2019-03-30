import Component from 'component';
import template from 'template';
import { login } from 'api/auth';
import { getAuth, onAuthChange, offAuthChange } from 'auth';
import { redirect } from 'router';

import LoginForm from '../components/login';

const { div, p } = template;

export default class LoginContainer extends Component {

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

	login(username,password) {
		const { authenticated } = getAuth();
		if(!authenticated) {
			return login(username, password);
		}
		return Promise.reject(new Error('You are already authenticated'));
	}

	render() {
		const form = new LoginForm({
			login: this.login
		});
		return div({
			content: form.element
		});
	}

}