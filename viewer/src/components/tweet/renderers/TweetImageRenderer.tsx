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
	const variant = props.photo.variants.includes("medium")
		? "medium"
		: props.photo.variants.includes("large")
			? "large"
			: props.photo.variants[0];

	const getBestLink = (format: ImageFormat) => {
		const bestVariant = props.photo.variants.includes("large")
			? "large"
			: props.photo.variants[0];
		return `${import.meta.env.VITE_API_BASE}/media/image/${props.photo.id}/${format}/${bestVariant}`;
	};

	const getBestBlob = async (format: ImageFormat) => {
		return await (await fetch(getBestLink(format))).blob();
	};

	const downloadImage = async (format: ImageFormat) => {
		try {
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = `${getBestLink(format)}?download`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

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
						src={`${import.meta.env.VITE_API_BASE}/media/image/${props.photo.id}/jpg/${variant}`}
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
