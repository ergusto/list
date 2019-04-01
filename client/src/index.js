import { RouteManager } from 'router';
import router from './router.js';
import routes from 'app/routes';

import './styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';

/***************
	Initialisation
***************/

document.addEventListener("DOMContentLoaded", function() {
	const root = document.querySelector("#root"),
		routeManager = new RouteManager(root,routes);

	router.register(routeManager.routerMiddleware());
	router.start();
});