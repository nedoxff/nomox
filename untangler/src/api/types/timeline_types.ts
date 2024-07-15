import type { Tweet } from "./tweet";

export type TimelineResponse = {
	tweets: Tweet[];
	cursors: Record<string, string>;
};
