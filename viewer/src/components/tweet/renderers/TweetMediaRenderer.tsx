import { IoCopyOutline, IoDownloadOutline } from "solid-icons/io";
import {
	type TweetMedia,
	TweetMediaType,
	type TweetPhoto,
	type TweetVideo,
} from "~/api/types/tweet";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { useI18nContext } from "~/i18n/i18n-solid";
import TweetVideoRenderer from "./TweetVideoRenderer";

export default function TweetMediaRenderer(props: { media: TweetMedia[] }) {
	const { LL } = useI18nContext();

	return props.media.map((media) => {
		switch (media.type) {
			case TweetMediaType.Photo: {
				const photo = media as TweetPhoto;
				const variants = Object.keys(photo.variants);
				const variant = variants.includes("medium")
					? "medium"
					: variants.includes("large")
						? "large"
						: Object.entries(photo.variants).reduce((prev, current) =>
								prev && prev[1].width > current[1].width ? prev : current,
							)[0];

				return (
					<ContextMenu>
						<ContextMenuTrigger as="div">
							<img
								draggable={false}
								style={{ "aspect-ratio": photo.size.aspectRatio }}
								class="rounded-xl"
								src={photo.variants[variant].url}
								alt=""
							/>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem class="flex flex-row gap-2 items-center px-4 py-3">
								<IoCopyOutline size={18} /> {LL().tweet.actions.copy()}
							</ContextMenuItem>
							<ContextMenuSub>
								<ContextMenuSubTrigger>
									<ContextMenuItem class="flex flex-row gap-2 items-center">
										<IoDownloadOutline size={18} /> {LL().tweet.actions.save()}
									</ContextMenuItem>
								</ContextMenuSubTrigger>
								<ContextMenuSubContent>
									<ContextMenuItem class="flex flex-row gap-3 items-center">
										PNG
									</ContextMenuItem>
									<ContextMenuItem class="flex flex-row gap-3 items-center">
										JPG
									</ContextMenuItem>
									<ContextMenuItem class="flex flex-row gap-3 items-center">
										WEBP
									</ContextMenuItem>
								</ContextMenuSubContent>
							</ContextMenuSub>
						</ContextMenuContent>
					</ContextMenu>
				);
			}
			case TweetMediaType.Video: {
				return <TweetVideoRenderer video={media as TweetVideo} />;
			}
			default: {
				return <></>;
			}
		}
	});
}
