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
					src={`${import.meta.env.VITE_API_BASE}/media/profile-image/${props.user.profile.image}/${props.quality}`}
				/>
			</Match>
		</Switch>
	);
}
