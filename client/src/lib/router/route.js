// renderFunction is expected to return an object mapping components to panel sections
export default function Route(name,renderFunction) {
	this.name = name;
	this.render = renderFunction;
}