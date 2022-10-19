export function getType(item) {
	if (typeof item === 'string') {
		return 'string';
	}

	if (typeof item === 'number') {
		return item % 1 === 0 ? 'integer' : 'number';
	}

	if (Object.prototype.toString.call(item) === '[object Array]') {
		return 'array';
	}

	if (item && typeof item === 'object') {
		return 'object';
	}

	if (typeof item === 'boolean') {
		return 'boolean';
	}
}
