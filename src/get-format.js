import {Buffer} from 'node:buffer';
import {getType} from './get-type.js';
import {DateTime} from 'luxon';

/**
 * Detect base64 string
 * @param str
 * @returns {boolean}
 */
function isBase64(string_) {
	const dec = Buffer.from(string_, 'base64').toString('utf8');
	return string_ === Buffer.from(dec, 'binary').toString('base64');
}

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

		if (!Number.isNaN(Date.parse(item))) {

			if (
				DateTime.fromFormat(item, 'yyyy').isValid ||
				DateTime.fromFormat(item, 'yyyy-MM').isValid ||
				DateTime.fromFormat(item, 'yyyy-MM-dd').isValid
			) {
				return 'date';
			}

			if (
				DateTime.fromSQL(item).isValid ||
				DateTime.fromISO(item).isValid ||
				DateTime.fromHTTP(item).isValid ||
				DateTime.fromRFC2822(item).isValid
			) {
				return 'date-time';
			}
		}

		// Base64 encoded data
		if (item && isBase64(item)) {
			return 'byte';
		}
	}
}
