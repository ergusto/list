import { Router } from 'router';
	
const router = new Router({
	"/login": "auth:login",
	"/logout": "auth:logout",
	"/register": "auth:register",

	"/create": "list:create",
	"/list/:listId/:listTitle": "list:detail",

	"/": "home",
});

export default router;
