import { RouteManager } from 'router';
import router from './router.js';
import routes from 'app/routes';

import './styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import 'drag-drop-touch';

/***************
	Initialisation
***************/

if (!('ontouchstart' in document.documentElement)) {
	document.documentElement.classList.add('no-touch');
}

document.addEventListener("DOMContentLoaded", function() {
	const root = document.querySelector("#root"),
		routeManager = new RouteManager(root,routes);

	router.register(routeManager.routerMiddleware());
	router.start();
});