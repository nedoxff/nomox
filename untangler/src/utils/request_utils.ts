import * as querystring from "node:querystring";
import { createOauthHeader, type OauthAuthorization } from "./oauth_utils";

export async function authorizedFetch(
	method: string,
	url: string,
	authorization: OauthAuthorization,
	query?: Record<string, string>,
	body?: BodyInit,
	headers?: HeadersInit,
	contentType?: string,
): Promise<Response> {
	const authorizationHeader = createOauthHeader(
		authorization.token,
		authorization.secret,
		url,
		method,
		query,
	);

	if (headers !== undefined) {
		Object.assign(headers, { Authorization: authorizationHeader });
	} else {
		// biome-ignore lint/style/noParameterAssign: it's not confusing here
		headers = { Authorization: authorizationHeader };
	}
	if (contentType !== undefined) {
		Object.assign(headers, { "Content-Type": contentType });
	}

	const queryString =
		query === undefined ? "" : `?${querystring.stringify(query)}`;

	return await fetch(url + queryString, {
		method: method,
		headers: headers,
		body: body,
	});
}
