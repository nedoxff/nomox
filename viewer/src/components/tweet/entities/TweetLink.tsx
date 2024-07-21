import type { LinkEntity } from "~/api/types/tweet";

export default function TweetLink(props: { link: LinkEntity }) {
	return (
		<a
			class="text-brand hover:underline"
			target="_blank"
			rel="noreferrer"
			href={props.link.url}
		>
			{props.link.display}
		</a>
	);
}
