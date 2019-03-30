import Route from 'router/route.js';
import { getAuth } from 'auth';
import NotFound from 'modules/errors/not-found.js';
import Header from 'components/site-header/auth.js';
import UnauthHeader from 'components/site-header/unauth.js';

export default new Route("not-found", function() {
	const { authenticated } = getAuth();

	return {
		header: {
			name: "header",
			component: authenticated ? Header : UnauthHeader,
			cache: false
		},
		primary: {
			name: "not-found",
			component: NotFound,
			cache: false
		}
	};
});