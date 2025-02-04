export async function init(args) {
	if (args?._[0] !== "init" && !args?.i) {
		return;
	}

	const path = Deno.cwd();

	let hasGityAIDir = await Deno.stat(path + "/.gityai")
		.then((dirInfo) => dirInfo)
		.catch(() => false);

	if (hasGityAIDir?.isDirectory) {
		console.log("\x1b[90m\n  Already initialized\x1b[0m\n");
		return;
	}

	const hasCommitMessageFile = await Deno.stat(
		path + "/.gityai/commit-message.md",
	)
		.then((fileInfo) => fileInfo)
		.catch(() => false);

	try {
		if (!hasGityAIDir?.isDirectory) {
			await Deno.mkdir(path + "/.gityai", { recursive: true });
		}
	} catch (err) {
		console.error(`Error creating folder: ${err}`);
	}

	try {
		hasGityAIDir = await Deno.stat(path + "/.gityai")
			.then((dirInfo) => dirInfo)
			.catch(() => false);

		if (hasGityAIDir?.isDirectory && !hasCommitMessageFile?.isFile) {
			const encoder = new TextEncoder();
			await Deno.writeFile(
				path + "/.gityai/commit-message.md",
				encoder.encode(""),
			);
			await Deno.writeTextFile(path + "/.gitignore", "\n.gityai", {
				append: true,
			});
		}
	} catch (err) {
		console.error(`Error creating file: ${err}`);
	}

	console.log("\x1b[90m\n  Initialized 🎉\x1b[0m\n");
	Deno.exit(0);
}
