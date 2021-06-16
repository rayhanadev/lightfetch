import https from 'https';

var getRequest = function getRequest(url, headers) {
  var urlPieces = new URL(url);
  var requestOptions = {
    hostname: urlPieces.host,
    port: urlPieces.port || 443,
    path: urlPieces.pathname + urlPieces.search,
    method: 'GET',
    headers: headers
  };
  var requestPromise = new Promise(function (resolve, reject) {
    var request = https.request(requestOptions, function (response) {
      var responseData = '';
      response.on('data', function (dataBuffer) {
        responseData += dataBuffer;
      });
      response.on('end', function () {
        var returnable = {
          response: response,
          status: response.statusCode,
          headers: response.headers,
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
          }
        };
        resolve(returnable);
      });
    });
    request.on('error', function (error) {
      reject(error);
    });
    request.end();
  });
  return requestPromise;
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var postRequest = function postRequest(url) {
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var body = arguments.length > 2 ? arguments[2] : undefined;
  var urlPieces = new URL(url);
  var formRegex = /^(([\w\s.])+=([\w\s.])+&?)+/;
  var requestSafeBody = '';

  if (_typeof(body) === 'object') {
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
  var requestOptions = {
    hostname: urlPieces.host,
    port: urlPieces.port || 443,
    path: urlPieces.pathname + urlPieces.search,
    method: 'POST',
    headers: headers
  };
  var requestPromise = new Promise(function (resolve, reject) {
    var request = https.request(requestOptions, function (response) {
      var responseData = '';
      response.on('data', function (dataBuffer) {
        responseData += dataBuffer;
      });
      response.on('end', function () {
        var returnable = {
          response: response,
          status: response.statusCode,
          headers: response.headers,
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
          }
        };
        resolve(returnable);
      });
    });
    request.on('error', function (error) {
      reject(error);
    });
    request.write(requestSafeBody);
    request.end();
  });
  return requestPromise;
};

var lightfetch = function lightfetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    method: 'GET'
  };
  var method = options.method,
      headers = options.headers,
      body = options.body;
  var requestPromise;

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
