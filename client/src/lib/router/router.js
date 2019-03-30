import { isFunction, findMatchingRoute, delegateAnchorEvents } from '../index.js';

export default class Router {

	constructor(routes) {
		this.routes = [];
		this.handlers = [];
		this.routeHandlers = {};
		this.routeHandlers['not-found'] = [];
		this.currentRoute = null;
		this.handleURLChange = this.handleURLChange.bind(this);

		if(routes) {
			this.addRoutes(routes);
		}
	}

	start() {
		this.handleURLChange();
		window.onpopstate = this.handleURLChange;

		document.body.addEventListener("click",delegateAnchorEvents);
	}

	handleURLChange() {
		const url = document.location.pathname,
			currentRoute = findMatchingRoute(url, this.routes),
			name = currentRoute.name,
			params = currentRoute.params;

		this.currentRoute = currentRoute;

		if(name === undefined) {
			this.run("not-found", {}, url);
		} else {
			this.run(name, params, url);
		}
	}

	addRoutes(routes) {
		Object.keys(routes).forEach(key => {
			this.routes.push({
				name: routes[key],
				route: key
			});
		});
	}

	register(name, handler) {
		if(isFunction(name)) {
			handler = name;
			if (this.handlers.indexOf(handler) === -1) {
				this.handlers.push(handler);
			}
		} else {
			if (!this.routeHandlers[name]) {
				this.routeHandlers[name] = [];
			}
			if (this.routeHandlers[name].indexOf(handler) === -1) {
				this.routeHandlers[name].push(handler);
			}
		}
	}

	run(name, params, url) {
		const self = this;

		this.handlers.forEach(function(handler) {
			handler(name, params, url);
		});

		if (this.routeHandlers[name]) {
			this.routeHandlers[name].forEach(function(handler) {
				handler(name, params, url);
			});
		}
	}

}