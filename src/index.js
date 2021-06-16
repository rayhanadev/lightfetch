import getRequest from './methods/get-request.js';
import postRequest from './methods/post-request.js';

export const lightfetch = async (url, options = { method: 'GET' }) => {
	const { method, headers, body } = options;
	let requestPromise;
	switch (method.toLowerCase()) {
		case 'get':
			requestPromise = getRequest(url, headers);
			break;
		case 'post':
			requestPromise = postRequest(url, headers, body);
			break;
		default:
			requestPromise = getRequest(url, headers);
			break;
	}
	return requestPromise;
};
