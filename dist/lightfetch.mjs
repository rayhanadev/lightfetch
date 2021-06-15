import https from 'https';

const getRequest = (url, headers) => {
	const urlPieces = new URL(url);
	
	const requestOptions = {
		hostname: urlPieces.host,
		port: urlPieces.port ?? 443,
		path: urlPieces.pathname + urlPieces.search,
		method: 'GET',
		headers,
	};

	const requestPromise = new Promise((resolve, reject) => {
		const request = https.request(requestOptions, (response) => {
			let responseData = "";
			
			response.on('data', (dataBuffer) => {
				responseData += dataBuffer;
			});
			
			response.on('end', () => {
				const returnable = {
					response,
					status: response.statusCode,
					toJSON: () => {
						try {
							return JSON.parse(responseData);
						} catch(error) {
							throw new Error(error);
						}					},
					toText: () => {
						try {
							return responseData
						} catch(error) {
							throw new Error(error);
						}					}
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

const lightfetch = (url, options = { method: 'GET' }) => {
	const { method, headers, body } = options;
	let data;
	switch (method.toLowerCase()) {
		case 'get':
			data = getRequest(url, headers);
			break;
		default:
			data = getRequest(url, headers);
			break;
	}
	return data;
};

export { lightfetch };
