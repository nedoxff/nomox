import type { JSX, ParentProps } from "solid-js";

export type TweetEngagementButtonProps = {
	class?: string;
	selected: boolean;
	icon: (selected: boolean) => JSX.Element;
	onClick?: () => void;
};
export default function TweetEngagementButton(
	props: TweetEngagementButtonProps & ParentProps,
) {
	return (
		<button
			type="button"
			class={`transition-all text-muted-foreground items-center flex flex-row gap-1 ${props.class}`}
			onClick={props.onClick}
		>
			{props.icon(props.selected)} {props.children}
		</button>
	);
}
