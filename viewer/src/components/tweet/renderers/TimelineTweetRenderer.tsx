import FormattableText from "./FormattableText";
import UserAvatar from "../UserAvatar";
import { type JSX, Show } from "solid-js";
import Twemojify from "../../Twemojify";
import TweetMediaRenderer from "./TweetMediaRenderer";
import TweetEngagementButton from "../TweetEngagementButton";
import {
	IoBookmark,
	IoBookmarkOutline,
	IoChatbubble,
	IoChatbubbleOutline,
	IoCopy,
	IoCopyOutline,
	IoEllipsisHorizontal,
	IoHeart,
	IoHeartOutline,
	IoOpen,
	IoOpenOutline,
	IoRepeat,
	IoRepeatOutline,
	IoStatsChart,
} from "solid-icons/io";
import type { Tweet } from "~/api/types/tweet";
import UserHoverable from "../UserHoverable";
import { A } from "@solidjs/router";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { useI18nContext } from "~/i18n/i18n-solid";

export type ContentTweetRendererProps = {
	tweet: Tweet & { type: "full" };
	prepend?: JSX.Element;
};

export default function TimelineTweetRenderer(
	props: ContentTweetRendererProps,
) {
	const { LL } = useI18nContext();

	return (
		<div class="border-border border-b-0 border-[1px] p-4 flex flex-col transition-all hover:bg-accent">
			{props.prepend}
			<div class="grid grid-cols-[min-content_minmax(0,_1fr)] grid-rows-[min-content_minmax(0,_1fr)_min-content] gap-x-2">
				<div class="col-span-1 row-span-3 w-10 h-10">
					<UserHoverable user={props.tweet.user}>
						<A
							replace={true}
							class="hover:underline"
							href={`/user/${props.tweet.user.profile.username}`}
						>
							<UserAvatar user={props.tweet.user} />
						</A>
					</UserHoverable>
				</div>
				<div class="col-span-1 row-span-1 flex flex-row items-center">
					<div class="flex flex-row justify-between w-full">
						<UserHoverable user={props.tweet.user}>
							<p class="flex flex-row items-center">
								<A
									replace={true}
									class="hover:underline"
									href={`/user/${props.tweet.user.profile.username}`}
								>
									<Twemojify>{props.tweet.user.profile.displayName}</Twemojify>
								</A>
								<span class="ml-1 text-muted-foreground text-sm">
									@{props.tweet.user.profile.username}
								</span>
							</p>
						</UserHoverable>
						<Popover>
							<PopoverTrigger>
								<IoEllipsisHorizontal size={18} />
							</PopoverTrigger>
							<PopoverContent
								showCloseButton={false}
								as="div"
								class="flex flex-col p-0 w-fit"
							>
								<Button
									variant="ghost"
									class="w-full rounded-none flex flex-row gap-3"
									onClick={() =>
										window.open(
											`https://x.com/${props.tweet.user.profile.username}/status/${props.tweet.id}`,
										)
									}
								>
									<IoOpenOutline size={18} />
									{LL().tweet.actions.seeOriginal()}
								</Button>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div class="col-span-1 row-span-1 break-words flex flex-col gap-2">
					<Show when={props.tweet.content.entities.length !== 0}>
						<FormattableText entities={props.tweet.content.entities} />
					</Show>
					<TweetMediaRenderer media={props.tweet.content.media} />
				</div>
				<div class="col-span-1 row-span-1 break-words flex flex-row justify-between mt-2">
					<div class="flex flex-row gap-10">
						<TweetEngagementButton
							class="hover:text-brand"
							selected={false}
							icon={(s) =>
								s ? (
									<IoChatbubble size={18} />
								) : (
									<IoChatbubbleOutline size={18} />
								)
							}
						>
							{props.tweet.stats.replies}
						</TweetEngagementButton>
						<TweetEngagementButton
							class="hover:text-retweet-green"
							selected={props.tweet.personal.retweeted}
							icon={(s) =>
								s ? <IoRepeat size={18} /> : <IoRepeatOutline size={18} />
							}
						>
							{props.tweet.stats.retweets}
						</TweetEngagementButton>
						<TweetEngagementButton
							class="hover:text-like-red"
							selected={props.tweet.personal.liked}
							icon={(s) =>
								s ? <IoHeart size={18} /> : <IoHeartOutline size={18} />
							}
						>
							{props.tweet.stats.likes}
						</TweetEngagementButton>
						<TweetEngagementButton
							class="hover:text-brand"
							selected={props.tweet.personal.bookmarked}
							icon={(s) =>
								s ? <IoBookmark size={18} /> : <IoBookmarkOutline size={18} />
							}
						>
							{props.tweet.stats.replies}
						</TweetEngagementButton>
					</div>
					<div class="flex flex-row">
						<div class="text-muted-foreground items-center flex flex-row gap-1">
							<IoStatsChart size={18} />
							{props.tweet.stats.views}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
