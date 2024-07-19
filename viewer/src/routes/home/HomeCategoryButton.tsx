import type { JSX, ParentProps } from "solid-js";
import { Button } from "~/components/ui/button";

export type HomeCategoryButtonProps = {
	icon: (selected: boolean, size: number) => JSX.Element;
	selected: boolean;
	onClick?: () => void;
} & ParentProps;

export default function HomeCategoryButton(props: HomeCategoryButtonProps) {
	return (
		<Button
			variant="ghost"
			class="gap-5 rounded-full justify-start text-xl h-fit py-3 px-10"
			onClick={() => props.onClick?.()}
		>
			{props.icon(props.selected, 36)}{" "}
			<span class={props.selected ? "font-semibold" : "font-normal"}>
				{props.children}
			</span>
		</Button>
	);
}
