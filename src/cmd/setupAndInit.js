import { init } from "./init.js";
import { setup } from "./setup.js";

export async function setupAndInit(args) {
	if (args?._[0] !== "setup") {
		return;
	} else if (args?._[0] === "setup" && !args?.i) {
		return;
	}

	await setup(args, false);
	await init(args);
}
