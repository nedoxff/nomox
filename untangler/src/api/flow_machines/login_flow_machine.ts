import type { LoginResult } from "../types/auth/login_result";
import { randomUUID } from "node:crypto";
import type {
	FlowMachine,
	FlowMachineObstacleCallback,
	FlowMachineSuccessCallback,
} from "./flow_machine";
import type {
	FlowResponse,
	FlowSubtask,
	LoginSuccessSubtask,
} from "../internal_types/onboarding_types";
import { logger } from "../../utils/logger";
import { callOnboardingTask, getGuestToken } from "../auth";

export type LoginRequestData = {
	[i: string]: string | undefined;
	email?: string;
	phone?: string;
	username?: string;
	password: string;
	primary: string;
};

export class LoginFlowMachine
	implements FlowMachine<LoginRequestData, LoginResult>
{
	id: string;
	data: LoginRequestData;
	onObstacle: FlowMachineObstacleCallback;
	onError: FlowMachineObstacleCallback;
	onSuccess: FlowMachineSuccessCallback<LoginResult>;

	constructor(
		data: LoginRequestData,
		obstacle: FlowMachineObstacleCallback,
		error: FlowMachineObstacleCallback,
		success: FlowMachineSuccessCallback<LoginResult>,
	) {
		this.id = randomUUID();
		this.data = data;
		this.onObstacle = obstacle;
		this.onError = error;
		this.onSuccess = success;
	}

	private att = "";
	private guestToken = "";
	private flowToken = "";
	private task?: FlowResponse;

	async prepare(): Promise<boolean> {
		const guestToken = await getGuestToken();
		if (guestToken === null) {
			this.onError({
				id: this.id,
				code: "FailedToGetGuestToken",
				description:
					"failed to get the guest token. the login process cannot be started without it.",
			});
			return true;
		}

		this.guestToken = guestToken;
		return false;
	}

	async run() {
		const abort = await this.prepare();
		if (abort) return;

		await this.performTask("welcome", "?flow_name=welcome", {
			input_flow_data: {
				country_code: null,
				flow_context: {
					start_location: {
						location: "splash_screen",
					},
				},
				requested_variant: null,
				target_user_id: 0,
			},
		});

		this.task = await this.performTask(
			"login",
			"?flow_name=login",
			{
				input_flow_data: {
					country_code: null,
					flow_context: {
						start_location: {
							location: "deeplink",
						},
					},
					requested_variant: null,
					target_user_id: 0,
				},
			},
			false,
		);

		await this.continue();
	}

	async continue() {
		try {
			if (this.task === undefined) {
				return;
			}

			while (
				!this.task.subtasks.find(
					(subtask) => subtask.subtask_id === "LoginSuccessSubtask",
				)
			) {
				for (const subtask of this.task.subtasks) {
					await this.processSubtask(subtask);
				}
			}

			const subtask = this.task.subtasks.find(
				(subtask) => subtask.subtask_id === "LoginSuccessSubtask",
			);
			if (subtask === undefined) {
				return;
			}
			this.processSuccessSubtask(subtask);
		} catch (e) {
			logger.warn(
				`login flow machine (${this.id}) encountered an obstacle. pausing`,
			);
			return;
		}
	}

	processSuccessSubtask(subtask: FlowSubtask) {
		const rawAccountInformation = (subtask as LoginSuccessSubtask).open_account;
		this.onSuccess({
			oauthToken: rawAccountInformation.oauth_token,
			oauthTokenSecret: rawAccountInformation.oauth_token_secret,
			user: {
				id: rawAccountInformation.user.id_str,
				name: rawAccountInformation.user.name,
				screenName: rawAccountInformation.user.screen_name,
			},
		});
	}

	async processSubtask(subtask: FlowSubtask) {
		switch (subtask.subtask_id) {
			case "LoginEnterUserIdentifier": {
				this.task = await this.performTask("enter_text", "", {
					subtask_inputs: [
						{
							enter_text: {
								challenge_response: null,
								suggestion_id: null,
								text: this.data[this.data.primary],
								link: "next_link",
							},
							subtask_id: "LoginEnterUserIdentifier",
						},
					],
				});
				break;
			}
			case "LoginEnterPassword": {
				this.task = await this.performTask("enter_password", "", {
					subtask_inputs: [
						{
							enter_password: {
								password: this.data.password,
								link: "next_link",
							},
							subtask_id: "LoginEnterPassword",
						},
					],
				});
				break;
			}
			case "AccountDuplicationCheck": {
				this.task = await this.performTask("check_duplicate", undefined, {
					subtask_inputs: [
						{
							check_logged_in_account: {
								link: "AccountDuplicationCheck_false",
							},
							subtask_id: "AccountDuplicationCheck",
						},
					],
				});
				break;
			}
			default: {
				logger.warn(`unknown subtask id found: ${subtask.subtask_id}`);
				break;
			}
		}
	}

	async performTask(
		name: string,
		query?: string,
		data?: Record<string, unknown>,
		includeFlowToken = true,
	): Promise<FlowResponse> {
		return await callOnboardingTask(
			name,
			query ?? "",
			data ?? {},
			{
				att: this.att,
				flowToken: this.flowToken,
				guestToken: this.guestToken,
				includeFlowToken: includeFlowToken,
			},
			{
				onAttChanged: (att) => {
					logger.debug(`changing the att header (${att})`);
					this.att = att;
				},
				onFlowTokenChanged: (token) => {
					logger.debug(`changing the flow token (${token})`);
					this.flowToken = token;
				},
			},
		);
	}
}
