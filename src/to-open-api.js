/**
 * Convert item to OpenAPI schema
 * @param item
 * @returns {{format: (string), type: string, example: number}|{type: string, items: {type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint")}}|{format: string, type: string}|{}|{type: string, example: string}|{type: string, example: number}|{type: string, example: boolean}|{format: string, type: string, example: number}}
 */
import {getType} from './get-type.js';
import {getFormat} from './get-format.js';

export function toOpenApi(item) {
	const oa = {};

	const format = getFormat(item);
	const type = getType(item);
	const example = item;

	switch (type) {
		case 'object':
			oa.type = 'object';
			oa.properties = {};
			for (const [key, value] of Object.entries(item)) {
				oa.properties[key] = toOpenApi(value);
			}

			break;
		case 'array':
			return {type, items: toOpenApi(item[0])};
		case 'integer':
			return {type, format, example};
		case 'number':
			return {type, example};
		case 'boolean':
			return {type, example};
		case 'string':
			return format ? {type, format, example} : {type, example};
		default:
			return {type: 'string', format: 'nullable'};
	}

	return oa;
}
