export async function projectInitialized() {
	const isInitialized = await Deno.stat(Deno.cwd() + "/.GityAI")
		.then((folderInfo) => folderInfo)
		.catch(() => false);

	return isInitialized;
}
