import type { Express, Request } from "express";
import {
	getAuthorization,
	type OauthAuthorization,
} from "../utils/oauth_utils";
import { authorizedFetch } from "../utils/request_utils";
import { staticData } from "../static/static_data";
import { processRawTimelineData } from "./data_processors/timeline_data_processor";
import typia from "typia";

const GET_HOME_TIMELINE_ENDPOINT =
	"https://api.twitter.com/graphql/P5hqTTDzolV37XXZuM62oQ/HomeTimeline";

export function registerTimelineEndpoints(server: Express) {
	server.get(
		"/timeline/home",
		async (
			req: Request<
				unknown,
				unknown,
				unknown,
				{
					cursor: string | undefined;
					count: number | undefined;
					initial: string | undefined;
					seen: string | undefined;
				}
			>,
			res,
		) => {
			const auth = getAuthorization(req.headers.authorization);
			if (auth instanceof Error) {
				res.status(401).end(auth.message);
				return;
			}

			const response = await getHomeTimeline(
				auth,
				req.query.cursor ?? "",
				req.query.count ?? 20,
				req.query.seen ?? "",
			);

			if (!response.ok) {
				res.status(500).json(await response.json());
				return;
			}

			const processed = processRawTimelineData(await response.text());
			if (typia.is<typia.IValidation.IError[]>(processed)) {
				res.status(500).json({ errors: processed });
			} else {
				res.status(200).json(processed);
			}
		},
	);
}

async function getHomeTimeline(
	auth: OauthAuthorization,
	cursor: string,
	count: number,
	seen: string,
) {
	const variables: Record<string, unknown> = {
		cursor: cursor,
		count: count,
		seen_tweet_ids: Buffer.from(seen, "base64")
			.toString("utf-8")
			.split(",")
			.filter((id) => id !== ""),
		autoplay_enabled: true,
		includeTweetImpression: true,
	};

	return await authorizedFetch(
		"POST",
		GET_HOME_TIMELINE_ENDPOINT,
		auth,
		undefined,
		JSON.stringify({
			variables: JSON.stringify(variables),
			features: JSON.stringify(staticData.timelineFeatures),
		}),
		undefined,
		"application/json",
	);
}
