import test from 'ava';
import {getFormat} from '../src/get-format.js';

test('Integer 32 bit', t => {
	t.is(getFormat(2_147_483_647 - 5000), 'int32');
});

test('Integer 64 bit', t => {
	t.is(getFormat(Number.MAX_SAFE_INTEGER), 'int64');
	t.is(getFormat(Number.MIN_SAFE_INTEGER), 'int64');
});

test('Big (unsafe) integer', t => {
	t.is(getFormat(Number.MAX_SAFE_INTEGER + 1), 'unsafe');
});

test('Date and time string', t => {
	t.is(getFormat('2022-10-21T12:01:00.900Z'), 'date-time');
	t.is(getFormat('2022-10-21 12:01:00.000000'), 'date-time');
});

test('Date without time', t => {
	t.is(getFormat('2015'), 'date');
	t.is(getFormat('1981-09-16'), 'date');
	t.is(getFormat('2015/03/25'), 'date');
	t.is(getFormat('March 21, 2012'), 'date');
});

test('Base64 data', t => {
	t.is(getFormat('ZXhhbXBsZQ=='), 'byte');
});

test('Regular string', t => {
	t.is(getFormat('week'), undefined);
});
