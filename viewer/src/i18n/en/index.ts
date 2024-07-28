import type { BaseTranslation } from "../i18n-types.js";

const en = {
	name: "English",
	flag: "🌐",

	login: {
		noGraphic: "nomox does not yet have a fancy graphic for this section.",
		title: "welcome to nomox!",
		description:
			"nomox is an alternative frontend for twitter, now known as X.",
		loginInstructions:
			"to login, use the same credentials you would use to login into twitter.",
		id: "id",
		idPlaceholder: "enter your username/email/phone number...",
		password: "password",
		passwordPlaceholder: "enter your password...",
		login: "login",
		sourceCode: "source code",
	},

	main: {
		tabs: {
			home: "home",
			explore: "explore",
			notifications: "notifications",
			messages: "messages",
			bookmarks: "bookmarks",
			profile: "profile",
			settings: "settings",
		},
		info: {
			projectDescription:
				"nomox is open-source software licensed under AGPL-3.0. if you wish to contribute, you can check the project at [GITHUB].",
			version: "version",
		},
	},

	tweet: {
		actions: {
			seeOriginal: "open tweet in X",
			copy: {
				title: "copy",
				link: "link",
				image: "image",
				success:
					"successfully copied the {what|{image: image, link: link}} to clipboard",
				error:
					"failed to copy the {what|{image: image, link: link}} to clipboard",
			},
			save: {
				title: "save",
				success: "successfully saved the image",
				error: "failed to save the image",
			},
			engagement: {
				likeFailed:
					"failed to {action|{like: like, unlike: unlike}} this tweet",
				bookmarkFailed:
					"failed to {action|{bookmark: bookmark this tweet, unbookmark: remove this tweet from bookmarks}}",
				retweetFailed:
					"failed to {action|{retweet: retweet this tweet, unretweet: unretweet this tweet}}",
			},
		},
		retweeted: "retweeted",
	},

	user: {
		follow: "follow",
		followers: "followers",
		following: "following",
	},
} satisfies BaseTranslation;

export default en;
