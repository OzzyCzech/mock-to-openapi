import {getType} from './get-type.js';

/**
 * Detect format
 * @see https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types
 * @param item
 * @returns {string|string}
 */
export function getFormat(item) {
	// Integers range detection
	if (getType(item) === 'integer') {
		if (item > -2_147_483_647 && item < 2_147_483_647) {
			return 'int32';
		}

		return Number.isSafeInteger(item) ? 'int64' : 'unsafe';
	}

	if (getType(item) === 'string') {
		// Date and time detection
		if (!Number.isNaN(Date.parse(item))) {
			return item.includes('T') ? 'date-time' : 'date';
		}

		// Base64 encoded data
		const b64 = /^([A-Za-z\d+/]{4})*([A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?$/;
		if (b64.test(item)) {
			return 'byte';
		}
	}
}
