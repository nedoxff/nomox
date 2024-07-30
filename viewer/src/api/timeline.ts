import type { TimelineResponse } from "./types/timeline/timeline_response";
import typia from "typia";
import { advancedFetchWithResult } from "~/lib/utils/request_utils";

const timelineValidator = typia.json.createValidateParse<TimelineResponse>();

export async function getHomeTimeline(): Promise<TimelineResponse> {
	return await advancedFetchWithResult(
		"get the home timeline",
		timelineValidator,
		"timeline/home",
		"GET",
	);
}
