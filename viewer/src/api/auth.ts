import typia from "typia";
import type { LoginResult } from "./types/auth/login_result";

export async function login(
	id: string,
	password: string,
): Promise<LoginResult | null> {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/login?id=${encodeURIComponent(
			id,
		)}&password=${encodeURIComponent(password)}`,
		{
			method: "POST",
		},
	);

	if (!response.ok) {
		return null;
	}

	return typia.json.assertParse<LoginResult>(await response.text());
}
