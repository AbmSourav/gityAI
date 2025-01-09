export async function init(args) {
	if (!args?.init) {
		return;
	}

	const path = Deno.cwd();

	let hasGitaiDir = await Deno.stat(path + "/.gitai")
		.then((dirInfo) => dirInfo)
		.catch(() => false);

	if (hasGitaiDir?.isDirectory) {
		console.log("\x1b[90m\n  Already initialized\x1b[0m\n");
		return;
	}

	const hasCommitMessageFile = await Deno.stat(
		path + "/.gitai/commit-message.md",
	)
		.then((fileInfo) => fileInfo)
		.catch(() => false);

	try {
		if (!hasGitaiDir?.isDirectory) {
			await Deno.mkdir(path + "/.gitai", { recursive: true });
		}
	} catch (err) {
		console.error(`Error creating folder: ${err}`);
	}

	try {
		hasGitaiDir = await Deno.stat(path + "/.gitai")
			.then((dirInfo) => dirInfo)
			.catch(() => false);

		if (hasGitaiDir?.isDirectory && !hasCommitMessageFile?.isFile) {
			const encoder = new TextEncoder();
			await Deno.writeFile(
				path + "/.gitai/commit-message.md",
				encoder.encode(""),
			);
			await Deno.writeTextFile(path + "/.gitignore", "\n.gitai", {
				append: true,
			});
		}
	} catch (err) {
		console.error(`Error creating file: ${err}`);
	}
}
