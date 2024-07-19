import { createResource, For, Show } from "solid-js";
import { getHomeTimeline } from "~/api/timeline";
import LoadingIndicator from "~/components/loading_indicator/LoadingIndicator";
import TweetRenderer from "~/components/tweet/TweetRenderer";

export default function HomeTimeline() {
	const [timeline] = createResource(getHomeTimeline);

	return (
		<Show
			when={!timeline.loading}
			fallback={
				<div class="w-full h-full flex justify-center items-center">
					<LoadingIndicator scale={1} />
				</div>
			}
		>
			<For each={timeline()?.tweets}>
				{(item) => <TweetRenderer tweet={item} />}
			</For>
		</Show>
	);
}
