export async function saveCommitMessage(args, commitMessage) {
	if (!args?.s) {
		return;
	}

	const path = Deno.cwd() + "/.GityAI/commit-message.md";

	await Deno.writeTextFile(path, commitMessage)
		.finally(() => {
			console.log(
				`\x1b[90m  Commit message has been generated and saved in ${path}\n  Please review.\x1b[0m`,
			);
		});
}
