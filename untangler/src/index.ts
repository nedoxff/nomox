import express from "express";
import pino from "pino-http";
import { setStaticData } from "./static/static_data";
import { logger } from "./utils/logger";
import { registerAuthEndpoints } from "./api/auth";
import { registerTimelineEndpoints } from "./api/timeline";
import { registerUserEndpoints } from "./api/user";

const app = express();
app.use(pino());
app.disable("x-powered-by");

registerAuthEndpoints(app);
registerTimelineEndpoints(app);
registerUserEndpoints(app);

setStaticData()
	.catch((e) => {
		logger.error(e);
		process.exit(1);
	})
	.then(() => {
		app.listen(3000);
		logger.info("server listening on port 3000");
	});
