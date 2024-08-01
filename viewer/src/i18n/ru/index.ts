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
		id: "идентификатор",
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
		info: {
			projectDescription:
				"nomox является ПО с открытым исходным кодом, лицензируемым под AGPL-3.0. если вы желаете помочь разработке, можете глянуть [GITHUB] проекта.",
			version: "версия",
		},
	},

	tweet: {
		actions: {
			seeOriginal: "открыть твит в X",
			copy: {
				title: "копировать",
				link: "ссылку",
				image: "изображение",
				success:
					"{what|{image: изображение, link: ссылка}} успешно {what|{image: скопировано, link: скопирована}} в буфер обмена",
				error:
					"не удалось скопировать {what|{image: изображение, link: ссылку}} в буфер обмена",
			},
			save: {
				title: "сохранить",
				success: "изображение успешно сохранено",
				error: "не удалось сохранить изображение",
			},
			engagement: {
				likeFailed:
					"не удалось {action|{like: лайкнуть этот твит, unlike: убрать лайк с этого твита}}",
				bookmarkFailed:
					"не удалось {action|{bookmark: добавить этот твит в закладки, unbookmark: удалить этот твит из закладок}}",
				retweetFailed:
					"не удалось {action|{retweet: ретвитнуть этот твит, unretweet: удалить ретвит этого твита}}",

				retweet: "ретвитнуть",
				unretweet: "удалить ретвит",
				quote: "цитировать",
			},
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
