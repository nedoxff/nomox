import type { Express } from "express";
import {
	getAuthorization,
	type OauthAuthorization,
} from "../utils/oauth_utils";
import { staticData } from "../static/static_data";
import { authorizedFetch } from "../utils/request_utils";
import { convertRawUser } from "./data_processors/common_processors";
import typia from "typia";
import type {
	RawGetSelfUserResponse,
	RawGetUserResponse,
} from "./internal_types/user_types";
import { requireAuth } from "../middleware/auth";

const GET_SELF_USER_ENDPOINT =
	"https://api.twitter.com/graphql/851wLy502Jw3dVkLYkyC2Q/ViewerUserQuery";
const GET_USER_BY_ID_ENDPOINT =
	"https://api.twitter.com/graphql/cIgulFxDKXxDxIkVedqwzQ/UserResultByIdQuery";
const GET_USER_BY_NAME_ENDPOINT =
	"https://api.twitter.com/graphql/y7PWoOVmiT2ClYTrnUx34Q/UserResultByScreenNameQuery";

export function registerUserEndpoints(server: Express) {
	server.get("/user/:criteria/:id?", requireAuth, async (req, res) => {
		const auth = getAuthorization(req);

		switch (req.params.criteria) {
			case "self": {
				await getSelf(auth, (status, json) => res.status(status).json(json));
				break;
			}
			case "id": {
				if (req.params.id === undefined) {
					res
						.status(400)
						.end(
							'the "id" parameter must be specified in order to search by this criteria.',
						);
					return;
				}
				await getById(auth, req.params.id, (status, json) =>
					res.status(status).json(json),
				);
				break;
			}
			case "name": {
				if (req.params.id === undefined) {
					res
						.status(400)
						.end(
							'the "id" parameter must be specified in order to search by this criteria.',
						);
					return;
				}
				await getByName(auth, req.params.id, (status, json) =>
					res.status(status).json(json),
				);
				break;
			}
			default: {
				res
					.status(400)
					.end(
						'invalid user search criteria. must be one of the following: "self", "id", "name"',
					);
				break;
			}
		}
	});
}

async function getSelf(
	auth: OauthAuthorization,
	respond: (status: number, json?: Record<string, unknown>) => void,
) {
	const variables: Record<string, unknown> = {
		include_profile_info: true,
		includeTweetImpression: true,
		includeHasBirdwatchNotes: false,
		includeEditPerspective: false,
		includeEditControl: false,
	};

	const response = await authorizedFetch(
		"GET",
		GET_SELF_USER_ENDPOINT,
		auth,
		{
			variables: JSON.stringify(variables),
			features: JSON.stringify(staticData.userFeatures),
		},
		undefined,
		undefined,
	);

	if (!response.ok) {
		respond(500, await response.json());
		return;
	}

	const rawResponse = typia.json.validateParse<RawGetSelfUserResponse>(
		await response.text(),
	);
	if (!rawResponse.success) {
		respond(500, { errors: rawResponse.errors });
	} else {
		const processed = convertRawUser(
			rawResponse.data.data.viewer.userResult.result,
		);
		respond(200, processed);
	}
}

async function getById(
	auth: OauthAuthorization,
	id: string,
	respond: (status: number, json?: Record<string, unknown>) => void,
) {
	const variables: Record<string, unknown> = {
		include_smart_block: true,
		includeTweetImpression: true,
		include_profile_info: true,
		includeTranslatableProfile: true,
		includeHasBirdwatchNotes: false,
		include_tipjar: false,
		includeEditPerspective: false,
		include_reply_device_follow: false,
		includeEditControl: false,
		include_verified_phone_status: false,
		rest_id: id,
	};

	const response = await authorizedFetch("GET", GET_USER_BY_ID_ENDPOINT, auth, {
		variables: JSON.stringify(variables),
		features: JSON.stringify(staticData.userFeatures),
	});

	await processRawUserResponse(response, respond);
}

async function getByName(
	auth: OauthAuthorization,
	name: string,
	respond: (status: number, json?: Record<string, unknown>) => void,
) {
	const variables: Record<string, unknown> = {
		include_smart_block: true,
		includeTweetImpression: true,
		include_profile_info: true,
		includeTranslatableProfile: true,
		includeHasBirdwatchNotes: false,
		include_tipjar: false,
		includeEditPerspective: false,
		include_reply_device_follow: false,
		includeEditControl: false,
		include_verified_phone_status: false,
		screen_name: name,
		withSafetyModeUserFields: true,
	};

	const response = await authorizedFetch(
		"GET",
		GET_USER_BY_NAME_ENDPOINT,
		auth,
		{
			variables: JSON.stringify(variables),
			features: JSON.stringify(staticData.userFeatures),
		},
	);

	await processRawUserResponse(response, respond);
}

async function processRawUserResponse(
	response: Response,
	respond: (status: number, json?: Record<string, unknown>) => void,
) {
	if (!response.ok) {
		respond(500, await response.json());
		return;
	}

	const rawResponse = typia.json.validateParse<RawGetUserResponse>(
		await response.text(),
	);
	if (!rawResponse.success) {
		respond(500, { errors: rawResponse.errors });
	} else {
		if (
			rawResponse.data.data.user_result === undefined ||
			rawResponse.data.data.user_result.result === undefined
		) {
			respond(404, undefined);
			return;
		}

		const processed = convertRawUser(rawResponse.data.data.user_result.result);
		respond(200, processed);
	}
}
