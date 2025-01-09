export async function projectInitialized() {
	const isInitialized = await Deno.stat(Deno.cwd() + "/.gitai")
		.then((folderInfo) => folderInfo)
		.catch(() => false);

	return isInitialized;
}
