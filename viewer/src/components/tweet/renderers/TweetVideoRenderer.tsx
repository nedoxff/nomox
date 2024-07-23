import type { TweetVideo } from "~/api/types/tweet";
import Hls from "hls.js";
import { createSignal, Match, onMount, Show, Switch } from "solid-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import {
	Slider,
	SliderFill,
	SliderThumb,
	SliderTrack,
} from "~/components/ui/slider";
import { Button } from "~/components/ui/button";
import { IoContract, IoExpand, IoPause, IoPlay } from "solid-icons/io";

const padSeconds = (ms: number) =>
	new Date(ms).toLocaleTimeString([], {
		minute: "numeric",
		second: "2-digit",
	});

export default function TweetVideoRenderer(props: { video: TweetVideo }) {
	const [ready, setReady] = createSignal(false);
	let ref!: HTMLVideoElement;
	let root!: HTMLDivElement;

	onMount(() => {
		const hasStreamingSupport =
			Hls.isSupported() || ref.canPlayType("application/vnd.apple.mpegurl");
		const hasStreamingVariant = props.video.variants.some(
			(v) => v.bitrate === null,
		);

		if (hasStreamingVariant && hasStreamingSupport) {
			// biome-ignore lint/style/noNonNullAssertion: it's already checked
			const url = props.video.variants.find((v) => v.bitrate === null)!.url;

			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(url);
				hls.attachMedia(ref);
			} else if (ref.canPlayType("application/vnd.apple.mpegurl")) {
				ref.src = url;
			}
		} else {
			// TODO: handle bitrate preferences
			const bestVariant = props.video.variants
				.filter((v) => v.bitrate !== null)
				.sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))[0];

			ref.src = bestVariant.url;
		}

		setReady(true);
	});

	return (
		<AspectRatio ratio={props.video.size.aspectRatio} ref={root} class="group">
			{/* biome-ignore lint/a11y/useMediaCaption: nomox is not the video provider */}
			<video
				loop
				ref={ref}
				class="size-full cursor-pointer rounded-xl"
				controls={false}
			/>
			<Show when={ready()}>
				<TweetVideoOverlay video={props.video} root={root} el={ref} />
			</Show>
		</AspectRatio>
	);
}

function TweetVideoOverlay(props: {
	root: HTMLDivElement;
	el: HTMLVideoElement;
	video: TweetVideo;
}) {
	const [fullscreen, setFullscreen] = createSignal(false);
	const [playing, setPlaying] = createSignal(false);
	const [value, setValue] = createSignal(0);
	const [dragging, setDragging] = createSignal(false);

	onMount(() => {
		props.el.addEventListener("timeupdate", () => {
			if (dragging()) return;
			setValue(props.el.currentTime);
		});
		props.el.addEventListener("click", () => {
			togglePlayback();
		});
	});

	const togglePlayback = () => {
		if (playing()) {
			props.el.pause();
		} else {
			props.el.play();
		}
		setPlaying(!playing());
	};

	const toggleFullscreen = () => {
		if (fullscreen()) {
			document.exitFullscreen();
		} else {
			props.root.requestFullscreen();
		}

		setFullscreen(!fullscreen());
	};

	return (
		<div class="absolute bottom-0 left-0 w-full rounded-b-xl flex flex-col gap-1 py-2 px-4 bg-background bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
			<div class="h-1.5 flex justify-center items-center">
				<Slider
					value={[value()]}
					onChange={(values) => {
						setDragging(true);
						setValue(values[0]);
						props.el.currentTime = values[0];
					}}
					onChangeEnd={() => {
						setValue(props.el.currentTime);
						setDragging(false);
					}}
					maxValue={props.el.duration}
					minValue={0}
					step={1}
				>
					<SliderTrack class="group h-1 hover:h-1.5">
						<SliderFill />
						<SliderThumb class="bg-white size-4 hover:-top-1 -top-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
					</SliderTrack>
				</Slider>
			</div>
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-1 items-center">
					<Button
						onClick={togglePlayback}
						variant="ghost"
						class="rounded-full aspect-square"
					>
						<Switch>
							<Match when={playing()}>
								<IoPause size={20} />
							</Match>
							<Match when={!playing()}>
								<IoPlay size={20} />
							</Match>
						</Switch>
					</Button>
					<p>
						{padSeconds(value() * 1000)} / {padSeconds(props.video.duration)}
					</p>
				</div>

				<div class="flex flex-row gap-1">
					<Button
						onClick={toggleFullscreen}
						variant="ghost"
						class="rounded-full aspect-square"
					>
						<Switch>
							<Match when={fullscreen()}>
								<IoContract size={20} />
							</Match>
							<Match when={!fullscreen()}>
								<IoExpand size={20} />
							</Match>
						</Switch>
					</Button>
				</div>
			</div>
		</div>
	);
}
