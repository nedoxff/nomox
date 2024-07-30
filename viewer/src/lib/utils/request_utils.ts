import type typia from "typia";
import NotAuthorizedError from "../errors/NotAuthorizedError";
import InvalidBodyError from "../errors/InvalidBodyError";
import queryString, { type StringifiableRecord } from "query-string";

export async function advancedFetchWithResult<T>(
	action: string,
	checker: (input: string) => typia.IValidation<typia.Primitive<T>>,
	endpoint: string,
	method: string,
	query?: StringifiableRecord,
): Promise<T> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		queryString.stringifyUrl({
			url: `${import.meta.env.VITE_API_BASE}/${endpoint}`,
			query: query,
		}),
		{
			method: method,
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`couldn't ${action} (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}

	const deserialized = checker(await response.text());
	if (!deserialized.success) {
		throw new InvalidBodyError(deserialized.errors);
	}

	return <T>deserialized.data;
}

export async function advancedFetch(
	action: string,
	endpoint: string,
	method: string,
	query?: StringifiableRecord,
): Promise<void> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		queryString.stringifyUrl({
			url: `${import.meta.env.VITE_API_BASE}/${endpoint}`,
			query: query,
		}),
		{
			method: method,
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`couldn't ${action} (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}
}
