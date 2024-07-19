import type { Tweet } from "~/api/types/tweet";
import TweetTextRenderer from "./TweetTextRenderer";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";
import TweetUserPreview from "./previews/TweetUserPreview";
import UserAvatar from "./UserAvatar";
import type { ParentProps } from "solid-js";
import type { User } from "~/api/types/user";
import Twemojify from "../Twemojify";
import TweetMediaRenderer from "./TweetMediaRenderer";

export type TweetProps = {
	tweet: Tweet;
};

export default function TweetRenderer(props: TweetProps) {
	return (
		<div class="border-border border-b-0 border-[1px] p-4 flex flex-col transition-all hover:bg-accent">
			<div class="grid grid-cols-[min-content_minmax(0,_1fr)] grid-rows-[min-content_minmax(0,_1fr)_min-content] gap-x-2">
				<div class="col-span-1 row-span-3 w-10 h-10">
					<UserHoverable user={props.tweet.user}>
						<a
							class="hover:underline"
							href={`/user/${props.tweet.user.profile.username}`}
						>
							<UserAvatar user={props.tweet.user} />
						</a>
					</UserHoverable>
				</div>
				<div class="col-span-1 row-span-1 flex flex-row items-center">
					<UserHoverable user={props.tweet.user}>
						<p class="flex flex-row items-center">
							<a
								class="hover:underline"
								href={`/user/${props.tweet.user.profile.username}`}
							>
								<Twemojify>{props.tweet.user.profile.displayName}</Twemojify>
							</a>
							<span class="ml-1 text-muted-foreground text-sm">
								@{props.tweet.user.profile.username}
							</span>
						</p>
					</UserHoverable>
				</div>
				<div class="col-span-1 row-span-1 break-words flex flex-col gap-2">
					<TweetTextRenderer entities={props.tweet.content.entities} />
					<TweetMediaRenderer media={props.tweet.content.media} />
				</div>
				<div class="col-span-1 row-span-1 break-words">{/* buttons */}</div>
			</div>
		</div>
	);
}

function UserHoverable(props: { user: User } & ParentProps) {
	return (
		<HoverCard gutter={10}>
			<HoverCardTrigger>{props.children}</HoverCardTrigger>
			<HoverCardContent>
				<TweetUserPreview user={props.user} />
			</HoverCardContent>
		</HoverCard>
	);
}
