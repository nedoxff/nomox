import type { RawTweet, RawUser } from "../internal_types/common_types";
import type { Tweet } from "../types/tweet";
import type { User } from "../types/user";

const nullIfEmpty = (str?: string) =>
	str === undefined || str === "" ? null : str;

export function convertRawTweet(tweet: RawTweet): Tweet {
	return {
		id: tweet.rest_id,
		createdAt: tweet.legacy.created_at,
		muted: tweet.conversation_muted,
		retweetOf:
			tweet.legacy.retweeted_status_result === undefined
				? null
				: convertRawTweet(tweet.legacy.retweeted_status_result.result),
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
			description: nullIfEmpty(user.legacy.description),
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
