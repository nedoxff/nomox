import type { Translation } from "../i18n-types.js";

const ru = {
	name: "Русский",
	flag: "🇷🇺",

	login: {
		noGraphic: "nomox does not yet have a fancy graphic for this section.",
		title: "добро пожаловать в nomox!",
		description:
			"nomox is an alternative way of viewing twitter, now known as X.",
		loginInstructions:
			"to login, use the same credentials you would use to login into twitter.",
		id: "id",
		idPlaceholder: "enter your username/email/phone number...",
		password: "password",
		passwordPlaceholder: "enter your password...",
		login: "login",
		sourceCode: "source code",
	},
} satisfies Translation;

export default ru;
