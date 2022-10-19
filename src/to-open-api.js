/**
 * Convert item to OpenAPI schema
 * @param item
 * @returns {{format: (string), type: string, example: number}|{type: string, items: {type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint")}}|{format: string, type: string}|{}|{type: string, example: string}|{type: string, example: number}|{type: string, example: boolean}|{format: string, type: string, example: number}}
 */
import {getType} from './get-type.js';

export function toOpenApi(item) {
	const oa = {};

	switch (getType(item)) {
		case 'object':
			oa.type = 'object';
			oa.properties = {};
			for (const [key, value] of Object.entries(item)) {
				oa.properties[key] = toOpenApi(value);
			}
			break;
		case 'array':
			return {
				type: 'array',
				items: toOpenApi(item[0]),
			};
		case 'integer':
			if (item < 2_147_483_647 && item > -2_147_483_647) {
				return {type: 'integer', format: 'int32', example: item};
			}
			return {type: 'integer', format: Number.isSafeInteger(item) ? 'int64' : 'unsafe', example: item};
		case 'number':
			return {type: 'number', example: item};
		case 'boolean':
			return {type: 'boolean', example: item};
		case 'string':
			return {type: 'string', example: item};
		default:
			return {type: 'string', format: 'nullable'}
	}

	return oa;
}
