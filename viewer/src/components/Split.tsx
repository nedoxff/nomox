import type { JSX } from "solid-js";

export default function Split(props: {
	text: string;
	by: RegExp;
	replacement: JSX.Element;
}) {
	return props.text
		.split(props.by)
		.map((item) => (props.by.test(item) ? props.replacement : item));
}
