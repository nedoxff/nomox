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
	},

	tweet: {
		actions: {
			seeOriginal: "open tweet in X",
			copy: "copy",
			save: "save",
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
