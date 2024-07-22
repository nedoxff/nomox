import type { ParentProps } from "solid-js";
import type { User } from "~/api/types/user";
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from "../../ui/hover-card";
import TweetUserPreview from "../previews/TweetUserPreview";

export default function UserHoverable(props: { user: User } & ParentProps) {
	return (
		<HoverCard gutter={10}>
			<HoverCardTrigger class="w-fit">{props.children}</HoverCardTrigger>
			<HoverCardContent class="w-fit">
				<TweetUserPreview user={props.user} />
			</HoverCardContent>
		</HoverCard>
	);
}
