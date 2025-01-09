export function version(args) {
	if (!args?.version) {
		return;
	}

	const appVersion = Deno.env.get("GITAI_VERSION");

	console.log(
		`
  %cGitAI version: ${appVersion}
  GitAI is a CLI tool that uses AI to write commit message, PR description etc for you.
  `,
		"color: green",
	);

	console.log(
		`
  %cDeveloped with 🧡 by Keramot<keramotul.islam@gmail.com>
  `,
		"color: gray",
	);

	Deno.exit();
}
