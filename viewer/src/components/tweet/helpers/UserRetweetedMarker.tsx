import { A } from "@solidjs/router";
import { IoRepeat } from "solid-icons/io";
import Twemojify from "~/components/Twemojify";
import UserHoverable from "./UserHoverable";
import type { Tweet } from "~/api/types/tweet";
import { useI18nContext } from "~/i18n/i18n-solid";

export default function UserRetweetedMarker(props: {
	tweet: Tweet;
}) {
	const { LL } = useI18nContext();

	return (
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
					<span class="font-light">{LL().tweet.retweeted()}</span>
				</Twemojify>
			</A>
		</UserHoverable>
	);
}
