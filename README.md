> This project is a **Work in Progress** and currently in development. The API is 
> subject to change without warning.

# 🌠 lightfetch 🌠
A small requests package for dirt simple usages. None of that overcomplicated stuff.
Built using **zero dependencies** to be **lightweight** and **asynchronous**.

## Install
```sh
npm install lightfetch-node@latest
```

## Usage
### Main API
```js
await lightfetch(url,[options]);
```
### Options
- method - HTTP Request Method (currently supports "GET")
- headers - HTTP Headers to use in Request
- body - Data body to use in Request

## Example
```js
// using CommonJS
const { lightfetch } = require('lightfetch-node');

// using ESM
import { lightfetch } from 'lightfetch-node';

async function fetch(url) {
	const res = await lightfetch(url, {
		method: 'GET',
		headers: {
			'X-Requested-With': 'RayhanADev'
		},
	});
	console.log('Status:', res.status);
	console.log('Response:', res.toJSON());
}

fetch('https://postman-echo.com/get?foo=bar');
```