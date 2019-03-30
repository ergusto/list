import Component from 'component';
import template from 'template';
import { getAuth, logout } from 'auth';
import { redirect } from 'router';

const { div } = template;

export default class LogoutContainer extends Component {

	onMount() {
		const { authenticated } = getAuth();

		if(authenticated) {
			logout(() => redirect("/"));
		} else {
			redirect('/');
		}
	}

	render() {
		return div({ text: "Logout page" });
	}

}