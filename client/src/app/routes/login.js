import Route from 'router/route.js';
import { LoginPage } from 'modules/auth';
import Header from 'components/site-header/unauth.js';

export default new Route("auth:login", function() {
	return {
		header: {
			name: "header:unauth",
			component: Header
		},
		primary: {
			name: "login",
			component: LoginPage
		}
	}
});