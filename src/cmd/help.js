export function help() {
	console.log(
		`%c
  GityAI is a agentic AI tool that can automate Git workflows.
  Usage: gityai [command] [options]

  Commands:
	setup		Setup GityAI with Gemini API Key
	setup -i	Setup GityAI with Gemini API Key and Initialize GityAI for project
	init, -i	Initialize GityAI for project
	cm -s		Generate commit message and save in markdown file
	cm		Generate commit message
	help, -h	Display this help message
	version, -v	Display the version of GityAI\n`,
		"color: gray",
	);

	Deno.exit(0);
}
