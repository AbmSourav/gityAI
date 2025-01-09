import { parseArgs } from "jsr:@std/cli/parse-args";

import { help } from "./help.js";
import { version } from "./version.js";
import { setup } from "./setup.js";
import { init } from "./init.js";
import { commitMessage } from "./commitMessage.js";

export function command() {
	const args = parseArgs(Deno.args, {
		boolean: ["help"],
		alias: { help: "h", version: "v", init: "i" },
		default: { help: true },
	});

	// console.log("args", args);

	help(args);
	version(args);

	if (!Deno.env.get("GEMINI_API_KEY")) {
		console.log("%c\n  Please setup GitAI", "color: red");
		help(args, true);
		Deno.exit();
	}

	setup(args);
	init(args);

	commitMessage(args);
}
