import { Router } from 'router';
	
const router = new Router({
	"/login": "auth:login",
	"/logout": "auth:logout",
	"/register": "auth:register",

	"/": "home",
});

export default router;
