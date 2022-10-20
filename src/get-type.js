/**
 * Convert javascript variable to OpenAPI data types
 *
 * @see https://swagger.io/docs/specification/data-models/data-types/
 * string, number, integer, boolean, array, object
 *
 * @param item
 * @returns {string|string}
 */
export function getType(item) {
	if (typeof item === 'string') {
		return 'string';
	}

	if (typeof item === 'number') {
		return Number.isInteger(item) ? 'integer' : 'number';
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
