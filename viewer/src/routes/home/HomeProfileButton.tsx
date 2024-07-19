import { createResource, Show } from "solid-js";
import { getSelf } from "~/api/user";
import LoadingIndicator from "~/components/loading_indicator/LoadingIndicator";
import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

export default function HomeProfileButton() {
	const [user] = createResource(getSelf);

	return (
		<Show
			when={!user.loading}
			fallback={
				<div class="flex w-full h-16 justify-center items-center">
					<LoadingIndicator scale={0.5} />
				</div>
			}
		>
			<Popover gutter={10}>
				<PopoverTrigger>
					<Button
						variant="ghost"
						class="gap-5 w-full rounded-full justify-start text-xl h-min py-2 px-10"
					>
						<img
							class="w-9 rounded-full"
							src={user()?.profile.imageUrl ?? ""}
							alt="your profile"
						/>
						<div class="flex flex-col items-start">
							<p class="text-base">{user()?.profile.displayName}</p>
							<p class="text-sm text-muted-foreground">
								@{user()?.profile.username}
							</p>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent class="w-64 py-0 px-0">
					<Button
						variant="ghost"
						class="w-full rounded-none"
						onClick={() => {
							// TODO
							alert("IMPLEMENT LOGOUT DIALOG");
						}}
					>
						Logout
					</Button>
				</PopoverContent>
			</Popover>
		</Show>
	);
}
