import type { Express, Request, Response } from "express";
import mime from "mime";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import { logger } from "../utils/logger";

const MEDIA_ENDPOINT = "https://pbs.twimg.com/media";
const PROFILE_BANNER_ENDPOINT = "https://pbs.twimg.com/profile_banners";
const PROFILE_IMAGE_ENDPOINT = "https://pbs.twimg.com/profile_images";

async function pipeImage(url: string, id: string, req: Request, res: Response) {
	const response = await fetch(url);

	if (!response.ok || response.body === null) {
		res.status(response.status).send(await response.text());
	} else {
		res.set({
			"Cache-Control": response.headers.get("Cache-Control"),
			"Content-Type": response.headers.get("Content-Type"),
			"Content-Length": response.headers.get("Content-Length"),
			"Last-Modified": response.headers.get("Last-Modified"),
		});

		if (Object.keys(req.query).includes("download")) {
			const type = response.headers.get("Content-Type") ?? "";
			const extension = mime.extension(type);
			if (extension === undefined) {
				logger.error(
					`couldn't determine a file extension for MIME type "${type}"`,
				);
				return;
			}

			res.attachment(`${id}.${extension}`);
		}

		Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(res);
	}
}

export function registerMediaEndpoints(server: Express) {
	server.get("/media/banner/:user/:id", async (req, res) => {
		await pipeImage(
			`${PROFILE_BANNER_ENDPOINT}/${req.params.user}/${req.params.id}`,
			req.params.id,
			req,
			res,
		);
	});

	server.get(
		"/media/profile-image/:user/:id/:format/:quality",
		async (req, res) => {
			const possibleQualities = ["best", "thumbnail"];
			if (!possibleQualities.includes(req.params.quality)) {
				res
					.status(400)
					.send(
						`quality must be one of the following: ${possibleQualities.join(", ")}`,
					);
				return;
			}

			await pipeImage(
				`${PROFILE_IMAGE_ENDPOINT}/${req.params.user}/${req.params.id}${req.params.quality === "thumbnail" ? "_normal" : ""}.${req.params.format}`,
				req.params.id,
				req,
				res,
			);
		},
	);

	server.get("/media/image/:id/:format/:variant", async (req, res) => {
		const possibleFormats = ["png", "jpg", "webp"];
		if (!possibleFormats.includes(req.params.format)) {
			res
				.status(400)
				.send(
					`format must be one of the following: ${possibleFormats.join(", ")}`,
				);
			return;
		}

		await pipeImage(
			`${MEDIA_ENDPOINT}/${req.params.id}?name=${req.params.variant}&format=${req.params.format}`,
			req.params.id,
			req,
			res,
		);
	});
}
