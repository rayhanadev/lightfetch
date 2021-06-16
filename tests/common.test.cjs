const { lightfetch } = require('../dist/lightfetch.cjs');

(async function () {
	console.log('CommonJS Test. URL: https://postman-echo.com/get?foo=bar.');
	const getResponse = await lightfetch(
		'https://postman-echo.com/get?foo=bar',
		{
			method: 'GET',
			headers: {
				'X-Requested-With': 'RayhanADev',
			},
		},
	);
	console.log('Status:', getResponse.status);
	console.log('Response:', getResponse.toJSON());
	console.log('---');
	console.log('CommonJS Test. URL: https://postman-echo.com/post.');
	const postResponse = await lightfetch(
		'https://postman-echo.com/post?foo=bar',
		{
			method: 'POST',
			headers: {
				'X-Requested-With': 'RayhanADev',
			},
			body: { foo: 'bar', x: 'y' },
		},
	);
	console.log('Status:', postResponse.status);
	console.log('Response:', postResponse.toJSON());
	console.log('---');
})(lightfetch);
