function generateUniqueIdentifier() {
  return '_' + Math.random().toString(36).substr(2, 12);
}

const componentCache = {},
	observerConfig = {
		childList: true,
		subtree: true
	};

function addNodeComponent(node) {
	if(node && node.dataset && node.dataset.componentId) {
		const component = componentCache[node.dataset.componentId];
		if(component) {
			component.onAdd();
		}
	}
}

function findAddedComponents(node) {
	let childNode;
	addNodeComponent(node);
	if(node.childNodes.length) {
		for(let i = 0, l = node.childNodes.length; i < l; i++) {
			childNode = node.childNodes[i];
			findAddedComponents(childNode);
		}
	}
}

function removeNodeComponent(node,toRemove) {
	if(node && node.dataset && node.dataset.componentId) {
		const component = componentCache[node.dataset.componentId];
		if(component) {
			toRemove.push(component);
		}
	}
}

function findRemovedComponents(node,toRemove) {
	let childNode;
	removeNodeComponent(node,toRemove);
	if(node.childNodes.length) {
		for(let i = 0, l = node.childNodes.length; i < l; i++) {
			childNode = node.childNodes[i];
			findRemovedComponents(childNode,toRemove);
		}
	}
}

function subscriber(mutations) {
	let mutation,addedNode,removedNode,addedComponent,removedComponent;
	for(let a = 0, b = mutations.length; a < b; a++) {
		mutation = mutations[a];
		const addedNodes = mutation.addedNodes,
			removedNodes = mutation.removedNodes,
			toRemove = [];

		if(removedNodes.length) {
			for(let i = 0, l = removedNodes.length; i < l; i++) {
				removedNode = removedNodes[i];
				findRemovedComponents(removedNode,toRemove);
			}
		}

		if(toRemove.length) {
			toRemove.reverse();
			for(let i = 0, l = toRemove.length; i < l; i++) {
				removedComponent = toRemove[i];
				removedComponent.onRemove();
				delete componentCache[removedComponent.componentId];
			}
		}

		if(addedNodes.length) {
			for(let i = 0, l = addedNodes.length; i < l; i++) {
				addedNode = addedNodes[i];
				findAddedComponents(addedNode);
			}
		}
	}
}

const observer = new MutationObserver(subscriber);
observer.observe(document.documentElement, observerConfig);

export default class Component {

	constructor(props) {
		this.refs = {};
		this.props = props || {};

		this.componentId = generateUniqueIdentifier();
		
		this.component_onAddedToDOM = this.component_onAddedToDOM.bind(this);
		this.component_onRemovedFromDOM = this.component_onRemovedFromDOM.bind(this);
		
		componentCache[this.componentId] = {
			onAdd: this.component_onAddedToDOM,
			onRemove: this.component_onRemovedFromDOM
		};

		this.component_start();
	}

	component_onAddedToDOM() {
		if(this.onMount) {
			this.onMount();
		}
	}

	component_onRemovedFromDOM() {
		if(this.onUnmount) {
			this.onUnmount();
		}
	}

	component_start() {
		if(!this.render) {
			console.error("Error rendering component - missing render method", this);
		}

		if(this.preRender) {
			this.preRender();
		}

		const element = this.render();

		if(!element) {
			console.error("Error rendering component - render method did not return a node", this);
		}

		element.dataset.componentId = this.componentId;
		element.dataset.componentName = this.constructor.name.toLowerCase();
		
		if(this.postRender) {
			this.postRender();
		}

		this.element = element;
	}

}