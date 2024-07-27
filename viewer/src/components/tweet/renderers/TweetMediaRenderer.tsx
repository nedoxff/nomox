import {
	type TweetMedia,
	TweetMediaType,
	type TweetPhoto,
	type TweetVideo,
} from "~/api/types/tweet";

import { useI18nContext } from "~/i18n/i18n-solid";
import TweetVideoRenderer from "./TweetVideoRenderer";
import TweetImageRenderer from "./TweetImageRenderer";

export default function TweetMediaRenderer(props: { media: TweetMedia[] }) {
	return props.media.map((media) => {
		switch (media.type) {
			case TweetMediaType.Photo: {
				return <TweetImageRenderer photo={media as TweetPhoto} />;
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
