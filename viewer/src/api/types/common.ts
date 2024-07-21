import type { TweetEntity } from "./tweet";

export type FormattableText = {
	unformatted: string;
	entities: TweetEntity[];
};
