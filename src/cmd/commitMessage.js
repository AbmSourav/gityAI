import { projectInitialized } from "../helper/projectInitialized.js";
import { selectPrompt } from "../terminalUI/selectPrompt.js";
import { help } from "./help.js";
import { generateCommitMessage } from "./commitMessage/generateCommitMessage.js";
import { handlePrompt } from "./commitMessage/handlePrompt.js";
import { makeCommit } from "./commitMessage/makeCommit.js";

export async function commitMessage(args) {
	if (args?._[0] !== "cm") {
		return;
	}

	if (!await projectInitialized()) {
		console.log(
			"%c\n  Please initialize GitAI for this project",
			"color: red",
		);
		help(args, true);
		Deno.exit(0);
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

	const context = [{
		parts: [
			{
				text:
					"You are a Software engineer. Write a detail Git commit message based on the changes",
			},
			{ text: diff },
		],
	}];

	let commitMessage = await generateCommitMessage(args, context);

	const selectedOption = selectPrompt("Select one of below", [
		"* Happy with it",
		"* Generate another one",
		"* My prompt",
	]);

	if (selectedOption.trim() === "* Generate another one") {
		commitMessage = await generateCommitMessage(args, context);
	} else if (selectedOption.trim() === "* My prompt") {
		await handlePrompt(args, diff, commitMessage);
		Deno.exit(0);
	}

	await makeCommit(args, commitMessage);

	Deno.exit(0);
}
