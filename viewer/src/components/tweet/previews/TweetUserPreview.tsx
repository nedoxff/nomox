import type { User } from "~/api/types/user";
import UserAvatar from "../UserAvatar";
import { Button } from "~/components/ui/button";
import { Show } from "solid-js";
import { IoEllipse } from "solid-icons/io";
import Split from "~/components/Split";
import Twemojify from "~/components/Twemojify";

export default function TweetUserPreview(props: { user: User }) {
	return (
		<div class="flex flex-col">
			<div class="flex flex-row justify-between items-center">
				<UserAvatar class="w-16" user={props.user} />
				<Button>Follow</Button>
			</div>
			<p class="mt-2 font-semibold text-lg">
				<Twemojify>{props.user.profile.displayName}</Twemojify>
			</p>
			<p class="text-sm text-muted-foreground">
				@{props.user.profile.username}
			</p>
			<Show when={props.user.profile.description !== null}>
				<p class="my-2">
					<Twemojify>
						<Split
							text={props.user.profile.description ?? ""}
							by={/(\n)/gi}
							replacement={<br />}
						/>
					</Twemojify>
				</p>
			</Show>
			<div class="flex flex-row gap-2 items-center">
				<p>
					{props.user.stats.following}{" "}
					<span class="text-muted-foreground">following</span>
				</p>
				<IoEllipse size={5} />
				<p>
					{props.user.stats.followers}{" "}
					<span class="text-muted-foreground">followers</span>
				</p>
			</div>
		</div>
	);
}
