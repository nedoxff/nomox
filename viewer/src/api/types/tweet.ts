import type { User } from "./user";

export type Tweet = {
	id: string;
	createdAt: string;
	muted: boolean;
	retweetOf: Tweet | null;
	user: User;

	stats: {
		views: number | null;
		retweets: number;
		bookmarks: number;
		quotes: number;
		likes: number;
		replies: number;
	};

	content: {
		unformatted: string;
	};

	personal: {
		retweeted: boolean;
		bookmarked: boolean;
		liked: boolean;
	};
};
