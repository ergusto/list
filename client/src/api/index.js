import { getAuth, setAuth, logout } from 'auth';

export const getBaseHeaders = () => {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	};
};

export const getAuthHeaders = token => {
	return Object.assign({}, getBaseHeaders(), {
		'Authorization': 'JWT ' + token
	});
};

// Because fetch.json will fail on an empty response body
const parseJSON = text => new Promise(resolve => resolve(text.length ? JSON.parse(text) : {}));

const HTTP_UNAUTHORISED = 401;
const HTTP_BAD_REQUEST = 400;
export const UNAUTHORISED = 'UNAUTHORISED';
const API_ROOT = '/api/';
export const CALL_API = 'CALL_API';
export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_PATCH = 'PATCH';
export const METHOD_DELETE = 'DELETE';
const methods = [METHOD_GET, METHOD_POST, METHOD_PUT, METHOD_PATCH, METHOD_DELETE];

export function encodeParams(url,params) {
	if(Object.keys(params).length) {
		const paramString = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
		return url.indexOf('?') >= 0 ? url + paramString : ((url + '?') + paramString);
	}
	return url;
}

function callApi({ endpoint, method, body }) {
	let url = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
	
	if(url && (url.substring(url.length, url.length-1) !== '/') && (url.indexOf('?') < 0)) {
		url = url + '/';
	}
	
	const { authenticated, token } = getAuth();

	const options = {
		method,
		headers: authenticated ? getAuthHeaders(token) : getBaseHeaders()
	};

	if (body && (method === METHOD_POST || method === METHOD_PATCH || method === METHOD_PUT)) {
		options.body = JSON.stringify(body);
	}

	return fetch(url, options).then(response => {
		return response.text().then(parseJSON).then(json => {
			return new Promise((resolve, reject) => {
				if (!response.ok) {
					const { status } = response;
					if(status === 401) {
						console.log(status)
						logout();
					}
					const error = { body: json, status: response.status };
					return reject(error);
				}
				
				return resolve(json);
			});
		});
	});
};

export function getRequest(endpoint) {
	const method = METHOD_GET;
	return callApi({ endpoint, method });
}

export function postRequest(endpoint, body) {
	const method = METHOD_POST;
	return callApi({ endpoint, method, body });
}

export function putRequest(endpoint, body) {
	const method = METHOD_PUT;
	return callApi({ endpoint, method, body });
}

export function patchRequest(endpoint, body) {
	const method = METHOD_PATCH;
	return callApi({ endpoint, method, body });
}

export function deleteRequest(endpoint) {
	const method = METHOD_DELETE;
	return callApi({ endpoint, method });
}
