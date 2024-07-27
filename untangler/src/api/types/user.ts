import type { FormattableText } from "./common";

export type User = {
	id: string;
	verified: boolean;
	protected: boolean;
	createdAt: string;
	profile: {
		username: string;
		displayName: string;
		description: FormattableText | null;
		location: string | null;
		bannerUrl: string | null;
		image: {
			thumbnail: string;
			best: string;
		} | null;
		preferences: {
			backgroundColor: string | null;
			linkColor: string | null;
		};
	};
	stats: {
		tweets: number;
		media: number;
		likes: number;
		following: number;
		followers: number;
	};
	personal: {
		following: boolean;
	};
};
