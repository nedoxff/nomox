import express from "express";
import pino from "pino-http";
import { setStaticData } from "./static/StaticData";
import { login } from "./api/auth";

const logger = pino().logger;
const app = express();
app.use(pino());

app.post("/login", async (req, res) => {
  const response = await login(
    req.query.id as string,
    req.query.password as string
  );

  res.json(response);
});

setStaticData()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .then(() => {
    app.listen(3000);
    logger.info("server listening on port 3000");
  });
