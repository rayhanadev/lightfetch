import { lightfetch } from '../dist/lightfetch.mjs';

(async function () {
	console.log('ESM Test. URL: https://postman-echo.com/get?foo=bar.');
	const response = await lightfetch('https://postman-echo.com/get?foo=bar', {
		method: 'GET',
		headers: {
			'X-Requested-With': 'RayhanADev',
		},
	});
	console.log('Status:', response.status);
	console.log('Response:', response.toJSON());
})(lightfetch);
