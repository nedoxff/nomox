import express from "express";
import pino from "pino-http";
import cors from "cors";
import { setStaticData } from "./static/static_data";
import { logger } from "./utils/logger";
import { registerAuthEndpoints } from "./api/auth";
import { registerTimelineEndpoints } from "./api/timeline";
import { registerUserEndpoints } from "./api/user";
import { registerTweetEndpoints } from "./api/tweet";

const app = express();
app.use(pino());
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

registerAuthEndpoints(app);
registerTimelineEndpoints(app);
registerUserEndpoints(app);
registerTweetEndpoints(app);

setStaticData()
	.catch((e) => {
		logger.error(e);
		process.exit(1);
	})
	.then(() => {
		app.listen(3000);
		logger.info("server listening on port 3000");
	});
