import Route from 'router/route.js';
import { RegisterPage } from 'modules/auth';
import Header from 'components/site-header/unauth.js';

export default new Route("auth:register", function() {
	return {
		header: {
			name: "header:unauth",
			component: Header
		},
		primary: {
			name: "register",
			component: RegisterPage
		}
	}
});