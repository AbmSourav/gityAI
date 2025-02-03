import { geminiClient } from "../../geminiClient.js";
import { spinner } from "../../terminalUI/spinner.js";
import { saveCommitMessage } from "./saveCommitMessage.js";

export async function generateCommitMessage(args, context = []) {
	spinner.start();

	const res = await geminiClient(context);

	spinner.stop();

	if (res.status !== 200) {
		return console.error(await res.error());
	}

	const data = await res.json();

	const commitMessage = data?.candidates[0]?.content?.parts[0]?.text ?? "";

	if (!args?.s) {
		console.log(
			"Commit Message: \n \x1b[94m" + commitMessage + "\x1b[0m\n",
		);
		console.log(
			"\x1b[90m Commit Message generated. Please review above content.\x1b[0m",
		);
	}

	await saveCommitMessage(args, commitMessage);

	return commitMessage;
}
