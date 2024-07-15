export type User = {
	id: string;
	verified: boolean;
	protected: boolean;
	createdAt: string;
	profile: {
		username: string;
		displayName: string;
		description: string | null;
		location: string | null;
		bannerUrl: string | null;
		imageUrl: string | null;
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
