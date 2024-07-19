import type { User } from "~/api/types/user";

export default function UserAvatar(props: { user: User; class?: string }) {
	return (
		<img
			class={`rounded-full ${props.class}`}
			// biome-ignore lint/a11y/noRedundantAlt: <explanation>
			alt={`${props.user.profile.displayName}'s profile picture`}
			src={props.user.profile.imageUrl ?? ""}
		/>
	);
}
