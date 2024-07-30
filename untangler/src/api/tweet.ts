import type { Express, Response } from "express";
import {
	getAuthorization,
	type OauthAuthorization,
} from "../utils/oauth_utils";
import { authorizedFetch } from "../utils/request_utils";
import { staticData } from "../static/static_data";
import { requireAuth } from "../middleware/auth";

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
	server.put("/tweet/:id/like", requireAuth, async (req, res) => {
		await genericTweetAction(
			getAuthorization(req),
			LIKE_TWEET_ENDPOINT,
			req.params.id,
			res,
		);
	});

	server.put("/tweet/:id/unlike", requireAuth, async (req, res) => {
		await genericTweetAction(
			getAuthorization(req),
			UNLIKE_TWEET_ENDPOINT,
			req.params.id,
			res,
		);
	});

	server.put("/tweet/:id/bookmark", requireAuth, async (req, res) => {
		await genericTweetAction(
			getAuthorization(req),
			BOOKMARK_TWEET_ENDPOINT,
			req.params.id,
			res,
		);
	});

	server.put("/tweet/:id/unbookmark", requireAuth, async (req, res) => {
		await genericTweetAction(
			getAuthorization(req),
			UNBOOKMARK_TWEET_ENDPOINT,
			req.params.id,
			res,
		);
	});

	server.put("/tweet/:id/retweet", requireAuth, async (req, res) => {
		await retweet(getAuthorization(req), req.params.id, res);
	});

	server.put("/tweet/:id/unretweet", requireAuth, async (req, res) => {
		await unretweet(getAuthorization(req), req.params.id, res);
	});
}

async function retweet(auth: OauthAuthorization, id: string, res: Response) {
	const variables: Record<string, unknown> = {
		includeTweetImpression: true,
		includeHasBirdwatchNotes: false,
		includeEditPerspective: false,
		includeEditControl: false,
		tweet_id: id,
	};
	const features: Record<string, unknown> = staticData.tweetFeatures.personal;

	const response = await authorizedFetch(
		"POST",
		RETWEET_ENDPOINT,
		auth,
		undefined,
		JSON.stringify({
			variables: JSON.stringify(variables),
			features: JSON.stringify(features),
		}),
	);

	if (!response.ok) {
		res.status(500).json(await response.json());
		return;
	}

	res.sendStatus(200);
}

async function unretweet(auth: OauthAuthorization, id: string, res: Response) {
	const variables: Record<string, unknown> = {
		includeTweetImpression: true,
		includeHasBirdwatchNotes: false,
		includeEditPerspective: false,
		includeEditControl: false,
		source_tweet_id: id,
	};

	const response = await authorizedFetch(
		"POST",
		UNRETWEET_ENDPOINT,
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
