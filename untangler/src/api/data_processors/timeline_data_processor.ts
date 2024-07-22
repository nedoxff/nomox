import type { RawTweet } from "../internal_types/common_types";
import typia from "typia";
import type { TimelineResponse } from "../types/timeline/timeline_response";
import { convertRawTweet } from "./common_processors";

export function processRawTimelineData(
	data: string,
): TimelineResponse | typia.IValidation.IError[] {
	const response = typia.json.validateParse<RawTimelineResponse>(data);
	if (!response.success) {
		return response.errors;
	}

	const rawEntries = response.data.data.timeline_response.timeline.instructions
		.filter((ins) => ins.__typename === "TimelineAddEntries")
		.flatMap((ins) => (ins as AddTimelineEntriesInstruction).entries)
		.map((en) => en.content);
	const result: TimelineResponse = { tweets: [], cursors: {} };

	for (const entry of rawEntries) {
		if (typia.is<TimelineCursor>(entry)) {
			const cursor = entry as TimelineCursor;
			result.cursors[cursor.cursorType.toLocaleLowerCase()] = cursor.value;
		} else if (typia.is<TimelineTweet>(entry)) {
			const rawTweet = (entry as TimelineTweet).content.tweetResult.result;
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			result.tweets.push(convertRawTweet(rawTweet)!);
		}
	}

	return result;
}

type RawTimelineResponse = {
	data: {
		timeline_response: {
			timeline: {
				instructions: TimelineInstruction[];
				responseObjects: {
					feedbackActions: FeedbackAction[];
				};
				metadata: {
					scribeConfig: {
						page: string;
					};
				};
			};
		};
	};
};

type FeedbackAction = {
	key: string;
	value: {
		feedbackType: string;
		prompt?: string;
		confirmation?: string;
		hasUndoAction: boolean;
		feedbackUrl?: string;
	};
	childKeys?: string[];
	icon?: string;
	clientEventInfo?: {
		element: string;
		action: string;
	};
};

type TimelineInstruction = {
	__typename: string;
};

type AddTimelineEntriesInstruction = TimelineInstruction & {
	__typename: "TimelineAddEntries";
	entries: TimelineEntry[];
};

type TimelineEntry = {
	entryId: string;
	sortIndex: string;
	content: TimelineTweet | TimelineCursor;
};

type TimelineTweet = {
	__typename: "TimelineTimelineItem";
	content: {
		__typename: "TimelineTweet";
		tweetResult: {
			result: RawTweet;
		};
		tweetDisplayType: string;
	};
	clientEventInfo: {
		component: string;
		element: string;
	};
	feedbackInfo: {
		feedbackKeys: string[];
	};
};

type TimelineCursor = {
	__typename: "TimelineTimelineCursor";
	value: string;
	cursorType: string;
};
