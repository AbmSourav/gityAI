export function help() {
	console.log(
		`%c
  GityAI is a CLI tool that uses AI to automate Git commit message, PR description etc for you.
  Usage: GityAI [command] [options]

  Commands:
	setup		Setup GityAI with Gemini API Key
	init, -i	Initialize GityAI for project
	cm -s		Generate commit message and save in markdown file
	cm		Generate commit message
	help, -h	Display this help message
	version, -v	Display the version of GityAI\n`,
		"color: gray",
	);

	Deno.exit(0);
}
