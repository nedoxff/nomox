import { A } from "@solidjs/router";
import UserHoverable from "./UserHoverable";
import { createSignal, Show, useContext } from "solid-js";
import { TweetContext } from "~/lib/contexts";
import UserAvatar from "./UserAvatar";
import {
	IoBookmark,
	IoBookmarkOutline,
	IoChatbubble,
	IoChatbubbleOutline,
	IoChatbubblesOutline,
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
import {
	bookmarkTweet,
	likeTweet,
	retweetTweet,
	unbookmarkTweet,
	unlikeTweet,
	unretweetTweet,
} from "~/api/tweet";
import { toast } from "solid-sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
				<UserAvatar quality="thumbnail" user={tweet.user} />
			</A>
		</UserHoverable>
	);
}

export function TweetHeaderRow(props: { layout: "row" | "col" }) {
	const { LL } = useI18nContext();
	const tweet = useContext(TweetContext);

	if (tweet === undefined) {
		throw new Error("cannot render TweetHeaderRow without TweetContext");
	}

	return (
		<div class="flex flex-row justify-between w-full">
			<UserHoverable user={tweet.user}>
				<p
					class={`flex flex-${props.layout} items-${
						props.layout === "row" ? "center" : "start"
					}`}
				>
					<A
						replace={true}
						class="hover:underline font-semibold"
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
	const { LL } = useI18nContext();
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

	const [liked, setLiked] = createSignal(tweet.personal.liked);
	const [bookmarked, setBookmarked] = createSignal(tweet.personal.bookmarked);
	const [retweeted, setRetweeted] = createSignal(tweet.personal.retweeted);

	const retweet = () => {
		(retweeted() ? unretweetTweet(tweet.id) : retweetTweet(tweet.id))
			.then(() => setRetweeted(!retweeted()))
			.catch(() => {
				toast.error(
					LL().tweet.actions.engagement.retweetFailed({
						action: retweeted() ? "unretweet" : "retweet",
					}),
				);
			});
	};

	const like = () => {
		(liked() ? unlikeTweet(tweet.id) : likeTweet(tweet.id))
			.then(() => {
				setLiked(!liked());
			})
			.catch(() => {
				toast.error(
					LL().tweet.actions.engagement.likeFailed({
						action: liked() ? "unlike" : "like",
					}),
				);
			});
	};

	const bookmark = () => {
		(bookmarked() ? unbookmarkTweet(tweet.id) : bookmarkTweet(tweet.id))
			.then(() => {
				setBookmarked(!bookmarked());
			})
			.catch(() => {
				toast.error(
					LL().tweet.actions.engagement.bookmarkFailed({
						action: bookmarked() ? "unbookmark" : "bookmark",
					}),
				);
			});
	};

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
				<DropdownMenu>
					<DropdownMenuTrigger>
						<TweetEngagementButton
							class="hover:text-retweet-green data-[done=true]:text-retweet-green"
							selected={retweeted()}
							icon={(s) =>
								s ? <IoRepeat size={18} /> : <IoRepeatOutline size={18} />
							}
						>
							{tweet.stats.retweets + (retweeted() ? 1 : 0)}
						</TweetEngagementButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent as="div">
						<DropdownMenuItem
							closeOnSelect={true}
							class="flex flex-row justify-start gap-3"
							onSelect={retweet}
						>
							<IoRepeatOutline size={18} />
							{retweeted()
								? LL().tweet.actions.engagement.unretweet()
								: LL().tweet.actions.engagement.retweet()}
						</DropdownMenuItem>

						<DropdownMenuItem
							closeOnSelect={true}
							class="flex flex-row justify-start gap-3"
							onSelect={() => {
								//TODO: implement quotes when tweeting is done
								alert("quoting tweets is not possible yet!");
							}}
						>
							<IoChatbubblesOutline size={18} />
							{LL().tweet.actions.engagement.quote()}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<TweetEngagementButton
					class="hover:text-like-red data-[done=true]:text-like-red"
					selected={liked()}
					onClick={like}
					icon={(s) =>
						s ? <IoHeart size={18} /> : <IoHeartOutline size={18} />
					}
				>
					{tweet.stats.likes + (liked() ? 1 : 0)}
				</TweetEngagementButton>
				<TweetEngagementButton
					class="hover:text-brand data-[done=true]:text-brand"
					selected={bookmarked()}
					onClick={bookmark}
					icon={(s) =>
						s ? <IoBookmark size={18} /> : <IoBookmarkOutline size={18} />
					}
				>
					{tweet.stats.bookmarks + (bookmarked() ? 1 : 0)}
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

export function TweetContent(props: { class?: string }) {
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
