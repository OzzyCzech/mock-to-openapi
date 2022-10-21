import test from 'ava';
import {getFormat} from '../src/get-format.js';

test('Integer 32 bit', t => {
	const int32 = getFormat(2_147_483_647 - 5000);
	t.is(int32, 'int32');
});

test('Integer 64 bit', t => {
	const int64max = getFormat(Number.MAX_SAFE_INTEGER);
	t.is(int64max, 'int64');

	const int64min = getFormat(Number.MIN_SAFE_INTEGER);
	t.is(int64min, 'int64');
});

test('Big (unsafe) integer', t => {
	const unsafe = getFormat(Number.MAX_SAFE_INTEGER + 1);
	t.is(unsafe, 'unsafe');
});

test('Date and time string', t => {
	const datetime = getFormat(new Date().toISOString());
	t.is(datetime, 'date-time');
});

test('Date without time', t => {
	const datetime = getFormat('1981-01-01');
	t.is(datetime, 'date');
});

test('Base64 data', t => {
	const base64 = getFormat('ZXhhbXBsZQ==');
	t.is(base64, 'byte');
});

test('Regular string', t => {
	const base64 = getFormat('week');

	console.log('it is', base64);
	t.is(base64, undefined);
});
