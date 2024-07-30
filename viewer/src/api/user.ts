import type { User } from "./types/user";
import typia from "typia";
import { advancedFetchWithResult } from "~/lib/utils/request_utils";

const userValidator = typia.json.createValidateParse<User>();

export async function getSelf(): Promise<User> {
	return await advancedFetchWithResult(
		"get self",
		userValidator,
		"user/self",
		"GET",
	);
}

export async function getUserByName(name: string): Promise<User> {
	return await advancedFetchWithResult(
		"get a user by name",
		userValidator,
		`user/name/${name}`,
		"GET",
	);
}

export async function getUserById(id: string): Promise<User> {
	return await advancedFetchWithResult(
		"get a user by id",
		userValidator,
		`user/id/${id}`,
		"GET",
	);
}

const userPreviewCache: Map<string, User> = new Map<string, User>();
export async function getUserPreview(name: string): Promise<User> {
	const cached = userPreviewCache.get(name);
	if (cached !== undefined) {
		return cached;
	}

	const user = await getUserByName(name);
	userPreviewCache.set(name, user);
	return user;
}
