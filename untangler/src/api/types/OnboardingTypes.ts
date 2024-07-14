// not all types need to be documented so only the bare minimum is here.

export type FlowResponse = {
  flow_token?: string;
  status: string;
  subtasks: FlowSubtask[];
};

export interface FlowSubtask {
  subtask_id: string;
}

export type LoginSuccessSubtask = FlowSubtask & {
  open_account: {
    user: {
      id: number;
      id_str: string;
      name: string;
      screen_name: string;
    };
    oauth_token: string;
    oauth_token_secret: string;
    known_device_token: string;
  };
};
