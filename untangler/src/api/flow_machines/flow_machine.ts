export type FlowMachineObstacleCallback = (
	obstacle: FlowMachineObstacle,
) => void;
export type FlowMachineSuccessCallback<TResult> = (info: TResult) => void;

export type FlowMachineObstacle = {
	code: string;
	description: string;
	id: string;
	data?: Record<string, unknown>;
};

export interface FlowMachine<TData, TResult> {
	id: string;
	data: TData;

	onObstacle: FlowMachineObstacleCallback;
	onError: FlowMachineObstacleCallback;
	onSuccess: FlowMachineSuccessCallback<TResult>;

	run(): void;
}
