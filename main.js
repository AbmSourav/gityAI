// import { promptSelect } from "jsr:@std/cli/unstable-prompt-select";
import "jsr:@std/dotenv/load";

import { command } from "./src/cmd/command.js";

// import { form } from "./src/terminalUI/form.js";
// import { selectForm } from "./src/terminalUI/selectForm.js";

command();

// selectForm("Select one", ["* Happy with it", "* Generate another one", "* My prompt"]);
// const browser = promptSelect("Please select a browser:", ["safari", "chrome", "firefox"], { clear: true });
// console.log(browser);

// const command = new Deno.Command("tput", {
//     args: ["cols"],
//     stdout: "piped",
//     stderr: "piped",
// });

// const { code, stdout } = await command.output();
// console.log(new TextDecoder().decode(stdout));

// const name = prompt("What is your name?");

// if (args?.openai_secret) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode("OPENAI_SECRET_KEY=" + args.openai_secret + "\n");
//     await Deno.writeFile(".env", data);
// }

// console.log("init function", init());

// console.log("Hello Deno", args, code, Deno.env.get('OPENAI_SECRET_KEY'));

// const decoder = new TextDecoder("utf-8");
// const buffer = await Deno.readFile('./diff.txt');
// const data = decoder.decode(buffer);
// console.log(data);

// console.log("\x1b[90m┌" + "─".repeat(80) + "┐\x1B[0m\n");

// console.log(Deno.consoleSize().columns)

// console.log(form("Set Gemini AI API Key"));
