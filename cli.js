#!/usr/bin/env node
import { parse } from "node:path";
import process from "node:process";
import chalk from "chalk";
import { globby } from "globby";
import meow from "meow";
import { readJson, toOpenApi, writeYaml } from "./src/index.js";

const cli = meow(
	`
	Usage
	  $ mock-to-openapi <input> <output>
	  
	Options
	  --write, -w Write YAML output to files (default: true) 
	  --verbose, -v Verbose output 

	Examples
	  $ mock-to-openapi ~/Downloads/*.json ~/Downloads/API
	  	  
`,
	{
		importMeta: import.meta,
		flags: {
			verbose: { type: "boolean", shortFlag: "v" },
			write: { type: "boolean", default: true, shortFlag: "w" },
		},
	},
);

// Check if input was set
if (cli.input.length === 0) {
	cli.showHelp(2);
}

const verbose = (message) => {
	if (cli.flags.verbose) {
		console.log(chalk.gray(message));
	}
};

// Search for json files
const files = await globby(cli.input[0], { expandDirectories: { extensions: ["json"] } });

// Process JSON files
if (files.length > 0) {
	verbose(`Found ${files.length} JSON files`);
	for (const file of files) {
		verbose(`Processing ${file}`);
		verbose(` - reading JSON data from ${file}`);
		const data = await readJson(file);
		const openapi = toOpenApi(data);

		// Write output
		if (cli.flags.write) {
			const output = `${cli.input[1] || parse(file).dir}/${parse(file).name}.yaml`;
			verbose(` - writing output to ${output}`);
			await writeYaml(output, openapi);
		}
	}

	console.log(chalk.green(`Done! ${files.length} JSON file(s) successfully processed`));
} else {
	console.error(chalk.red("ERROR: I didn't find any json files"));
	process.exit(1);
}
