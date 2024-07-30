import * as crypto from "node:crypto";
import * as querystring from "node:querystring";
import {
	CONSUMER_AUTH_PASSWORD,
	CONSUMER_AUTH_USERNAME,
} from "../static/static_data";
import type { Request } from "express";

const OAUTH_REALM = "http://api.twitter.com/";

function createHmacHash(key: string, data: string) {
	return crypto.createHmac("sha1", key).update(data, "utf-8").digest("base64");
}

function createNonce() {
	return crypto.randomBytes(32).toString("base64").replace(/[=/+]/g, "");
}

export function createOauthHeader(
	token: string,
	tokenSecret: string,
	url: string,
	method: string,
	query?: Record<string, unknown>,
) {
	const uri = new URL(url);
	const params = new Map<string, string>();
	for (const pair of Object.entries(querystring.parse(uri.search))) {
		params.set(pair[0], pair[1] as string);
	}
	if (query !== undefined) {
		for (const pair of Object.entries(query)) {
			params.set(pair[0], pair[1] as string);
		}
	}

	params.set("oauth_version", "1.0");
	params.set("oauth_signature_method", "HMAC-SHA1");
	params.set("oauth_consumer_key", CONSUMER_AUTH_USERNAME);
	params.set("oauth_token", token);
	params.set("oauth_nonce", createNonce());
	params.set("oauth_timestamp", Math.floor(Date.now() / 1000).toString());

	const signatureParams = Array.from(params.keys())
		.sort()
		.map((key) => `${key}=${encodeURIComponent(params.get(key) ?? "")}`)
		.join("&");

	const signatureData = `${method.toUpperCase()}&${encodeURIComponent(
		uri.origin + uri.pathname,
	)}&${encodeURIComponent(signatureParams)}`;
	const signatureKey = `${CONSUMER_AUTH_PASSWORD}&${tokenSecret}`;
	const signature = encodeURIComponent(
		createHmacHash(signatureKey, signatureData),
	);

	return `OAuth realm="${OAUTH_REALM}", oauth_version="${params.get(
		"oauth_version",
	)}", oauth_token="${token}", oauth_nonce="${params.get(
		"oauth_nonce",
	)}", oauth_timestamp="${params.get(
		"oauth_timestamp",
	)}", oauth_signature="${signature}", oauth_consumer_key="${params.get(
		"oauth_consumer_key",
	)}", oauth_signature_method="${params.get("oauth_signature_method")}"`;
}

export type OauthAuthorization = {
	token: string;
	secret: string;
};

export function getAuthorization(req: Request): OauthAuthorization {
	const header = req.headers.authorization;
	if (header === undefined) {
		throw new Error(
			"the authorization header was null. use the auth middleware in every route that requires it",
		);
	}

	const decoded = Buffer.from(header.replace("Basic ", ""), "base64")
		.toString("utf-8")
		.split(":");
	return { token: decoded[0], secret: decoded[1] };
}
