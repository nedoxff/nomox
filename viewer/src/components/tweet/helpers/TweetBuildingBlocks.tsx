import { A } from "@solidjs/router";
import UserHoverable from "./UserHoverable";
import { Show, useContext } from "solid-js";
import { TweetContext } from "~/lib/contexts";
import UserAvatar from "./UserAvatar";
import {
	IoBookmark,
	IoBookmarkOutline,
	IoChatbubble,
	IoChatbubbleOutline,
	IoEllipsisHorizontal,
	IoHeart,
	IoHeartOutline,
	IoOpenOutline,
	IoRepeat,
	IoRepeatOutline,
	IoStatsChart,
} from "solid-icons/io";
import Twemojify from "../../Twemojify";
import { PopoverTrigger, PopoverContent, Popover } from "../../ui/popover";
import { useI18nContext } from "~/i18n/i18n-solid";
import { Button } from "../../ui/button";
import TweetEngagementButton from "./TweetEngagementButton";
import FormattableText from "../renderers/FormattableText";
import TweetMedia from "../renderers/TweetMediaRenderer";

export function TweetUserAvatar() {
	const tweet = useContext(TweetContext);

	if (tweet === undefined) {
		throw new Error("cannot render TweetUserAvatar without TweetContext");
	}

	return (
		<UserHoverable user={tweet.user}>
			<A
				replace={true}
				href={`/user/${tweet.user.profile.username}`}
				class="hover:underline"
			>
				<UserAvatar user={tweet.user} />
			</A>
		</UserHoverable>
	);
}

export function TweetHeaderRow(props: {
	layout: "row" | "col";
}) {
	const { LL } = useI18nContext();
	const tweet = useContext(TweetContext);

	if (tweet === undefined) {
		throw new Error("cannot render TweetHeaderRow without TweetContext");
	}

	return (
		<div class="flex flex-row justify-between w-full">
			<UserHoverable user={tweet.user}>
				<p
					class={`flex flex-${props.layout} items-${props.layout === "row" ? "center" : "start"}`}
				>
					<A
						replace={true}
						class="hover:underline"
						href={`/user/${tweet.user.profile.username}`}
					>
						<Twemojify>{tweet.user.profile.displayName}</Twemojify>
					</A>
					<span class="ml-1 text-muted-foreground text-sm">
						@{tweet.user.profile.username}
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
								`https://x.com/${tweet.user.profile.username}/status/${tweet.id}`,
							)
						}
					>
						<IoOpenOutline size={18} />
						{LL().tweet.actions.seeOriginal()}
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export function TweetEngagementButtonsRow() {
	const tweet = useContext(TweetContext);

	if (tweet === undefined) {
		throw new Error(
			"cannot render TweetEngagementButtonsRow without TweetContext",
		);
	}
	if (tweet.type !== "full") {
		throw new Error(
			"a complete Tweet (type == full) is required to render the TweetEngagementButtonsRow",
		);
	}

	return (
		<div class="flex flex-row justify-between w-full">
			<div class="flex flex-row gap-10">
				<TweetEngagementButton
					class="hover:text-brand"
					selected={false}
					icon={(s) =>
						s ? <IoChatbubble size={18} /> : <IoChatbubbleOutline size={18} />
					}
				>
					{tweet.stats.replies}
				</TweetEngagementButton>
				<TweetEngagementButton
					class="hover:text-retweet-green"
					selected={tweet.personal.retweeted}
					icon={(s) =>
						s ? <IoRepeat size={18} /> : <IoRepeatOutline size={18} />
					}
				>
					{tweet.stats.retweets}
				</TweetEngagementButton>
				<TweetEngagementButton
					class="hover:text-like-red"
					selected={tweet.personal.liked}
					icon={(s) =>
						s ? <IoHeart size={18} /> : <IoHeartOutline size={18} />
					}
				>
					{tweet.stats.likes}
				</TweetEngagementButton>
				<TweetEngagementButton
					class="hover:text-brand"
					selected={tweet.personal.bookmarked}
					icon={(s) =>
						s ? <IoBookmark size={18} /> : <IoBookmarkOutline size={18} />
					}
				>
					{tweet.stats.replies}
				</TweetEngagementButton>
			</div>
			<div class="flex flex-row">
				<div class="text-muted-foreground items-center flex flex-row gap-1">
					<IoStatsChart size={18} />
					{tweet.stats.views}
				</div>
			</div>
		</div>
	);
}

export function TweetContent(props: {
	class?: string;
}) {
	const tweet = useContext(TweetContext);

	if (tweet === undefined) {
		throw new Error("cannot render TweetContent without TweetContext");
	}
	if (tweet.type !== "full") {
		throw new Error(
			"a complete Tweet (type == full) is required to render TweetContent",
		);
	}

	return (
		<div class={props.class}>
			<Show when={tweet.content.entities.length !== 0}>
				<FormattableText entities={tweet.content.entities} />
			</Show>
			<TweetMedia media={tweet.content.media} />
		</div>
	);
}
