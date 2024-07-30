import type { NextFunction, Request, Response } from "express";
import HttpException from "./HttpException";

export async function requireAuth(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const header = request.headers.authorization;

	if (header === undefined) {
		next(new HttpException(401, "no authorization header sent"));
	} else {
		const decoded = Buffer.from(header.replace("Basic ", ""), "base64")
			.toString("utf-8")
			.split(":");

		if (decoded.length !== 2 || decoded[0] === "" || decoded[1] === "") {
			next(
				new HttpException(
					401,
					'expected the authorization header to be a basic token ("oauth_token:oauth_secret" in base64)',
				),
			);
		}

		return next();
	}
}
