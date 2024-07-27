// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'ru'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * E​n​g​l​i​s​h
	 */
	name: string
	/**
	 * �​�
	 */
	flag: string
	login: {
		/**
		 * n​o​m​o​x​ ​d​o​e​s​ ​n​o​t​ ​y​e​t​ ​h​a​v​e​ ​a​ ​f​a​n​c​y​ ​g​r​a​p​h​i​c​ ​f​o​r​ ​t​h​i​s​ ​s​e​c​t​i​o​n​.
		 */
		noGraphic: string
		/**
		 * w​e​l​c​o​m​e​ ​t​o​ ​n​o​m​o​x​!
		 */
		title: string
		/**
		 * n​o​m​o​x​ ​i​s​ ​a​n​ ​a​l​t​e​r​n​a​t​i​v​e​ ​f​r​o​n​t​e​n​d​ ​f​o​r​ ​t​w​i​t​t​e​r​,​ ​n​o​w​ ​k​n​o​w​n​ ​a​s​ ​X​.
		 */
		description: string
		/**
		 * t​o​ ​l​o​g​i​n​,​ ​u​s​e​ ​t​h​e​ ​s​a​m​e​ ​c​r​e​d​e​n​t​i​a​l​s​ ​y​o​u​ ​w​o​u​l​d​ ​u​s​e​ ​t​o​ ​l​o​g​i​n​ ​i​n​t​o​ ​t​w​i​t​t​e​r​.
		 */
		loginInstructions: string
		/**
		 * i​d
		 */
		id: string
		/**
		 * e​n​t​e​r​ ​y​o​u​r​ ​u​s​e​r​n​a​m​e​/​e​m​a​i​l​/​p​h​o​n​e​ ​n​u​m​b​e​r​.​.​.
		 */
		idPlaceholder: string
		/**
		 * p​a​s​s​w​o​r​d
		 */
		password: string
		/**
		 * e​n​t​e​r​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​.​.​.
		 */
		passwordPlaceholder: string
		/**
		 * l​o​g​i​n
		 */
		login: string
		/**
		 * s​o​u​r​c​e​ ​c​o​d​e
		 */
		sourceCode: string
	}
	main: {
		tabs: {
			/**
			 * h​o​m​e
			 */
			home: string
			/**
			 * e​x​p​l​o​r​e
			 */
			explore: string
			/**
			 * n​o​t​i​f​i​c​a​t​i​o​n​s
			 */
			notifications: string
			/**
			 * m​e​s​s​a​g​e​s
			 */
			messages: string
			/**
			 * b​o​o​k​m​a​r​k​s
			 */
			bookmarks: string
			/**
			 * p​r​o​f​i​l​e
			 */
			profile: string
			/**
			 * s​e​t​t​i​n​g​s
			 */
			settings: string
		}
		info: {
			/**
			 * n​o​m​o​x​ ​i​s​ ​o​p​e​n​-​s​o​u​r​c​e​ ​s​o​f​t​w​a​r​e​ ​l​i​c​e​n​s​e​d​ ​u​n​d​e​r​ ​A​G​P​L​-​3​.​0​.​ ​i​f​ ​y​o​u​ ​w​i​s​h​ ​t​o​ ​c​o​n​t​r​i​b​u​t​e​,​ ​y​o​u​ ​c​a​n​ ​c​h​e​c​k​ ​t​h​e​ ​p​r​o​j​e​c​t​ ​a​t​ ​[​G​I​T​H​U​B​]​.
			 */
			projectDescription: string
			/**
			 * v​e​r​s​i​o​n
			 */
			version: string
		}
	}
	tweet: {
		actions: {
			/**
			 * o​p​e​n​ ​t​w​e​e​t​ ​i​n​ ​X
			 */
			seeOriginal: string
			copy: {
				/**
				 * c​o​p​y
				 */
				title: string
				/**
				 * l​i​n​k
				 */
				link: string
				/**
				 * i​m​a​g​e
				 */
				image: string
				/**
				 * s​u​c​c​e​s​s​f​u​l​l​y​ ​c​o​p​i​e​d​ ​t​h​e​ ​{​w​h​a​t​|​{​i​m​a​g​e​:​ ​i​m​a​g​e​,​ ​l​i​n​k​:​ ​l​i​n​k​}​}​ ​t​o​ ​c​l​i​p​b​o​a​r​d
				 * @param {'image' | 'link'} what
				 */
				success: RequiredParams<`what|{image:${string}, link:${string}}`>
				/**
				 * f​a​i​l​e​d​ ​t​o​ ​c​o​p​y​ ​t​h​e​ ​{​w​h​a​t​|​{​i​m​a​g​e​:​ ​i​m​a​g​e​,​ ​l​i​n​k​:​ ​l​i​n​k​}​}​ ​t​o​ ​c​l​i​p​b​o​a​r​d
				 * @param {'image' | 'link'} what
				 */
				error: RequiredParams<`what|{image:${string}, link:${string}}`>
			}
			save: {
				/**
				 * s​a​v​e
				 */
				title: string
				/**
				 * s​u​c​c​e​s​s​f​u​l​l​y​ ​s​a​v​e​d​ ​t​h​e​ ​i​m​a​g​e
				 */
				success: string
				/**
				 * f​a​i​l​e​d​ ​t​o​ ​s​a​v​e​ ​t​h​e​ ​i​m​a​g​e
				 */
				error: string
			}
		}
		/**
		 * r​e​t​w​e​e​t​e​d
		 */
		retweeted: string
	}
	user: {
		/**
		 * f​o​l​l​o​w
		 */
		follow: string
		/**
		 * f​o​l​l​o​w​e​r​s
		 */
		followers: string
		/**
		 * f​o​l​l​o​w​i​n​g
		 */
		following: string
	}
}

