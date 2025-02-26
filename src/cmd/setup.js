import { findContentInFile } from "../helper/findContentInFile.js";
import { textPrompt } from "../terminalUI/textPrompt.js";

export async function setup(args, exit = true) {
	if (args?._[0] !== "setup") {
		return;
	}

	const appVersion = Deno.env.get("GITYAI_VERSION");

	const apiKey = textPrompt("Set Gemini AI API Key", "GityAI uses Gemini AI, you need to set a API key to use it.");

	if (!apiKey) {
		return console.error(
			"%c\nGityAI uses Gemini AI.\nGenerate API key from: https://aistudio.google.com/apikey\nThen please run `GityAI setup` again and provide a the API key.\n",
			"color: red",
		);
	}

	const encoder = new TextEncoder();
	const apiKeyData = encoder.encode("\nGITYAI_VERSION=" + appVersion + "\nGEMINI_API_KEY=" + apiKey + "\n");
	const hasGiminiEnv = await findContentInFile(Deno.cwd() + "/.env", "GEMINI_API_KEY=", true);
	if (! hasGiminiEnv) {
		await Deno.writeFile(Deno.cwd() + "/.env", apiKeyData, { append: true });
	}

	const hasEnvInGitIgnore = await findContentInFile(Deno.cwd() + "/.gitignore", ".env");
	if (! hasEnvInGitIgnore) {
		await Deno.writeTextFile(Deno.cwd() + "/.gitignore", "\n.env\n", { append: true });
	}

	console.log("%c\n GityAI has been configured\n", "color: green");

	if (exit) {
		Deno.exit(0);
	}
}
