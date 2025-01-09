import { form } from "../terminalUI/form.js";

export async function setup(args) {
	if (!args?.setup) {
		return;
	}

	const apiKey = form("Set Gemini AI API Key");

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
}
