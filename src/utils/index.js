export function getDeep(obj, string, splitter = '/') {
	let result = obj;
	string.split(splitter).forEach((item) => {
		if (typeof result == 'object') result = result[item];
		else result = undefined;
	});
	return result;
}
