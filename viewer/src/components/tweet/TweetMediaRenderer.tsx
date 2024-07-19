import {
	Tweet,
	type TweetMedia,
	TweetMediaType,
	type TweetPhoto,
} from "~/api/types/tweet";

export default function TweetMediaRenderer(props: { media: TweetMedia[] }) {
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
					<img
						style={{ "aspect-ratio": photo.size.aspectRatio }}
						class="rounded-xl"
						src={photo.variants[variant].url}
						alt=""
					/>
				);
			}
			case TweetMediaType.Video: {
				return <></>;
			}
			default: {
				return <></>;
			}
		}
	});
}
