import { Router } from 'router';
	
export default new Router({
	"/login": "auth:login",
	"/logout": "auth:logout",
	"/register": "auth:register",

	"/create": "list:create",
	"/list/:listId/:listTitle": "list:detail",

	"/": "home",
});