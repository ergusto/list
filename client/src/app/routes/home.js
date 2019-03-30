import Route from 'router/route.js';
import { getAuth } from 'auth';

import { HomePage } from 'modules/home';
import { LandingPage } from 'modules/landing';

import Header from 'components/site-header/auth.js';
import UnauthHeader from 'components/site-header/unauth.js';

export default new Route("home", function() {
	const { authenticated } = getAuth();

	if(authenticated) {
		return {
			header: {
				name: "header:auth",
				component: Header
			},
			primary: {
				name: "home",
				component: HomePage
			}
		}
	} else {
		return {
			header: {
				name: "header:unauth",
				component: UnauthHeader
			},
			primary: {
				name: "landing",
				component: LandingPage,
			}
		}
	}
});