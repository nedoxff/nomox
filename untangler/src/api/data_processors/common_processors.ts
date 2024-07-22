import * as runes from "runes2";
import type {
	RawTextEntities,
	RawTweet,
	RawTweetMedia,
	RawUser,
} from "../internal_types/common_types";
import {
	HashtagEntity,
	TextEntity,
	type TweetMedia,
	UserMentionEntity,
	type TweetEntity,
	TweetPhoto,
	type TweetPhotoVariant,
	TweetVideo,
	type TweetVideoVariant,
	type Tweet,
	type TweetBase,
	LinkEntity,
} from "../types/tweet";
import type { User } from "../types/user";
import he from "he";

const IMAGE_ENDPOINT = "https://pbs.twimg.com/media";

const convertMedia = (media: RawTweetMedia): TweetMedia => {
	switch (media.type) {
		case "photo": {
			const realId =
				new URL(media.media_url_https).pathname
					.split("/")
					.pop()
					?.split(".")
					.shift() ?? "";

			const variants: Record<string, TweetPhotoVariant> = {};
			for (const pair of Object.entries(media.sizes)) {
				variants[pair[0]] = {
					width: pair[1].w,
					height: pair[1].h,
					// todo: should the image type always be jpg?
					url: `${IMAGE_ENDPOINT}/${realId}?name=${pair[0]}&format=jpg`,
				};
			}

			const largestVariant = Object.values(media.sizes).reduce(
				(prev, current) => (prev && prev.w > current.w ? prev : current),
			) ?? {
				w: media.original_info.width,
				h: media.original_info.height,
				resize: "fit",
			};

			return new TweetPhoto(
				media.id_str,
				{
					width: largestVariant.w,
					height: largestVariant.h,
					aspectRatio: largestVariant.w / largestVariant.h,
				},
				variants,
			);
		}
		case "video": {
			if (media.video_info === undefined) {
				throw new Error(
					"cannot convert a video entity without media.video_info",
				);
			}

			const variants: TweetVideoVariant[] = media.video_info.variants
				.filter((variant) => variant.bitrate !== undefined)
				.map<TweetVideoVariant>((variant) => ({
					contentType: variant.content_type,
					bitrate: variant.bitrate ?? -1,
					url: variant.url,
				}));
			return new TweetVideo(
				media.id_str,
				{
					width: media.original_info.width,
					height: media.original_info.height,
					aspectRatio: media.original_info.width / media.original_info.height,
				},
				variants,
				media.video_info.duration_millis,
			);
		}
		default: {
			throw new Error(`unknown media type "${media.type}"`);
		}
	}
};

const nullIfEmpty = (str?: string) =>
	str === undefined || str === "" ? null : str;

export function convertRawTweet(tweet: RawTweet | null): Tweet | null {
	if (tweet === null) {
		return null;
	}

	const base: TweetBase = {
		id: tweet.rest_id,
		createdAt: tweet.legacy.created_at,
		muted: tweet.conversation_muted,
		retweetOf: convertRawTweet(
			tweet.legacy.retweeted_status_result?.result ??
				tweet.quoted_status_result?.result ??
				null,
		),
		user: convertRawUser(tweet.core.user_result.result),
	};

	if (
		!tweet.legacy.is_quote_status &&
		tweet.legacy.retweeted_status_result !== undefined
	) {
		return {
			...base,
			type: "retweet",
		};
	}

	return {
		...base,
		type: "full",
		user: convertRawUser(tweet.core.user_result.result),
		stats: {
			views:
				tweet.view_count_info.count === undefined
					? null
					: Number.parseInt(tweet.view_count_info.count),
			retweets: tweet.legacy.retweet_count,
			bookmarks: tweet.legacy.bookmark_count,
			quotes: tweet.legacy.quote_count,
			likes: tweet.legacy.favorite_count,
			replies: tweet.legacy.reply_count,
		},
		content: {
			unformatted: tweet.legacy.full_text,
			entities: convertEntities(tweet.legacy.full_text, tweet.legacy.entities),
			media: (
				tweet.legacy.extended_entities?.media ??
				tweet.legacy.entities.media ??
				[]
			).map(convertMedia),
		},
		personal: {
			retweeted: tweet.legacy.retweeted,
			bookmarked: tweet.legacy.bookmarked,
			liked: tweet.legacy.favorited,
		},
	};
}

