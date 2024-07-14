import pino from "pino";
import { promises as fs, stat } from "node:fs";
import { OAUTH_TOKEN_ENDPOINT } from "../endpoints";

const AUTH_USERNAME: string = "3nVuSoBZnx6U4vzUxf5w";
const AUTH_PASSWORD: string = "Bcs59EFbbsdF6Sl9Ng71smgStWEGwXXKSjYvPVt7qys";

// TODO: remove later
const BEARER_TOKEN: string =
  "Bearer AAAAAAAAAAAAAAAAAAAAAFXzAwAAAAAAMHCxpeSDG1gLNLghVe8d74hl6k4%3DRUMF4xAQLsbeBhTSRrCiQpJtxoGWeyHrDb5te2jpGskWDFW82F";

export async function setStaticData() {
  await readFiles();

  const logger = pino();

  // TODO: remove later
  if (BEARER_TOKEN) {
    logger.info(`using bearer token: ${BEARER_TOKEN}`);
    staticData.authorizationToken = BEARER_TOKEN;
    return;
  }

  const authorization = `Basic ${Buffer.from(
    `${AUTH_USERNAME}:${AUTH_PASSWORD}`
  ).toString("base64")}`;

  logger.info("attempting to get the bearer authorization token");
  logger.info(`authorization header: ${authorization}`);

  const response = await fetch(OAUTH_TOKEN_ENDPOINT, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorization,
    },
  });

  if (!response.ok) {
    throw `failed to receive bearer token (${response.status})`;
  }

  const body = await response.json();
  if (body.token_type !== "bearer") {
    throw `expected token_type to be 'bearer', received '${body.token_type}'`;
  }

  const token = body.access_token;
  logger.info(`successfully received the bearer token: ${token}`);
  staticData.authorizationToken = `Bearer ${token}`;
}

async function readFiles() {
  staticData.onboardingVersions = JSON.parse(
    (await fs.readFile("src/static/onboarding_versions.json")).toString()
  );
}

export type StaticData = {
  authorizationToken: string;
  onboardingVersions: Record<string, number>;
};

export const staticData: StaticData = {
  authorizationToken: "",
  onboardingVersions: {},
};
