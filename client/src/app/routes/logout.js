import Route from 'router/route.js';
import { LogoutContainer } from 'modules/auth';

export default new Route("auth:logout", function() {
	return {
		primary: {
			name: "logout",
			component: LogoutContainer
		}
	}
});