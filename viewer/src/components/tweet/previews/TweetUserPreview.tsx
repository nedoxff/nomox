import type { User } from "~/api/types/user";
import UserAvatar from "../UserAvatar";
import { Button } from "~/components/ui/button";
import { Show } from "solid-js";
import { IoEllipse } from "solid-icons/io";
import Twemojify from "~/components/Twemojify";
import FormattableText from "../renderers/FormattableText";
import { useI18nContext } from "~/i18n/i18n-solid";

export default function TweetUserPreview(props: { user: User }) {
	const { LL } = useI18nContext();

	return (
		<div class="flex flex-col">
			<div class="flex flex-row justify-between items-center">
				<UserAvatar class="w-16" user={props.user} />
				<Button>{LL().user.follow()}</Button>
			</div>
			<p class="mt-2 font-semibold text-lg">
				<Twemojify>{props.user.profile.displayName}</Twemojify>
			</p>
			<p class="text-sm text-muted-foreground">
				@{props.user.profile.username}
			</p>
			<Show when={props.user.profile.description !== null}>
				<p class="my-2 max-w-72 break-all">
					<FormattableText
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						entities={props.user.profile.description!.entities}
					/>
				</p>
			</Show>
			<div class="flex flex-row gap-2 items-center">
				<p>
					{props.user.stats.following}{" "}
					<span class="text-muted-foreground">{LL().user.following()}</span>
				</p>
				<IoEllipse size={5} />
				<p>
					{props.user.stats.followers}{" "}
					<span class="text-muted-foreground">{LL().user.followers()}</span>
				</p>
			</div>
		</div>
	);
}
