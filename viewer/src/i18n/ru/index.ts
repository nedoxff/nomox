import type { Translation } from "../i18n-types.js";

const ru = {
	name: "Русский",
	flag: "🇷🇺",

	login: {
		noGraphic:
			"на данный момент у nomox нет красивой картинки для этой секции.",
		title: "добро пожаловать в nomox!",
		description: "nomox — альтернативный фронтэнд для твиттера (сейчас X).",
		loginInstructions:
			"чтобы войти, используйте те же данные, которые вы бы использовали для входа в твиттер.",
		id: "индентификатор",
		idPlaceholder: "введите ваше имя пользователя/почту/номер телефона...",
		password: "пароль",
		passwordPlaceholder: "введите ваш пароль...",
		login: "войти",
		sourceCode: "исходный код",
	},

	main: {
		tabs: {
			home: "главная",
			explore: "обзор",
			notifications: "уведомления",
			messages: "сообщения",
			bookmarks: "заметки",
			profile: "профиль",
			settings: "настройки",
		},
	},

	tweet: {
		actions: {
			seeOriginal: "открыть твит в X",
			copy: "копировать",
			save: "сохранить",
		},
		retweeted: "ретвитнул",
	},
	user: {
		follow: "читать",
		followers: "читателей",
		following: "в читаемых",
	},
} satisfies Translation;

export default ru;
