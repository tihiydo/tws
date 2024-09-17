export default function param(obj) {
	const queryString = [];

	function buildParam(key, value) {
		if (typeof value === 'object' && value !== null) {
			for (const subKey in value) {
				if (Object.hasOwnProperty.call(value, subKey)) {
					buildParam(`${key}[${subKey}]`, value[subKey]);
				}
			}
		} else {
			queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
		}
	}

	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			const value = obj[key];
			buildParam(key, value);
		}
	}

	return queryString.join('&');
}