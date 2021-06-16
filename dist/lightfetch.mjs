import https from 'https';

const getRequest = (url, headers) => {
	const urlPieces = new URL(url);

	const requestOptions = {
		hostname: urlPieces.host,
		port: urlPieces.port || 443,
		path: urlPieces.pathname + urlPieces.search,
		method: 'GET',
		headers,
	};

	const requestPromise = new Promise((resolve, reject) => {
		const request = https.request(requestOptions, (response) => {
			let responseData = '';

			response.on('data', (dataBuffer) => {
				responseData += dataBuffer;
			});

			response.on('end', () => {
				const returnable = {
					response,
					status: response.statusCode,
					headers: response.headers,
					toJSON: () => {
						try {
							return JSON.parse(responseData);
						} catch (error) {
							throw new Error(error);
						}
					},
					toText: () => {
						try {
							return responseData;
						} catch (error) {
							throw new Error(error);
						}
					},
				};
				resolve(returnable);
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		request.end();
	});
	return requestPromise;
};

const postRequest = (url, headers = {}, body) => {
	const urlPieces = new URL(url);
	const formRegex = /^(([\w\s.])+=([\w\s.])+&?)+/;

	let requestSafeBody = '';
	if (typeof body === 'object') {
		headers['Content-Type'] = 'application/json';
		requestSafeBody = JSON.stringify(body);
	} else if (typeof body === 'string' && formRegex.test(decodeURI(body))) {
		headers['Content-Type'] = 'application/x-www-form-urlencoded';
		requestSafeBody = body;
	} else {
		headers['Content-Type'] = 'text/plain';
		requestSafeBody = body;
	}

	headers['Content-Length'] = requestSafeBody.length;

	const requestOptions = {
		hostname: urlPieces.host,
		port: urlPieces.port || 443,
		path: urlPieces.pathname + urlPieces.search,
		method: 'POST',
		headers,
	};

	const requestPromise = new Promise((resolve, reject) => {
		const request = https.request(requestOptions, (response) => {
			let responseData = '';

			response.on('data', (dataBuffer) => {
				responseData += dataBuffer;
			});

			response.on('end', () => {
				const returnable = {
					response,
					status: response.statusCode,
					headers: response.headers,
					toJSON: () => {
						try {
							return JSON.parse(responseData);
						} catch (error) {
							throw new Error(error);
						}
					},
					toText: () => {
						try {
							return responseData;
						} catch (error) {
							throw new Error(error);
						}
					},
				};
				resolve(returnable);
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		request.write(requestSafeBody);
		request.end();
	});
	return requestPromise;
};

const lightfetch = async (url, options = { method: 'GET' }) => {
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

export { lightfetch };
