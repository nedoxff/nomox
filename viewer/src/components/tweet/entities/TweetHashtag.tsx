import { A } from "@solidjs/router";

export default function TweetHastag(props: { tag: string }) {
	return (
		<A
			replace={true}
			class="text-brand hover:underline underline-offset-2 break-all"
			target="_self"
			href={`/explore/hashtag/${props.tag}`}
		>
			#{props.tag}
		</A>
	);
}
