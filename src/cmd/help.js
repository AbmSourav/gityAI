export function help(args, force = false) {
	if (
		!force &&
		(Object.keys(args).length > 3 || args.help === false)
	) {
		return;
	}

	console.log(
		`%c
  GitAI is a CLI tool that uses AI to automate Git commit message, PR description etc for you.
  Usage: gitAI [command] [options]

  Commands:
	--setup		Setup GitAI with Gemini API Key
	--init, -i	Initialize GitAI for project
	--cm		Generate commit message
	--cm -s		Generate commit message and save in markdown file
	-h, --help	Display this help message
	-v, --version	Display the version of GitAI`,
		"color: gray",
	);

	Deno.exit();
}
