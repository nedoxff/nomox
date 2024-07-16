import { staticData } from "../static/static_data";
import type { FlowResponse } from "./internal_types/onboarding_types";
import { logger } from "../utils/logger";
import type { Express } from "express";
import {
	LoginFlowMachine,
	type LoginRequestData,
} from "./flow_machines/login_flow_machine";

const GET_GUEST_TOKEN_ENDPOINT =
	"https://api.twitter.com/1.1/guest/activate.json";
const ONBOARDING_TASK_ENDPOINT =
	"https://api.twitter.com/1.1/onboarding/task.json";
const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

let loginFlowMachines: LoginFlowMachine[] = [];

export function registerAuthEndpoints(server: Express) {
	server.post("/login", async (req, res) => {
		if (
			!Object.keys(req.query).includes("id") ||
			!Object.keys(req.query).includes("password")
		) {
			res.status(400).end(`"id" and "password" query parameters are required`);
			return;
		}

		try {
			const id = req.query.id as string;
			const password = req.query.password as string;
			const idType = EMAIL_REGEX.test(id)
				? "email"
				: id.startsWith("+")
					? "phone"
					: "username";
			const auth: LoginRequestData = { password: password, primary: idType };
			auth[idType] = id;

			const machine = new LoginFlowMachine(
				auth,
				(obs) => res.status(409).json(obs),
				(obs) => res.status(500).json(obs),
				(data) => {
					logger.info(
						`login flow machine with id ${machine.id} successfully finished`,
					);
					res.status(200).json(data);
					loginFlowMachines = loginFlowMachines.filter(
						(m) => m.id !== machine.id,
					);
				},
			);

			loginFlowMachines.push(machine);
			logger.info(`started a new login flow machine (${machine.id})`);
			await machine.run();
		} catch (e) {
			res.status(500).end(e);
		}
	});
}

export async function getGuestToken(): Promise<string | null> {
	const response = await fetch(GET_GUEST_TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: staticData.authorizationToken,
		},
	});

	if (!response.ok) {
		return null;
	}

	const token = (await response.json()).guest_token;
	logger.info(`got a new guest token for login (${token})`);
	return token;
}

export async function callOnboardingTask(
	name: string,
	query: string,
	data: Record<string, unknown>,
	auth: {
		flowToken: string;
		att: string;
		guestToken: string;
		includeFlowToken: boolean;
	},
	callbacks: {
		onAttChanged: (att: string) => void;
		onFlowTokenChanged: (token: string) => void;
	},
): Promise<FlowResponse> {
	logger.debug(`sending a flow task request (${name})`);

	const body = { subtask_versions: staticData.onboardingVersions };
	Object.assign(body, data);
	if (auth.flowToken !== "" && auth.includeFlowToken) {
		Object.assign(body, {
			flow_token: auth.flowToken,
		});
	}

	const headers: HeadersInit = {
		Authorization: staticData.authorizationToken,
		"Content-Type": "application/json",
		"X-Guest-Token": auth.guestToken,
	};
	if (auth.att !== "") {
		headers.att = auth.att;
	}

	const taskResponse = await fetch(`${ONBOARDING_TASK_ENDPOINT}${query}`, {
		headers: headers,
		method: "POST",
		body: JSON.stringify(body),
	});

	if (!taskResponse.ok) {
		throw `${name} flow task request failed (${
			taskResponse.status
		}): ${await taskResponse.text()}`;
	}

	if (taskResponse.headers.has("att")) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		callbacks.onAttChanged(taskResponse.headers.get("att")!);
	}

	const response = (await taskResponse.json()) as FlowResponse;
	if (response.flow_token !== undefined) {
		callbacks.onFlowTokenChanged(response.flow_token);
	}

	return response;
}
