import NotAuthorizedError from "~/lib/errors/NotAuthorizedError";
import type { TimelineResponse } from "./types/timeline/timeline_response";
import typia from "typia";
import InvalidBodyError from "~/lib/errors/InvalidBodyError";

export async function getHomeTimeline(): Promise<TimelineResponse> {
	if (localStorage.getItem("auth") === null) {
		throw new NotAuthorizedError();
	}

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE}/timeline/home`,
		{
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("auth") ?? "",
			},
		},
	);
	if (!response.ok) {
		throw new Error(
			`couldn't fetch the home timeline (status code ${
				response.status
			}): ${await response.text()}`,
		);
	}

	// TODO: https://github.com/samchon/typia/issues/1166
	/*
	const deserialized = typia.json.validateParse<TimelineResponse>(
		await response.text(),
	);
	if (!deserialized.success) {
		throw new InvalidBodyError(deserialized.errors);
	}

	return deserialized.data;*/

	return JSON.parse(await response.text()) as TimelineResponse;
}
