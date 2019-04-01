import Route from 'router/route.js';
import { ListDetailPage } from 'modules/lists';
import Header from 'components/site-header/auth.js';

export default new Route("list:detail", function() {
	return {
		header: {
			name: "header:unauth",
			component: Header
		},
		primary: {
			name: "list:detail",
			component: ListDetailPage
		}
	}
});