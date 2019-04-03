const state = {};

export function makeState(name, value) {
	state[name] = value;
}

export function getState(name) {
	return state[name];
}