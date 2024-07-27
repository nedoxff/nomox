import type { JSX } from "solid-js";

export default function Replace(props: {
	text: string;
	by: RegExp;
	replacement: JSX.Element;
}) {
	return props.text
		.split(props.by)
		.map((item) => (props.by.test(item) ? props.replacement : item));
}
