import { readFile as readFileAsync } from "node:fs/promises";

/**
 * Read file content as string
 * @param {string} path
 * @returns {Promise<*>}
 */
export async function readJson(path) {
	return JSON.parse(await readFileAsync(path, "utf8"));
}
