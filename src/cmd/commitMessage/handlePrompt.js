import { textPrompt } from "../../terminalUI/textPrompt.js";
import { generateCommitMessage } from "./generateCommitMessage.js";
import { makeCommit } from "./makeCommit.js";

export async function handlePrompt(args, diff, commitMessage) {
	const prompt = textPrompt("Prompt", "Write a prompt to generate the commit message", 4, true);

	if (!prompt) {
		return;
	}

	console.log("\n");

	const data = await generateCommitMessage(args, [{
		parts: [
			{
				text: "You are a Software engineer. Write a detail Git commit message based on the changes",
			},
			{ text: diff },
			{ text: commitMessage },
			{ text: prompt },
		],
	}]);

	await makeCommit(args, data);

	return data;
}
