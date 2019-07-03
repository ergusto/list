import { RouteManager } from 'router';
import router from './router.js';
import routes from 'app/routes';
import 'drag-drop-touch';

import './styles/main.scss';
import 'typeface-raleway';
import '@fortawesome/fontawesome-free/css/all.css';

["background-color-lightest-grey","typeface-raleway"].forEach(className => document.body.classList.add(className));

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