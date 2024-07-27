import NotAuthorizedError from "~/lib/errors/NotAuthorizedError";

export async function likeTweet(id: string): Promise<void> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/tweet/${id}/like`,
		{
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`couldn't like a tweet (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}
}

export async function unlikeTweet(id: string): Promise<void> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/tweet/${id}/unlike`,
		{
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`couldn't unlike a tweet (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}
}

export async function bookmarkTweet(id: string): Promise<void> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/tweet/${id}/bookmark`,
		{
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`couldn't bookmark a tweet (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}
}

export async function unbookmarkTweet(id: string): Promise<void> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/tweet/${id}/unbookmark`,
		{
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`couldn't unbookmark a tweet (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}
}
