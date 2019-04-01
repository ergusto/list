import Route from 'router/route.js';
import { ListCreatePage } from 'modules/lists';
import Header from 'components/site-header/auth.js';

export default new Route("list:create", function() {
	return {
		header: {
			name: "header:unauth",
			component: Header
		},
		primary: {
			name: "list:detail",
			component: ListCreatePage
		}
	}
});