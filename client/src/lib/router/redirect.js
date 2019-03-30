import { pushState } from 'lib';

export default function redirect(url) {
	pushState(window.history.state, null, url);
}