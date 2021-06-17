import requestFunc from './utils/request.js';

export const lightfetch = async (url, options = { method: 'GET' }) => {
	const { method, headers, body } = options;
	return requestFunc(method, url, headers, body);
};
