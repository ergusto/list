import Route from 'router/route.js';
import { LogoutContainer } from 'modules/auth';
import Header from 'components/site-header/auth.js';

export default new Route("auth:logout", function() {
	return {
		fullPageTransition: true,
		header: {
			name: "header:auth",
			component: Header
		},
		primary: {
			name: "logout",
			component: LogoutContainer
		}
	}
});