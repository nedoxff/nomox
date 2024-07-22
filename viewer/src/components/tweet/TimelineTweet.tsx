import type { Tweet } from "~/api/types/tweet";
import type { JSX } from "solid-js";
import { TweetContext } from "~/lib/contexts";
import {
	TweetContent,
	TweetEngagementButtonsRow,
	TweetHeaderRow,
	TweetUserAvatar,
} from "./helpers/TweetBuildingBlocks";
import UserRetweetedMarker from "./helpers/UserRetweetedMarker";

export default function TimelineTweet(props: {
	tweet: Tweet;
}) {
	if (props.tweet.type === "full") {
		return <TimelineTweetInternal tweet={props.tweet} />;
	}

	if (props.tweet.retweetOf?.type === "full") {
		return (
			<TimelineTweetInternal
				tweet={props.tweet.retweetOf}
				prepend={<UserRetweetedMarker tweet={props.tweet} />}
			/>
		);
	}

	return <div />;
}

type TimelineTweetInternalProps = {
	tweet: Tweet & { type: "full" };
	prepend?: JSX.Element;
};

export function TimelineTweetInternal(props: TimelineTweetInternalProps) {
	return (
		<TweetContext.Provider value={props.tweet}>
			<div class="border-border border-b-0 border-[1px] p-4 flex flex-col transition-all hover:bg-accent">
				{props.prepend}
				<div class="grid grid-cols-[min-content_minmax(0,_1fr)] grid-rows-[min-content_minmax(0,_1fr)_min-content] gap-x-2">
					<div class="col-span-1 row-span-3 w-10 h-10">
						<TweetUserAvatar />
					</div>
					<div class="col-span-1 row-span-1 ">
						<TweetHeaderRow layout="row" />
					</div>
					<div class="col-span-1 row-span-1 break-words ">
						<TweetContent class="flex flex-col gap-2" />
					</div>
					<div class="col-span-1 row-span-1 break-words mt-2">
						<TweetEngagementButtonsRow />
					</div>
				</div>
			</div>
		</TweetContext.Provider>
	);
}
