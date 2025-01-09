export function form(label) {
	const boxWidth = Deno.consoleSize().columns / 2;
	const widthWithLabel = boxWidth + label.length + 2;

	// top border
	console.log(
		"\n\x1B[90m┌ " + label + " " + "─".repeat(boxWidth) + "┐\x1B[0m",
	);

	// both sides border
	console.log("\x1B[90m│" + " ".repeat(widthWithLabel) + "\x1B[90m│\x1B[0m");

	// bottom border
	console.log("\x1B[90m└" + "─".repeat(widthWithLabel) + "┘\x1B[0m");
	console.log(
		"\x1B[90mGitAI uses Gemini AI, you need to set a API key to use it.\x1B[0m",
	);

	// cursor positioning
	console.log("\x1b[4A");
	const input = prompt(" ");

	console.log("\x1B[1B");

	return input;
}