export type TranslationFunctions = {
	/**
	 * English
	 */
	name: () => LocalizedString
	/**
	 * 🌐
	 */
	flag: () => LocalizedString
	login: {
		/**
		 * nomox does not yet have a fancy graphic for this section.
		 */
		noGraphic: () => LocalizedString
		/**
		 * welcome to nomox!
		 */
		title: () => LocalizedString
		/**
		 * nomox is an alternative frontend for twitter, now known as X.
		 */
		description: () => LocalizedString
		/**
		 * to login, use the same credentials you would use to login into twitter.
		 */
		loginInstructions: () => LocalizedString
		/**
		 * id
		 */
		id: () => LocalizedString
		/**
		 * enter your username/email/phone number...
		 */
		idPlaceholder: () => LocalizedString
		/**
		 * password
		 */
		password: () => LocalizedString
		/**
		 * enter your password...
		 */
		passwordPlaceholder: () => LocalizedString
		/**
		 * login
		 */
		login: () => LocalizedString
		/**
		 * source code
		 */
		sourceCode: () => LocalizedString
	}
	main: {
		tabs: {
			/**
			 * home
			 */
			home: () => LocalizedString
			/**
			 * explore
			 */
			explore: () => LocalizedString
			/**
			 * notifications
			 */
			notifications: () => LocalizedString
			/**
			 * messages
			 */
			messages: () => LocalizedString
			/**
			 * bookmarks
			 */
			bookmarks: () => LocalizedString
			/**
			 * profile
			 */
			profile: () => LocalizedString
			/**
			 * settings
			 */
			settings: () => LocalizedString
		}
		info: {
			/**
			 * nomox is open-source software licensed under AGPL-3.0. if you wish to contribute, you can check the project at [GITHUB].
			 */
			projectDescription: () => LocalizedString
			/**
			 * version
			 */
			version: () => LocalizedString
		}
	}
	tweet: {
		actions: {
			/**
			 * open tweet in X
			 */
			seeOriginal: () => LocalizedString
			copy: {
				/**
				 * copy
				 */
				title: () => LocalizedString
				/**
				 * link
				 */
				link: () => LocalizedString
				/**
				 * image
				 */
				image: () => LocalizedString
				/**
				 * successfully copied the {what|{image: image, link: link}} to clipboard
				 */
				success: (arg: { what: 'image' | 'link' }) => LocalizedString
				/**
				 * failed to copy the {what|{image: image, link: link}} to clipboard
				 */
				error: (arg: { what: 'image' | 'link' }) => LocalizedString
			}
			save: {
				/**
				 * save
				 */
				title: () => LocalizedString
				/**
				 * successfully saved the image
				 */
				success: () => LocalizedString
				/**
				 * failed to save the image
				 */
				error: () => LocalizedString
			}
		}
		/**
		 * retweeted
		 */
		retweeted: () => LocalizedString
	}
	user: {
		/**
		 * follow
		 */
		follow: () => LocalizedString
		/**
		 * followers
		 */
		followers: () => LocalizedString
		/**
		 * following
		 */
		following: () => LocalizedString
	}
}

export type Formatters = {}
