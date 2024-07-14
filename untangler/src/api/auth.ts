import pino from "pino";
import {
  GET_GUEST_TOKEN_ENDPOINT,
  ONBOARDING_TASK_ENDPOINT,
} from "../endpoints";
import { staticData } from "../static/StaticData";
import type { LoginResult } from "../models/LoginResult";
import type {
  FlowResponse,
  LoginSuccessSubtask,
} from "./types/OnboardingTypes";

async function getGuestToken(): Promise<string> {
  const response = await fetch(GET_GUEST_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: staticData.authorizationToken,
    },
  });

  if (!response.ok) {
    throw `failed to get guest token (${response.status})`;
  }

  const token = (await response.json()).guest_token;
  pino().info(`got a new guest token for login (${token})`);
  return token;
}

export async function login(
  id: string,
  password: string
): Promise<LoginResult> {
  const logger = pino({ level: "debug" });
  logger.info(`attempting to login (${id}, ${password.replace(/./g, "*")})`);

  const guestToken = await getGuestToken();
  let att = "";
  let flowToken = "";

  const callOnboardingTask = async (
    name: string,
    query: string,
    data: Record<string, unknown>,
    includeFlowToken = true
  ): Promise<FlowResponse> => {
    logger.debug(`sending a ${name} flow task request`);

    const body = { subtask_versions: staticData.onboardingVersions };
    Object.assign(body, data);
    if (flowToken !== "" && includeFlowToken) {
      Object.assign(body, {
        flow_token: flowToken,
      });
    }

    const headers: HeadersInit = {
      Authorization: staticData.authorizationToken,
      "Content-Type": "application/json",
      "X-Guest-Token": guestToken,
    };
    if (att !== "") {
      headers.att = att;
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
      att = taskResponse.headers.get("att")!;
      logger.debug(`changing att header (${att})`);
    }

    const response = (await taskResponse.json()) as FlowResponse;
    if (response.flow_token !== undefined) {
      flowToken = response.flow_token;
      logger.debug(`changing flow_token (${response.flow_token})`);
    }

    return response;
  };

  await callOnboardingTask("welcome", "?flow_name=welcome", {
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

  await callOnboardingTask(
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
    false
  );

  await callOnboardingTask("enter_text", "", {
    subtask_inputs: [
      {
        enter_text: {
          challenge_response: null,
          suggestion_id: null,
          text: id,
          link: "next_link",
        },
        subtask_id: "LoginEnterUserIdentifier",
      },
    ],
  });

  await callOnboardingTask("enter_password", "", {
    subtask_inputs: [
      {
        enter_password: {
          password: password,
          link: "next_link",
        },
        subtask_id: "LoginEnterPassword",
      },
    ],
  });

  const rawAccountInformation = (
    (
      await callOnboardingTask("check_duplicate", "", {
        subtask_inputs: [
          {
            check_logged_in_account: {
              link: "AccountDuplicationCheck_false",
            },
            subtask_id: "AccountDuplicationCheck",
          },
        ],
      })
    ).subtasks.find(
      (item) => item.subtask_id === "LoginSuccessSubtask"
    ) as LoginSuccessSubtask
  ).open_account;

  return {
    oauthToken: rawAccountInformation.oauth_token,
    oauthTokenSecret: rawAccountInformation.oauth_token_secret,
    knownDeviceToken: rawAccountInformation.known_device_token,
    user: {
      id: rawAccountInformation.user.id_str,
      name: rawAccountInformation.user.name,
      screenName: rawAccountInformation.user.screen_name,
    },
  };
}
