import { postRequest } from 'api';
import { setAuth } from 'auth';

const authSuccess = json => {
	const { token, user } = json;
	user.token = token;
	setAuth(user);
	return Promise.resolve(json);
};

export function login(username,password) {
	return postRequest('token', { username, password }).then(authSuccess);
}

export function register(username,password) {
	return postRequest('register', { username, password }).then(authSuccess);
}