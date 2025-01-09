export async function geminiClient(content) {
	const url = "https://generativelanguage.googleapis.com/v1beta";
	const model = "/models/gemini-1.5-flash";
	const type = ":generateContent";
	const apiKey = "?key=" + Deno.env.get("GEMINI_API_KEY");

	const res = await fetch(url + model + type + apiKey, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contents: content,
			generationConfig: {
				"top_p": 0.7,
				"top_k": 10,
				"temperature": 1.8,
			},
		}),
	});

	return res;
}
