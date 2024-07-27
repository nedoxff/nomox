import { IoCopyOutline, IoDownloadOutline } from "solid-icons/io";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "~/components/ui/context-menu";
import type { TweetPhoto } from "~/api/types/tweet";
import { useI18nContext } from "~/i18n/i18n-solid";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { toast } from "solid-sonner";

// no avif :(
type ImageFormat = "jpg" | "png" | "webp";

export default function TweetImageRenderer(props: { photo: TweetPhoto }) {
	const { LL } = useI18nContext();
	let image!: HTMLImageElement;
	const variants = Object.keys(props.photo.variants);
	const variant = variants.includes("medium")
		? "medium"
		: variants.includes("large")
			? "large"
			: Object.entries(props.photo.variants).reduce((prev, current) =>
					prev && prev[1].width > current[1].width ? prev : current,
				)[0];

	const getBestLink = (format: ImageFormat) => {
		// TODO: the image CDN API might change, not sure if this is the best way to obtain the URL
		// MAYBE pass all of this to the untangler?
		return Object.entries(props.photo.variants)
			.reduce((prev, current) =>
				prev && prev[1].width > current[1].width ? prev : current,
			)[1]
			.url.replace("&format=jpg", `&format=${format}`);
	};

	const getBestBlob = async (format: ImageFormat) => {
		return await (await fetch(getBestLink(format))).blob();
	};

	const downloadImage = async (format: ImageFormat) => {
		try {
			const blob = await getBestBlob(format);
			const filename = `${props.photo.cdnId}.${format}`;

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);

			toast.success(LL().tweet.actions.save.success());
		} catch (e) {
			console.error(`failed to save an image: ${e}`);
			toast.error(LL().tweet.actions.save.error());
		}
	};

	const copyImageToClipboard = async () => {
		try {
			// TODO: should this be forced to png?
			const blob = await getBestBlob("png");
			await navigator.clipboard.write([
				new ClipboardItem({ [blob.type]: blob }),
			]);
			toast.success(LL().tweet.actions.copy.success({ what: "image" }));
		} catch (e) {
			console.error(`failed to copy an image to clipboard: ${e}`);
			toast.error(LL().tweet.actions.copy.error({ what: "image" }));
		}
	};

	const copyLinkToClipboard = async () => {
		try {
			// TODO: should this be forced to png?
			const link = getBestLink("png");
			await navigator.clipboard.writeText(link);
			toast.success(LL().tweet.actions.copy.success({ what: "link" }));
		} catch (e) {
			console.error(`failed to copy a link to clipboard: ${e}`);
			toast.error(LL().tweet.actions.copy.error({ what: "link" }));
		}
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger as="div">
				<AspectRatio ratio={props.photo.size.aspectRatio}>
					<img
						ref={image}
						draggable={false}
						class="rounded-xl w-full"
						src={props.photo.variants[variant].url}
						alt=""
					/>
				</AspectRatio>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuSub>
					<ContextMenuSubTrigger>
						<ContextMenuItem class="flex flex-row gap-2 items-center">
							<IoCopyOutline size={18} /> {LL().tweet.actions.copy.title()}
						</ContextMenuItem>
					</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						<ContextMenuItem
							class="flex flex-row gap-3 items-center"
							onSelect={copyImageToClipboard}
						>
							{LL().tweet.actions.copy.image()}
						</ContextMenuItem>
						<ContextMenuItem
							class="flex flex-row gap-3 items-center"
							onSelect={copyLinkToClipboard}
						>
							{LL().tweet.actions.copy.link()}
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSub>
					<ContextMenuSubTrigger>
						<ContextMenuItem class="flex flex-row gap-2 items-center">
							<IoDownloadOutline size={18} /> {LL().tweet.actions.save.title()}
						</ContextMenuItem>
					</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						<ContextMenuItem
							class="flex flex-row gap-3 items-center"
							onSelect={() => downloadImage("png")}
						>
							PNG
						</ContextMenuItem>
						<ContextMenuItem
							class="flex flex-row gap-3 items-center"
							onSelect={() => downloadImage("jpg")}
						>
							JPG
						</ContextMenuItem>
						<ContextMenuItem
							class="flex flex-row gap-3 items-center"
							onSelect={() => downloadImage("webp")}
						>
							WEBP
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
			</ContextMenuContent>
		</ContextMenu>
	);
}
