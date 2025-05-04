import { describe, expect, it } from "vitest";
import { getFormat } from "../src/get-format.js";

describe("getFormat", () => {
	it("Integer 32 bit", () => {
		expect(getFormat(2_147_483_647 - 5000)).toBe("int32");
	});

	it("Integer 64 bit", () => {
		expect(getFormat(Number.MAX_SAFE_INTEGER)).toBe("int64");
		expect(getFormat(Number.MIN_SAFE_INTEGER)).toBe("int64");
	});

	it("Big (unsafe) integer", () => {
		expect(getFormat(Number.MAX_SAFE_INTEGER + 1)).toBe("unsafe");
	});

	it("Date and time string", () => {
		expect(getFormat("2022-10-21T12:01:00.900Z")).toBe("date-time"); // ISO 8601
		expect(getFormat("2022-10-21 12:01:00.000000")).toBe("date-time"); // SQL
		expect(getFormat("2022-10-21 12:01:00")).toBe("date-time"); // SQL without millis
		expect(getFormat("Sunday, 06-Nov-94 08:49:37 GMT")).toBe("date-time"); // HTTP
		expect(getFormat("Tue, 01 Nov 2016 13:23:12 +0630")).toBe("date-time"); // RFC2822
	});

	it("Date without time", () => {
		expect(getFormat("2022")).toBe("date");
		expect(getFormat("2022-01")).toBe("date");
		expect(getFormat("2017-05-15")).toBe("date");
	});

	it("Base64 data", () => {
		expect(getFormat("ZXhhbXBsZQ==")).toBe("byte");
	});

	it("Regular string", () => {
		expect(getFormat("some string")).toBeUndefined();
		expect(getFormat("7")).toBeUndefined();
		expect(getFormat("week")).toBeUndefined();
		expect(getFormat("")).toBeUndefined();
	});
});
