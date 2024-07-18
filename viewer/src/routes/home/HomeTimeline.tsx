import { createResource, Show } from "solid-js";
import { getHomeTimeline } from "~/api/timeline";
import LoadingIndicator from "~/components/LoadingIndicator/LoadingIndicator";

export default function HomeTimeline() {
	const [timeline] = createResource(getHomeTimeline);

	return (
		<Show when={!timeline.loading} fallback={<LoadingIndicator />}>
			TODO: home timeline
		</Show>
	);
}
