import { removeChildren } from '../index.js';
import template from 'template';

const { div, header } = template;

import './manager.scss';

export default class RouteManager {

	constructor(main,routes) {
		this.main = main;
		this.routes = {};

		this.currentParams = {};
		this.currentRoute = null;

		this.elements = {
			header: header({ class: "layout-header" }),
			sidebar: div({ class: "layout-sidebar" }),
			primary: div({ class: "layout-primary" }),
			secondary: div({ class: "layout-secondary" }),
			tertiary: div({ class: "layout-tertiary" })
		};

		this.sections = {
			header: {},
			primary: {},
			secondary: {},
			tertiary: {},
		};

		this.activeSectionIdentifiers = {
			header: {},
			primary: null,
			secondary: null,
			tertiary: null
		};

		this.initFader();
		this.addRoutes(routes);
	}

	initFader() {
		this.fader = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.fader.setAttribute("id", "fader");
	}

	fadeInPage() {
		// Fading out the #fader will fade in the page.
		this.fader.classList.add("fader__fade-out");
		
		setTimeout(() => {
			this.main.removeChild(this.fader);
		}, 300);
	}

	pageTransition(isInitialPageLoad, callback) {
		const { header } = this.elements;

		// Fading in the #fader will fade out the page.
		if(!this.main.contains(this.fader)) {
			this.main.appendChild(this.fader);
			this.fader.style.top = header.offsetHeight;
		}
		
		if(!isInitialPageLoad) {
			this.fader.classList.add("fader__fade-in");
		}
		
		setTimeout(() => {
			if(callback) callback();
			this.fader.classList.remove("fader__fade-in");
			this.fader.classList.add("fader__fade-out");

			setTimeout(() => {
				this.fadeInPage();
			});
		}, 300);
	}

	addRoutes(routes) {
		routes.forEach(this.addRoute.bind(this));
	}

	addRoute(route) {
		this.routes[route.name] = route;
	}

	getRoute(name) {
		const route = this.routes[name];

		if(!route) {
			throw new Error('Tried to access unregistered route');
		}

		return route;
	}

	renderSection(type,templates,params,mountFn) {
		const template = templates[type],
			parent = this.elements[type];

		if(template) {
			let sectionIdentifier = template.name;

			if(template.param && params[template.param]) {
				sectionIdentifier += ("-" + params[template.param]);
			}

			if(sectionIdentifier != this.activeSectionIdentifiers[type]) {
				const renderedSection = new template.component(params);

				removeChildren(parent);
				parent.appendChild(renderedSection.element);
				mountFn(this.main, parent, renderedSection);
				
				this.activeSectionIdentifiers[type] = sectionIdentifier;
			}
		} else {
			this.activeSectionIdentifiers[type] = null;
			removeChildren(parent);
		}
	}

	renderRoute(routeName,params) {
		const currentParams = this.currentParams,
			route = this.getRoute(routeName),
			template = route.render(params);

		const isInitialPageLoad = !this.main.firstChild;

		this.pageTransition(isInitialPageLoad, () => {

			this.renderSection("header",template, params, (main,element) => {
				if(!main.contains(element)) {
					if(main.firstChild) {
						main.insertBefore(element,main.firstChild);
					} else {
						main.appendChild(element);
					}
				}
			});

			this.renderSection("primary",template,params, (main,element) => {
				if(!main.contains(element)) {
					if(main.firstChild) {
						if(main.childNodes.length > 2) {
							main.insertBefore(element,main.childNodes[0]);
						} else {
							main.appendChild(element);
						}
					} else {
						main.appendChild(element);
					}
				}
			});

			this.renderSection("secondary",template,params, (main,element) => {
				if(!main.contains(element)) {
					if(main.firstChild) {
						if(main.childNodes.length > 3) {
							main.insertBefore(element,main.childNodes[1]);
						} else {
							main.appendChild(element);
						}
					} else {
						main.appendChild(element);
					}
				}
			});

			this.renderSection("tertiary",template,params, (main,element) => {
				if(!main.contains(element)) {
					main.appendChild(element);
				}
			});

		});
	}

	routerMiddleware() {
		return (routeName,params) => {
			this.renderRoute(routeName,params);
		};
	}

}