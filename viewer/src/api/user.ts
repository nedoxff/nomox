import NotAuthorizedError from "~/lib/errors/NotAuthorizedError";
import type { User } from "./types/user";
import typia from "typia";
import InvalidBodyError from "~/lib/errors/InvalidBodyError";

export async function getSelf(): Promise<User> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(`${import.meta.env.VITE_API_BASE}/user/self`, {
		method: "GET",
		headers: {
			Authorization: localStorage.getItem("auth") ?? "",
		},
	});
	if (!response.ok) {
		throw new Error(
			`couldn't fetch self (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}

	const deserialized = typia.json.validateParse<User>(await response.text());
	if (!deserialized.success) {
		throw new InvalidBodyError(deserialized.errors);
	}

	return deserialized.data;
}

export async function getUserById(id: string): Promise<User> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/user/id/${id}`,
		{
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);
	if (!response.ok) {
		throw new Error(
			`couldn't fetch self (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}

	const deserialized = typia.json.validateParse<User>(await response.text());
	if (!deserialized.success) {
		throw new InvalidBodyError(deserialized.errors);
	}

	return deserialized.data;
}

const userPreviewCache: Map<string, User> = new Map<string, User>();
export async function getUserPreview(id: string): Promise<User> {
	const cached = userPreviewCache.get(id);
	if (cached !== undefined) {
		return cached;
	}

	const user = await getUserById(id);
	userPreviewCache.set(id, user);
	return user;
}
