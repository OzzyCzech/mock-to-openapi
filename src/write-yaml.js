import {mkdir, writeFile as writeFileAsync} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname} from 'node:path';
import * as YAML from 'yaml';

/**
 * Write content to the file and create directory if not exists
 *
 * @param {string} file
 * @param {object} content
 * @returns {Promise<*>}
 */
export async function writeYaml(file, content) {
	if (!existsSync(dirname(file))) {
		await mkdir(dirname(file), {recursive: true});
	}

	return writeFileAsync(file, YAML.stringify(content));
}
