import { textPrompt } from "../terminalUI/textPrompt.js";

export async function setup(args) {
	if (args?._[0] !== "setup") {
		return;
	}

	const apiKey = textPrompt("Set Gemini AI API Key", "GitAI uses Gemini AI, you need to set a API key to use it.");

	if (!apiKey) {
		return console.error(
			"%c\nGitAI uses Gemini AI.\nGenerate API key from: https://aistudio.google.com/apikey\nThen please run `gitAI --setup` again and provide a the API key.\n",
			"color: red",
		);
	}

	const encoder = new TextEncoder();
	const data = encoder.encode("GEMINI_API_KEY=" + apiKey + "\n");
	await Deno.writeFile(".env", data);

	console.log("%c  GitAI has been configured\n", "color: green");
	Deno.exit(0);
}