export function convertRawUser(user: RawUser): User {
	return {
		id: user.rest_id,
		verified: user.is_blue_verified,
		protected: user.legacy.protected,
		createdAt: user.legacy.created_at,
		profile: {
			username: user.legacy.screen_name,
			displayName: user.legacy.name,
			description:
				user.legacy.description === ""
					? null
					: {
							unformatted: user.legacy.description,
							entities: convertEntities(
								user.legacy.description,
								user.legacy.entities.description,
							),
						},
			location: nullIfEmpty(user.legacy.location),
			bannerUrl: nullIfEmpty(user.legacy.profile_banner_url),
			imageUrl: nullIfEmpty(user.legacy.profile_image_url_https),
			preferences: {
				backgroundColor: user.legacy.profile_background_color,
				linkColor: user.legacy.profile_link_color,
			},
		},
		stats: {
			tweets: user.legacy.statuses_count,
			media: user.legacy.media_count,
			likes: user.legacy.favourites_count,
			following: user.legacy.friends_count,
			followers: user.legacy.followers_count,
		},
		personal: {
			following: user.legacy.following ?? false,
		},
	};
}

function convertEntities(
	unformatted: string,
	entities: RawTextEntities,
): TweetEntity[] {
	const regex = /https?:\/\/t\.co\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	const text = he.decode(unformatted.replace(regex, ""));
	const length = runes.runes(text).length;

	const hashtags = entities.hashtags;
	const mentions = entities.user_mentions;
	const urls = entities.urls;

	const startIndices = [
		...hashtags.map((entity) => entity.indices[0]),
		...mentions.map((entity) => entity.indices[0]),
		...urls.map((entity) => entity.indices[0]),
	].sort((a, b) => a - b);

	if (startIndices.length === 0) {
		return [new TextEntity([0, length], text)];
	}

	const result = [];
	let currentIndex = 0;

	while (startIndices.length !== 0) {
		const index = startIndices.shift();
		if (index === undefined) {
			break;
		}

		if (index !== 0) {
			const regularText = runes.substring(
				text,
				currentIndex,
				index - currentIndex,
			);
			result.push(new TextEntity([currentIndex, index], regularText));
		}

		if (hashtags.some((entity) => entity.indices[0] === index)) {
			const hashtag = hashtags.find((entity) => entity.indices[0] === index);
			if (hashtag === undefined) {
				continue;
			}

			result.push(new HashtagEntity(hashtag.indices, hashtag.text));
			currentIndex = hashtag.indices[1];
		}

		if (mentions.some((entity) => entity.indices[0] === index)) {
			const mention = mentions.find((entity) => entity.indices[0] === index);
			if (mention === undefined) {
				continue;
			}

			result.push(
				new UserMentionEntity(
					mention.indices,
					mention.id_str,
					mention.screen_name,
				),
			);
			currentIndex = mention.indices[1];
		}

		if (urls.some((entity) => entity.indices[0] === index)) {
			const link = urls.find((entity) => entity.indices[0] === index);
			if (link === undefined) {
				continue;
			}

			result.push(
				new LinkEntity(link.indices, link.expanded_url, link.display_url),
			);
			currentIndex = link.indices[1];
		}
	}

	if (currentIndex < length - 1) {
		result.push(
			new TextEntity(
				[currentIndex, length - 1],
				runes.substring(text, currentIndex),
			),
		);
	}

	return result;
}
