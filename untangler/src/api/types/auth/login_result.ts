export type LoginResult = {
	user: {
		id: string;
		name: string;
		screenName: string;
	};
	oauthToken: string;
	oauthTokenSecret: string;
};
