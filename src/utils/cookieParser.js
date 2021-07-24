const parseCookieString = (cookieValue) => {
	const parts = cookieValue
		.split(';')
		.filter((str) => typeof str === 'string' && !!str.trim());
	const item = parts.shift().split('=');
	const name = item.shift();
	const value = decodeURIComponent(item.join('='));

	const cookie = {
		name: name,
		value: value,
	};

	parts.forEach((part) => {
		const args = part.split('=');
		const key = args.shift().trimLeft().toLowerCase();
		const value = args.join('=');
		switch (key) {
			case 'path': {
				cookie['Path'] = value;
				break;
			}
			case 'expires': {
				cookie['Expires'] = new Date(value);
				break;
			}
			case 'max-age': {
				cookie['Max-Age'] = parseInt(value, 10);
				break;
			}
			case 'secure': {
				cookie['Secure'] = true;
				break;
			}
			case 'httponly': {
				cookie['HttpOnly'] = true;
				break;
			}
			case 'samesite': {
				cookie['SameSite'] = value;
				break;
			}
			default: {
				cookie[key] = value;
			}
		}
	});

	return cookie;
};

const parseCookie = ({ headers: { 'set-cookie': input } }) => {
	if (!Array.isArray(input)) input = [input];

	const cookies = {};
	return input
		.filter((str) => typeof str === 'string' && !!str.trim())
		.reduce((cookies, str) => {
			const cookie = parseCookieString(str);
			cookies[cookie.name] = cookie;
			return cookies;
		}, cookies);
};

export default parseCookie;
