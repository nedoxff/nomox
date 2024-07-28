import type { Express, Response } from "express";
import {
	getAuthorization,
	type OauthAuthorization,
} from "../utils/oauth_utils";
import { authorizedFetch } from "../utils/request_utils";

const LIKE_TWEET_ENDPOINT =
	"https://api.twitter.com/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet";
const UNLIKE_TWEET_ENDPOINT =
	"https://api.twitter.com/graphql/ZYKSe-w7KEslx3JhSIk5LA/UnfavoriteTweet";
const RETWEET_ENDPOINT =
	"https://api.twitter.com/graphql/24zITFB5aD73PxYtmc6pkA/CreateRetweet";
const UNRETWEET_ENDPOINT =
	"https://api.twitter.com/graphql/r1IaAd_GIEunlPjVWVlD_w/DeleteRetweet";
const BOOKMARK_TWEET_ENDPOINT =
	"https://api.twitter.com/graphql/-V21wukAaCGXHbUZPZ2wGw/BookmarkAdd";
const UNBOOKMARK_TWEET_ENDPOINT =
	"https://api.twitter.com/graphql/G-V_AGDp-QKivnyTUCtTjA/BookmarkDelete";

export function registerTweetEndpoints(server: Express) {
	server.put("/tweet/:id/like", async (req, res) => {
		const auth = getAuthorization(req.headers.authorization);
		if (auth instanceof Error) {
			res.status(401).end(auth.message);
			return;
		}

		await genericTweetAction(auth, LIKE_TWEET_ENDPOINT, req.params.id, res);
	});

	server.put("/tweet/:id/unlike", async (req, res) => {
		const auth = getAuthorization(req.headers.authorization);
		if (auth instanceof Error) {
			res.status(401).end(auth.message);
			return;
		}

		await genericTweetAction(auth, UNLIKE_TWEET_ENDPOINT, req.params.id, res);
	});

	server.put("/tweet/:id/bookmark", async (req, res) => {
		const auth = getAuthorization(req.headers.authorization);
		if (auth instanceof Error) {
			res.status(401).end(auth.message);
			return;
		}

		await genericTweetAction(auth, BOOKMARK_TWEET_ENDPOINT, req.params.id, res);
	});

	server.put("/tweet/:id/unbookmark", async (req, res) => {
		const auth = getAuthorization(req.headers.authorization);
		if (auth instanceof Error) {
			res.status(401).end(auth.message);
			return;
		}

		await genericTweetAction(
			auth,
			UNBOOKMARK_TWEET_ENDPOINT,
			req.params.id,
			res,
		);
	});
}

async function genericTweetAction(
	auth: OauthAuthorization,
	endpoint: string,
	id: string,
	res: Response,
) {
	const variables: Record<string, unknown> = {
		includeTweetImpression: true,
		includeHasBirdwatchNotes: false,
		includeEditPerspective: false,
		includeEditControl: false,
		tweet_id: id,
	};

	const response = await authorizedFetch(
		"POST",
		endpoint,
		auth,
		undefined,
		JSON.stringify({
			variables: JSON.stringify(variables),
		}),
	);

	if (!response.ok) {
		res.status(500).json(await response.json());
		return;
	}

	res.sendStatus(200);
}
