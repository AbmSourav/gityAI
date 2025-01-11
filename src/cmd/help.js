export function help(args, force = false) {
	if (
		!force &&
		(args?._[0] !== "help" && args.h === false)
	) {
		return;
	}

	console.log(
		`%c
  GitAI is a CLI tool that uses AI to automate Git commit message, PR description etc for you.
  Usage: gitAI [command] [options]

  Commands:
	setup		Setup GitAI with Gemini API Key
	init, -i	Initialize GitAI for project
	cm			Generate commit message
	cm -s		Generate commit message and save in markdown file
	help, -h	Display this help message
	version, -v	Display the version of GitAI\n`,
		"color: gray",
	);

	Deno.exit(0);
}
