import type { Tweet } from "~/api/types/tweet";
import ContentTweetRenderer from "./ContentTweetRenderer";
import { IoRepeat, IoShare } from "solid-icons/io";
import UserHoverable from "./UserHoverable";
import { A } from "@solidjs/router";
import Twemojify from "../Twemojify";

export default function TweetRenderer(props: {
	tweet: Tweet;
}) {
	if (props.tweet.type === "full") {
		return <ContentTweetRenderer tweet={props.tweet} />;
	}

	if (props.tweet.retweetOf?.type === "full") {
		return (
			<ContentTweetRenderer
				tweet={props.tweet.retweetOf}
				prepend={
					<UserHoverable user={props.tweet.user}>
						<A
							replace={true}
							href={`/user/${props.tweet.user.profile.username}`}
							class="pb-2 items-center flex flex-row gap-1 text-muted-foreground hover:underline text-sm"
						>
							<IoRepeat />
							<Twemojify>
								<span class="font-normal">
									{props.tweet.user.profile.displayName} (@
									{props.tweet.user.profile.username})
								</span>{" "}
								<span class="font-light">retweeted</span>
							</Twemojify>
						</A>
					</UserHoverable>
				}
			/>
		);
	}

	return <div />;
}
