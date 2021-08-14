export function isValidEmail(email) {
	const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
	return emailPattern.test(email);
}

export function isObject(obj) {
	return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
}

export function isEmptyObject(obj) {
	return obj && isObject(obj) && Object.keys(obj).length === 0 && obj.constructor === Object;
}
