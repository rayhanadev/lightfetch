import getRequest from './methods/get-request.js';

export const lightfetch = (url, options = { method: 'GET' }) => {
	const { method, headers, body } = options;
	let data;
	switch (method.toLowerCase()) {
		case 'get':
			data = getRequest(url, headers, body);
			break;
		default:
			data = getRequest(url, headers, body);
			break;
	}
	return data;
};
