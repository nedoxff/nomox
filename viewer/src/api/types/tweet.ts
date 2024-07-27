import type { FormattableText } from "./common";
import type { User } from "./user";

export type Tweet = TweetBase &
	(
		| { type: "retweet" }
		| ({
				type: "full";
		  } & TweetContent)
	);

export type TweetBase = {
	id: string;
	createdAt: string;
	muted: boolean;
	user: User;
	retweetOf: Tweet | null;
};

export type TweetContent = {
	stats: {
		views: number | null;
		retweets: number;
		bookmarks: number;
		quotes: number;
		likes: number;
		replies: number;
	};

	content: FormattableText & {
		media: TweetMedia[];
	};

	personal: {
		retweeted: boolean;
		bookmarked: boolean;
		liked: boolean;
	};
};

export enum TweetMediaType {
	Photo = "photo",
	Video = "video",
}

export abstract class TweetMedia {
	type: TweetMediaType;
	id: string;
	size: TweetMediaOriginalSize;

	constructor(
		_type: TweetMediaType,
		_id: string,
		_size: TweetMediaOriginalSize,
	) {
		this.type = _type;
		this.id = _id;
		this.size = _size;
	}
}

export class TweetPhoto extends TweetMedia {
	variants: Record<string, TweetPhotoVariant>;
	cdnId: string;

	constructor(
		_id: string,
		_size: TweetMediaOriginalSize,
		_variants: Record<string, TweetPhotoVariant>,
		_cdnId: string,
	) {
		super(TweetMediaType.Photo, _id, _size);
		this.variants = _variants;
		this.cdnId = _cdnId;
	}
}

export class TweetVideo extends TweetMedia {
	variants: TweetVideoVariant[];
	duration: number;

	constructor(
		_id: string,
		_size: TweetMediaOriginalSize,
		_variants: TweetVideoVariant[],
		_duration: number,
	) {
		super(TweetMediaType.Video, _id, _size);
		this.variants = _variants;
		this.duration = _duration;
	}
}

export type TweetMediaOriginalSize = {
	width: number;
	height: number;
	aspectRatio: number;
};

export type TweetVideoVariant = {
	contentType: string;
	bitrate: number | null;
	url: string;
};

export type TweetPhotoVariant = {
	width: number;
	height: number;
	url: string;
};

export enum TweetEntityType {
	Text = "text",
	UserMention = "mention",
	Hashtag = "hashtag",
	Link = "link",
}

export abstract class TweetEntity {
	indices: number[];
	type: TweetEntityType;

	constructor(_indices: number[], _type: TweetEntityType) {
		this.indices = _indices;
		this.type = _type;
	}
}

export class UserMentionEntity extends TweetEntity {
	id: string;
	username: string;

	constructor(_indices: number[], _id: string, _username: string) {
		super(_indices, TweetEntityType.UserMention);
		this.id = _id;
		this.username = _username;
	}
}

export class HashtagEntity extends TweetEntity {
	tag: string;

	constructor(_indices: number[], _tag: string) {
		super(_indices, TweetEntityType.Hashtag);
		this.tag = _tag;
	}
}

export class LinkEntity extends TweetEntity {
	url: string;
	display: string;

	constructor(_indices: number[], _url: string, _display: string) {
		super(_indices, TweetEntityType.Link);
		this.url = _url;
		this.display = _display;
	}
}

export class TextEntity extends TweetEntity {
	text: string;

	constructor(_indices: number[], _text: string) {
		super(_indices, TweetEntityType.Text);
		this.text = _text;
	}
}
