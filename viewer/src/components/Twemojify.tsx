import { parse } from "@twemoji/parser";
import { children, type ParentProps } from "solid-js";

export default function Twemojify(props: ParentProps) {
	const content = children(() => props.children).toArray();

	const convert = (str: string) => {
		const parsed = parse(str);

		if (parsed.length === 0) {
			return str;
		}

		const result = [];
		let current = 0;
		for (const emoji of parsed) {
			if (emoji.url === "") {
				continue;
			}

			const before = str.substring(current, emoji.indices[0]);
			if (before !== "") {
				result.push(before);
			}
			result.push(
				<img class="inline-block align-middle emoji" src={emoji.url} alt="" />,
			);
			current = emoji.indices[1];
		}
		result.push(str.substring(current));

		return <span class="inline">{result}</span>;
	};

	return content.map((el) => {
		if (el instanceof Node) {
			const text = (el as HTMLElement).innerText;
			if (text === "") {
				return el;
			}
			return convert(text);
		}

		if (typeof el === "string") {
			return convert(el);
		}
	});
}
