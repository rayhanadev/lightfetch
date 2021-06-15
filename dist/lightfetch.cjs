'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var https = require('https');

function _interopDefaultLegacy(e) {
	return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var https__default = /*#__PURE__*/ _interopDefaultLegacy(https);

var getRequest = function getRequest(url, headers) {
	var urlPieces = new URL(url);
	var requestOptions = {
		hostname: urlPieces.host,
		port: urlPieces.port || 443,
		path: urlPieces.pathname + urlPieces.search,
		method: 'GET',
		headers: headers,
	};
	var requestPromise = new Promise(function (resolve, reject) {
		var request = https__default['default'].request(
			requestOptions,
			function (response) {
				var responseData = '';
				response.on('data', function (dataBuffer) {
					responseData += dataBuffer;
				});
				response.on('end', function () {
					var returnable = {
						response: response,
						status: response.statusCode,
						toJSON: function toJSON() {
							try {
								return JSON.parse(responseData);
							} catch (error) {
								throw new Error(error);
							}
						},
						toText: function toText() {
							try {
								return responseData;
							} catch (error) {
								throw new Error(error);
							}
						},
					};
					resolve(returnable);
				});
			},
		);
		request.on('error', function (error) {
			reject(error);
		});
		request.end();
	});
	return requestPromise;
};

var lightfetch = function lightfetch(url) {
	var options =
		arguments.length > 1 && arguments[1] !== undefined
			? arguments[1]
			: {
					method: 'GET',
			  };
	var method = options.method,
		headers = options.headers;
	options.body;
	var data;

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

exports.lightfetch = lightfetch;
