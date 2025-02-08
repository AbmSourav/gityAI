import { parseArgs } from "jsr:@std/cli/parse-args";

import { help } from "./help.js";
import { version } from "./version.js";
import { setup } from "./setup.js";
import { init } from "./init.js";
import { commitMessage } from "./commitMessage.js";
import { setupAndInit } from "./setupAndInit.js";

export async function command() {
	const args = parseArgs(Deno.args, {
		boolean: ["help"],
		alias: { help: "h", version: "v" },
	});

	await setupAndInit(args);

	await setup(args);

	if (!Deno.env.get("GEMINI_API_KEY")) {
		console.log("%c\n  Please setup GityAI", "color: red");
		help(args, true);
		Deno.exit();
	}

	await init(args);

	await commitMessage(args);

	version(args);
	help(args);
}
