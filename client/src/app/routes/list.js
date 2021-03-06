import Route from 'router/route.js';
import { ListDetailPage } from 'modules/lists';
import Header from 'components/site-header/auth.js';

export default new Route("list:detail", function({ listId }) {
	return {
		header: {
			name: "header:auth",
			component: Header
		},
		primary: {
			name: "list:detail:" + listId,
			component: ListDetailPage
		}
	}
});