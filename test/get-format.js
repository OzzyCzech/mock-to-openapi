import test from "ava";
import { getFormat } from "../src/get-format.js";

test("Integer 32 bit", (t) => {
	t.is(getFormat(2_147_483_647 - 5000), "int32");
});

test("Integer 64 bit", (t) => {
	t.is(getFormat(Number.MAX_SAFE_INTEGER), "int64");
	t.is(getFormat(Number.MIN_SAFE_INTEGER), "int64");
});

test("Big (unsafe) integer", (t) => {
	t.is(getFormat(Number.MAX_SAFE_INTEGER + 1), "unsafe");
});

test("Date and time string", (t) => {
	t.is(getFormat("2022-10-21T12:01:00.900Z"), "date-time"); // ISO 8601
	t.is(getFormat("2022-10-21 12:01:00.000000"), "date-time"); // SQL
	t.is(getFormat("2022-10-21 12:01:00"), "date-time"); // SQL without millis
	t.is(getFormat("Sunday, 06-Nov-94 08:49:37 GMT"), "date-time"); //  HTTP
	t.is(getFormat("Tue, 01 Nov 2016 13:23:12 +0630"), "date-time"); //  RFC2822
});

test("Date without time", (t) => {
	t.is(getFormat("2022"), "date");
	t.is(getFormat("2022-01"), "date");
	t.is(getFormat("2017-05-15"), "date");
});

test("Base64 data", (t) => {
	t.is(getFormat("ZXhhbXBsZQ=="), "byte");
});

test("Regular string", (t) => {
	t.is(getFormat("some string"), undefined);
	t.is(getFormat("7"), undefined);
	t.is(getFormat("week"), undefined);
	t.is(getFormat(""), undefined);
});
