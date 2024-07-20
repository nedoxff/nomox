import { A } from "@solidjs/router";

export default function TweetHastag(props: { tag: string }) {
	return (
		<A
			replace={true}
			class="text-brand hover:underline underline-offset-2 "
			target="_self"
			href={`/explore/hashtag/${props.tag}`}
		>
			#{props.tag}
		</A>
	);
}
