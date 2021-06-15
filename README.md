> This project is a **Work in Progress** and currently in development. The API is
> subject to change without warning.

<p align="center">
  <a href="https://github.com/RayhanADev/lightfetch">
    <img src="images/lightfetch.png" alt="lightfetch-splash" width="960" height="505">
  </a>

  <h3 align="center">🌠 lightfetch 🌠</h3>

  <p align="center">
    A small requests package for dirt simple usages. Built using <strong>zero dependencies</strong> to be <strong>lightweight</strong> and <strong>asynchronous</strong>.
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/lightfetch-node">View Package on NPM</a>·
    <a href="https://github.com/RayhanADev/lightfetch/issues">Report Bug</a>·
    <a href="https://github.com/RayhanADev/lightfetch/issues">Request Feature</a>
  </p>
</p>

## Install

```sh
npm install lightfetch-node@latest
```

## Usage

### Main API

```js
await lightfetch(url, [options]);
```

### Options

-   method - HTTP Request Method (currently supports "GET")
-   headers - HTTP Headers to use in Request
-   body - Data body to use in Request

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
			'X-Requested-With': 'RayhanADev',
		},
	});
	console.log('Status:', res.status);
	console.log('Response:', res.toJSON());
}

fetch('https://postman-echo.com/get?foo=bar');
```
