import { isString, isObject, isArray, isFunction, isDOMNode, extend } from 'lib';

function templater(options) {
	let prop,
		textNode,
		refName,
		refContext;

	const { events, ref, elementType, content, text, children, click, submit, keyup, keydown, focus, blur, keypress } = options;

	const element = document.createElement(elementType);

	delete options['ref'];
	delete options['elementType'];
	delete options['events'];
	delete options['content'];
	delete options['text'];
	delete options['parent'];
	delete options['children'];

	if(events) {
		for(let eventType in events) {
			if(Object.prototype.hasOwnProperty.call(events,eventType)) {
				element.addEventListener(eventType, events[eventType]);
			}
		}
	}

	for(prop in options) {
		if(Object.prototype.hasOwnProperty.call(options, prop)) {
			element.setAttribute(prop,options[prop]);
		}
	}

	if(content) {
		if(isFunction(content)) {
			content = content();
		}

		if(isObject(content)) {
			content = templater(content);
		}

		element.appendChild(content);
	}

	if(children && isArray(children)) {
		children.forEach(function(child) {
			if(child) {
				if(isDOMNode(child)) {
					element.appendChild(child);
				} else if(isObject(child)) {
					element.appendChild(templater(child));
				} 
			}
		});
	}

	if(text && isString(text)) {
		textNode = document.createTextNode(text);
		element.appendChild(textNode);
	}

	if(parent && isDOMNode(parent)) {
		parent.appendChild(element);
	}
	
	if(ref && isObject(ref)) {
		refName = ref.name;
		refContext = ref.context;
		
		if(!refName || !refContext) {
			throw new Error("Templater ref object must contain name and context properties");
		}

		refContext[refName] = element;
	}

	return element;
}

function makeTemplateFunction(elementType) {
	let children;
	return function(template) {
		if(!template) template = {};
		if(!isObject(template)) {
			if(isArray(template)) {
				children = template;
			} else if(isDOMNode(template)) {
				children = Array.prototype.slice.call(arguments);
			}
			template = {};
			template.children = children;
		}
		template.elementType = elementType;
		return templater(template);
	};
}

function fragment(...children) {
	var fragment = document.createDocumentFragment();

	children.forEach(child => {
		if(child && isDOMNode(child)) {
			fragment.appendChild(child);
		}
	});

	return fragment;
}

function text(content) {
	return document.createTextNode(content);
}

function Templater(types) {
	if(!types) {
		types = Templater.types;
	} else if(!isArray(types)) {
		types = Array.prototype.slice.call(arguments);
	}

	function templater(options) {
		return templater(options);
	}

	templater.fragment = fragment;
	templater.text = text;
	
	types.forEach(function(type) {
		templater[type] = makeTemplateFunction(type);
	});

	return templater;
}

Templater.types = ['address','article','aside','footer','header','h1','h2','h3','h4','h5','h6','hgroup','nav','section','blockquote','dd','dir','div','dl','dt','figcaption','figure','hr','li','main','ol','pre','ul','a','abbr','b','bdi','bdo','br','cite','code','data','dfn','em','i','kbd','mark','nobr','q','rp','rt','rtc','ruby','s','samp','small','span','strong','sub','sup','time','tt','u','var','wbr','area','audio','img','map','track','video','applet','embed','iframe','noembed','object','param','picture','source','canvas','noscript','script','del','ins','caption','col','colgroup','table','tbody','td','tfoot','th','thead','tr','button','datalist','fieldset','form','input','label','legend','meter','optgroup','option','output','progress','select','textarea','details','dialog','menu','menuitem','summary','content','element','shadow','slot','template','p'];

export default Templater;
