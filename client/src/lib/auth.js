import Storage from 'lib/storage';
import Emitter from 'lib/emitter';

const AUTH_EVENT = 'AUTH_EVENT';

const storage = new Storage('auth');
const emitter = new Emitter();

export const getAuth = () => storage.get();

export const setAuth = ({ id, token, username, email }) => {
	const oldAuth = getAuth();
	const nextAuth = { id, token, username, email, authenticated: true };
	storage.update(nextAuth);
	emitter.emit(AUTH_EVENT,nextAuth,oldAuth);
};

export const removeUser = () => {
	const oldAuth = getAuth();
	const nextAuth = {
		token: null,
		id: null,
		email: null,
		username: null,
		authenticated: false
	};
	storage.update(nextAuth);
	emitter.emit(AUTH_EVENT,nextAuth,oldAuth);
};

export const onAuthChange = callback => {
	emitter.on(AUTH_EVENT,callback);
};

export const offAuthChange = callback => {
	emitter.off(AUTH_EVENT,callback);
};

export const logout = callback => {
	removeUser();
	callback && callback();
}