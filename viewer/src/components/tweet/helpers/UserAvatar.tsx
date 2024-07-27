import { Match, Switch } from "solid-js";
import type { User } from "~/api/types/user";

export default function UserAvatar(props: {
	user: User;
	class?: string;
	quality: "thumbnail" | "best";
}) {
	return (
		<Switch>
			<Match when={props.user.profile.image === null}>oops, no avatar</Match>
			<Match when={props.user.profile.image !== null}>
				<img
					class={`rounded-full ${props.class}`}
					// biome-ignore lint/a11y/noRedundantAlt: <explanation>
					alt={`${props.user.profile.displayName}'s profile picture`}
					src={
						props.quality === "thumbnail"
							? props.user.profile.image?.thumbnail
							: props.user.profile.image?.best
					}
				/>
			</Match>
		</Switch>
	);
}
