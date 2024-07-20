import { createResource, Show } from "solid-js";
import { getUserPreview } from "~/api/user";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";
import TweetUserPreview from "../previews/TweetUserPreview";
import { A } from "@solidjs/router";

export default function TweetUserMention(props: {
	username: string;
	id: string;
}) {
	const [user] = createResource(() => getUserPreview(props.id));

	return (
		<HoverCard gutter={10}>
			<HoverCardTrigger>
				<A
					replace={true}
					class="text-brand hover:underline underline-offset-2 "
					target="_self"
					href={`/user/${props.username}`}
				>
					@{props.username}
				</A>
			</HoverCardTrigger>
			<Show when={!user.loading && user() !== undefined}>
				<HoverCardContent>
					{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
					<TweetUserPreview user={user()!} />
				</HoverCardContent>
			</Show>
		</HoverCard>
	);
}
