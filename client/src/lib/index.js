export function toString(obj) {
	return Object.prototype.toString.call(obj);
}

export function isArray(obj) {
	return toString(obj) === "[object Array]";
}

export function isFunction(obj) {
	return toString(obj) === "[object Function]";
}

export function isString(obj) {
	return toString(obj) === "[object String]";
}

export function isObject(object) {
	return object instanceof Object && object.constructor === Object;
}

export function isElement(element) {
	return element instanceof Element;  
}

export function isDOMNode(node) {
	return node instanceof Node;
}

export function extend(source,properties) {
	var property;
	for(property in properties) {
		if(properties.hasOwnProperty(property)) {
			source[property] = properties[property];
		}
	}
	return source;
}

export function createElement(type,options,text,children) {
	const element = document.createElement(type);

	for(let option in options) {
		element.setAttribute(option, options[option]);
	}

	if(text) {
		const textNode = document.createTextNode(text);
		element.appendChild(textNode);
	}

	if(children) {
		if(!Object.prototype.toString.call(children) === "[Object Array]") {
			children = [children];
		}
		
		children.forEach(function(child) {
			element.appendChild(child);
		});
	}

	return element;
}

export function generateUniqueIdentifier() {
  return '_' + Math.random().toString(36).substr(2, 12);
};

export function pathToArray(path) {
	return path.split("/").filter(function(part) {
		return !!part;
	});
}

export function isCaptureGroup(string) {
	return string.charAt(0) === ":";
}

// If the current route (path) matches provided route, 
// return an object containing captured params, otherwise false.
export function matchRouteAndGetParams(path,route) {
	let match = true;
	const params = {},
		pathPartArray = pathToArray(path),
		routePartArray = pathToArray(route);

	if(pathPartArray.length !== routePartArray.length) {
		return false;
	}

	for(var i = 0, l = pathPartArray.length; i < l; i++) {
		let pathPart = pathPartArray[i],
			routePart = routePartArray[i];

		if (isCaptureGroup(routePart)) {
			params[routePart.slice(1)] = pathPart;
		} else if (pathPart !== routePart) {
			match = false;
			break;
		}
	}

	return match ? params : false;
}

export function findMatchingRoute(path,routes) {
	let route,
		params;

	for(let i = 0, l = routes.length; i < l; i++) {
		route = routes[i];
		// route matches if matchRouteAndGetParams returns non-falsy
		params = matchRouteAndGetParams(path,route.route);

		if(params) {
			return {
				name: route.name,
				params: params
			}
		}
	}

	return false;
}

export function findParentByTagName(parent, tagName) {
    while (parent !== null && parent.tagName !== tagName.toUpperCase()) {
        parent = parent.parentNode;
    }
    return parent;
}

export function pushState(state, title, url) {
	window.history.pushState(state, title, url);

	try {
		var popstateEvent = new PopStateEvent('popstate', {
			bubbles: false,
			cancelable: false,
			state: window.history.state
		});

		if ('dispatchEvent_' in window) {
			window.dispatchEvent_(popstateEvent);
		} else {
			window.dispatchEvent(popstateEvent);
		}
	} catch(error) {
		var customEvent = document.createEvent('CustomEvent');
		customEvent.initCustomEvent('popstate', false, false, { state: window.history.state });
		window.dispatchEvent(customEvent);
	}
}

export function delegateAnchorEvents(event) {
	const anchorParent = findParentByTagName(event.target,"a");
	if(anchorParent) {
		const href = anchorParent.getAttribute("href");
		
		if(!href) {
			return;
		}

		if(href.indexOf("http") === 0 && window.location.host !== new URL(href).host) {
			return;
		}

		event.preventDefault();
		pushState(JSON.parse(anchorParent.getAttribute('state')) || window.history.state, anchorParent.getAttribute('title'), href);
	}
}

export function removeChildren(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.firstChild);
	}
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
const dayOfWeekNames = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];

function padToTwoDigits(num) {
    return num < 10 ? "0" + num : num;
}

export function formatDate(dateString, datePattern){
	const date = new Date(dateString);
    if (!datePattern) {
        datePattern = 'HH:mm on dd MMMM yyyy';
    }
    const day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        miliseconds = date.getMilliseconds(),
        h = hour % 12,
        hh = padToTwoDigits(h),
        HH = padToTwoDigits(hour),
        mm = padToTwoDigits(minute),
        ss = padToTwoDigits(second),
        aaa = hour < 12 ? 'AM' : 'PM',
        EEEE = dayOfWeekNames[date.getDay()],
        EEE = EEEE.substr(0, 3),
        dd = padToTwoDigits(day),
        M = month + 1,
        MM = padToTwoDigits(M),
        MMMM = monthNames[month],
        MMM = MMMM.substr(0, 3),
        yyyy = year + "",
        yy = yyyy.substr(2, 2);
    return datePattern
      .replace('hh', hh).replace('h', h)
      .replace('HH', HH).replace('H', hour)
      .replace('mm', mm).replace('m', minute)
      .replace('ss', ss).replace('s', second)
      .replace('S', miliseconds)
      .replace('dd', dd).replace('d', day)
      .replace('MMMM', MMMM).replace('MMM', MMM).replace('MM', MM)
      .replace('EEEE', EEEE).replace('EEE', EEE)
      .replace('yyyy', yyyy)
      .replace('yy', yy)
      .replace('aaa', aaa);
}


export const clickEventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

export function animate({ timing, draw, duration, end }) {
	const start = performance.now();

	if(!timing) {
		timing = function(timeFraction) {
			return timeFraction;
		};
	}

	requestAnimationFrame(function animate(time) {
		// timeFraction goes from 0 to 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// calculate the current animation state
		const progress = timing(timeFraction);

		draw(progress); // draw it

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		} else {
			end && end();
		}

	});
}

export function throttle(callback, wait) {
	var timeout = null,
		callbackArgs = null,
		context = null;

	function clear() {
		timeout = null;
	}

	return function() {
		if (!timeout) {
			callbackArgs = arguments;
			context = this;
			callback.apply(context, callbackArgs);
			timeout = setTimeout(clear, wait);
		}
	}
}

export function isInDOM(node) {
	return (node === document.body) ? false : document.body.contains(node);
}