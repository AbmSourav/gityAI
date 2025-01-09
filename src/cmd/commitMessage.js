import { projectInitialized } from "../helper/projectInitialized.js";
import { geminiClient } from "../geminiClient.js";
import { selectPrompt } from "../terminalUI/selectPrompt.js";
import { spinner } from "../terminalUI/spinner.js";
import { help } from "./help.js";

export async function commitMessage(args) {
	if (!args?.cm) {
		return;
	}

	if (!await projectInitialized()) {
		console.log(
			"%c\n  Please initialize GitAI for this project",
			"color: red",
		);
		help(args, true);
		Deno.exit();
	}

	const gitDiff = new Deno.Command("git", {
		args: ["diff"],
		stdout: "piped",
		stderr: "piped",
	});

	const { stdout } = await gitDiff.output();
	const diff = new TextDecoder().decode(stdout);
	// const diff =
	// 	"diff --git a/app/Controllers/AiPromptController.php b/app/Controllers/AiPromptController.php new file mode 100644 index 0000000..18b4d9a --- /dev/null +++ b/app/Controllers/AiPromptController.php @@ -0,0 +1,69 @@ +<?php + +namespace Smashballoon\ClickSocial\App\Controllers; + +use Smashballoon\ClickSocial\App\Core\Lib\AuthHttp; + +if (!defined('ABSPATH')) { + exit; +} + +class AiPromptController extends BaseController +{ + public function aiPrompt($request) + { + $res = AuthHttp::get('ai/prompt'); + + $prompts = $res->getBody(true); + + // TODO: create a Inertia page for showing prompt data + // return $this->render('Prompt', $prompts); + } + + public function store($request) + { + $prompt = sanitize_textarea_field($request->input('prompt')); + + $res = AuthHttp::post('ai/prompt', [ + 'prompt' => $prompt, + ]); + + $prompts = $res->getBody(true)['data'] ?? []; + + // TODO: create a Inertia page for showing prompt data + // return $this->render('Prompt', $prompts); + } + + public function remove($request) + { + $promptUuid = sanitize_text_field($request->input('promptUuid')); + + $res = AuthHttp::post('ai/prompt/remove', [ + 'uuid' => $promptUuid, + ]); + + $prompts = []; + if ($res->getStatusCode() === 200) { + $prompts = $this->aiPrompt($request); + } + + // TODO: create a Inertia page for showing prompt data + // return $this->render('Prompt', $prompts); + } + + public function update($request) + { + $promptUuid = sanitize_text_field($request->input('promptUuid')); + $prompt = sanitize_textarea_field($request->input('prompt')); + + $res = AuthHttp::post('ai/prompt/update', [ + 'uuid' => $promptUuid, + 'prompt' => $prompt, + ]); + + $prompts = $res->getBody(true)['data'] ?? []; + + // TODO: create a Inertia page for showing prompt data + // return $this->render('Prompt', $prompts); + } +} diff --git a/routes/admin/ai-prompt.php b/routes/admin/ai-prompt.php new file mode 100644 index 0000000..f72dc6e --- /dev/null +++ b/routes/admin/ai-prompt.php @@ -0,0 +1,34 @@ +<?php + +if (! defined('ABSPATH')) exit; + +use Smashballoon\ClickSocial\App\Controllers\AiPromptController; +use Smashballoon\ClickSocial\App\Core\AdminRoute; + +AdminRoute::get( + 'Settings', + [AiPromptController::class, 'aiPrompt'], + '/Workspace/Prompt' +) +->middleware(['permission:subMenu']); + +AdminRoute::post( + 'Settings', + [AiPromptController::class, 'store'], + '/Workspace/Prompt/Store' +) +->middleware(['permission:subMenu']); + +AdminRoute::post( + 'Settings', + [AiPromptController::class, 'remove'], + '/Workspace/Prompt/Remove' +) +->middleware(['permission:subMenu']); + +AdminRoute::post( + 'Settings', + [AiPromptController::class, 'update'], + '/Workspace/Prompt/Update' +) +->middleware(['permission:subMenu']); diff --git a/routes/admin/settings.php b/routes/admin/settings.php index 70c51a0..050fb53 100644 --- a/routes/admin/settings.php +++ b/routes/admin/settings.php @@ -162,3 +162,5 @@ AdminRoute::post( '/Workspace/Members/RoleChange' ) ->middleware(['permission:admin']); + +require_once SBCS_DIR_PATH . '/routes/admin/ai-prompt.php';";

	if (!diff) {
		console.error("%c  No changes found to commit\n", "color: red");
		return;
	}

	spinner.start();

	const res = await geminiClient([{
		parts: [
			{
				text:
					"You are a Software engineer. Write a detail Git commit message based on the changes",
			},
			{ text: diff },
		],
	}]);

	spinner.stop();

	if (res.status !== 200) {
		return console.error(await res.error());
	}

	const data = await res.json();

	const commitMessage = data?.candidates[0]?.content?.parts[0]?.text ?? "";

	if (!args?.s) {
		console.log(
			"Commit Message: \n \x1b[94m" + commitMessage + "\x1b[0m\n",
		);
		console.log(
			"\x1b[90m Commit Message generated. Please review above content.\x1b[0m",
		);
	}

	putCommitMessageInFile(args, commitMessage);

	setTimeout(() => {
		afterCommitMessage(args);
	}, 100);
}

function afterCommitMessage(args) {
	const selectedOption = selectPrompt("Select one of below", [
		"* Happy with it",
		"* Generate another one",
		"* My prompt",
	]);

	if (selectedOption.trim() === "* Generate another one") {
		commitMessage(args);
	} else if (selectedOption.trim() === "* My prompt") {
		// console.log("Your prompt");
	}
}

async function putCommitMessageInFile(args, commitMessage) {
	if (!args?.s) {
		return;
	}

	const path = Deno.cwd() + "/.gitai/commit-message.md";

	await Deno.writeTextFile(path, commitMessage)
		.then(() => {
			console.log(
				`\x1b[90m Commit message has been generated and saved in ${path}\n Please review.\x1b[0m`,
			);
		});
}
