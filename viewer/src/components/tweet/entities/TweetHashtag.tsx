export default function TweetHastag(props: { tag: string }) {
	return (
		<a
			class="text-brand hover:underline underline-offset-2 "
			target="_self"
			href={`/explore/hashtag/${props.tag}`}
		>
			#{props.tag}
		</a>
	);
}
