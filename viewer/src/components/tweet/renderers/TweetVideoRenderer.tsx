import type { TweetVideo } from "~/api/types/tweet";
import Hls from "hls.js";
import {
	createEffect,
	createSignal,
	Match,
	onMount,
	Show,
	Switch,
} from "solid-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import {
	Slider,
	SliderFill,
	SliderThumb,
	SliderTrack,
} from "~/components/ui/slider";
import { Button } from "~/components/ui/button";
import {
	TbMaximize,
	TbMinimize,
	TbPictureInPicture,
	TbPictureInPictureOff,
	TbPlayerPauseFilled,
	TbPlayerPlayFilled,
	TbVolume,
	TbVolumeOff,
} from "solid-icons/tb";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";

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
			<video
				loop
				muted
				tabIndex={-1}
				ref={ref}
				class="size-full cursor-pointer rounded-xl outline-none"
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
	const visible = createVisibilityObserver()(() => props.el);
	const [pip, setPip] = createSignal(false);
	const [fullscreen, setFullscreen] = createSignal(false);
	const [playing, setPlaying] = createSignal(false);
	const [value, setValue] = createSignal(0);
	const [dragging, setDragging] = createSignal(false);
	const [locked, setLocked] = createSignal(false);

	onMount(() => {
		props.el.addEventListener("timeupdate", () => {
			if (dragging()) return;
			setValue(props.el.currentTime);
		});

		props.el.addEventListener("click", () => {
			props.el.focus();

			if (props.el.muted) {
				props.el.muted = false;
			} else {
				togglePlayback();
			}
		});

		props.el.addEventListener("enterpictureinpicture", () => setPip(true));
		props.el.addEventListener("leavepictureinpicture", () => setPip(false));
		props.el.addEventListener("pause", () => setPlaying(false));
		props.el.addEventListener("play", () => setPlaying(true));

		props.el.addEventListener("keypress", (e) => {
			e.preventDefault();

			if (e.key === " ") {
				togglePlayback();
			}
		});
	});

	createEffect((prev) => {
		if (visible() && !prev) {
			props.el.play();
			setPlaying(true);
		} else if (!visible() && prev) {
			props.el.pause();
			props.el.blur();
			setPlaying(false);
		}

		return visible();
	}, false);

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

	const togglePictureInPicture = () => {
		if (pip()) {
			document.exitPictureInPicture();
		} else {
			props.el.requestPictureInPicture();
		}

		setPip(!pip());
	};

	return (
		<div
			style={{ opacity: locked() ? 1 : undefined }}
			class="absolute bottom-0 left-0 w-full rounded-b-xl flex flex-col gap-1 py-2 px-4 bg-background bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
		>
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
						<SliderThumb class="bg-white size-4 -top-1.5 hover:-top-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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
								<TbPlayerPauseFilled size={20} />
							</Match>
							<Match when={!playing()}>
								<TbPlayerPlayFilled size={20} />
							</Match>
						</Switch>
					</Button>
					<p>
						{padSeconds(value() * 1000)} / {padSeconds(props.video.duration)}
					</p>
				</div>

				<div class="flex flex-row gap-1">
					<TweetVideoSoundSlider onLock={setLocked} video={props.el} />

					<Button
						onClick={togglePictureInPicture}
						variant="ghost"
						class="rounded-full aspect-square"
					>
						<Switch>
							<Match when={pip()}>
								<TbPictureInPictureOff size={20} />
							</Match>
							<Match when={!pip()}>
								<TbPictureInPicture size={20} />
							</Match>
						</Switch>
					</Button>

					<Button
						onClick={toggleFullscreen}
						variant="ghost"
						class="rounded-full aspect-square"
					>
						<Switch>
							<Match when={fullscreen()}>
								<TbMinimize size={20} />
							</Match>
							<Match when={!fullscreen()}>
								<TbMaximize size={20} />
							</Match>
						</Switch>
					</Button>
				</div>
			</div>
		</div>
	);
}

function TweetVideoSoundSlider(props: {
	video: HTMLVideoElement;
	onLock: (locked: boolean) => void;
}) {
	const [volume, setVolume] = createSignal(100);
	const [muted, setMuted] = createSignal(true);

	onMount(() => {
		props.video.addEventListener("volumechange", () => {
			setMuted(props.video.muted);
		});
	});

	createEffect(() => {
		props.video.volume = volume() / 100;
	});

	const toggleMuted = () => {
		props.video.muted = !props.video.muted;
	};

	return (
		<HoverCard
			onOpenChange={(open) => props.onLock(open)}
			gutter={10}
			placement="left"
		>
			<HoverCardTrigger as="div">
				<Button
					onClick={toggleMuted}
					variant="ghost"
					class="rounded-full p-0 aspect-square"
				>
					<Switch>
						<Match when={muted()}>
							<TbVolumeOff size={20} />
						</Match>
						<Match when={!muted()}>
							<TbVolume size={20} />
						</Match>
					</Switch>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent class="w-36">
				<Slider
					value={[volume()]}
					onChange={(values) => {
						if (props.video.muted) {
							props.video.muted = false;
						}
						setVolume(values[0]);
					}}
					maxValue={100}
					minValue={0}
				>
					<SliderTrack class="h-1.5">
						<SliderFill />
						<SliderThumb class="size-4 -top-1 bg-white" />
					</SliderTrack>
				</Slider>
			</HoverCardContent>
		</HoverCard>
	);
}
