export function version(args) {
	if (args?._[0] !== "version" && !args?.v) {
		return;
	}

	const appVersion = Deno.env.get("GITYAI_VERSION");

	console.log(
		`
  %cGityAI version: ${appVersion}
  GityAI is a CLI tool that uses AI to write commit message, PR description etc for you.
  `,
		"color: green",
	);

	console.log(
		`
  %cDeveloped with 🧡 by Keramot <keramotul.islam@gmail.com>
  `,
		"color: gray",
	);

	Deno.exit(0);
}
