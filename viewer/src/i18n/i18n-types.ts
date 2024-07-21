// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type {
	BaseTranslation as BaseTranslationType,
	LocalizedString,
} from "typesafe-i18n";

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = "en";

export type Locales = "en" | "ru";

export type Translation = RootTranslation;

export type Translations = RootTranslation;

type RootTranslation = {
	/**
	 * E​n​g​l​i​s​h
	 */
	name: string;
	/**
	 * �​�
	 */
	flag: string;
	login: {
		/**
		 * n​o​m​o​x​ ​d​o​e​s​ ​n​o​t​ ​y​e​t​ ​h​a​v​e​ ​a​ ​f​a​n​c​y​ ​g​r​a​p​h​i​c​ ​f​o​r​ ​t​h​i​s​ ​s​e​c​t​i​o​n​.
		 */
		noGraphic: string;
		/**
		 * w​e​l​c​o​m​e​ ​t​o​ ​n​o​m​o​x​!
		 */
		title: string;
		/**
		 * n​o​m​o​x​ ​i​s​ ​a​n​ ​a​l​t​e​r​n​a​t​i​v​e​ ​f​r​o​n​t​e​n​d​ ​f​o​r​ ​t​w​i​t​t​e​r​,​ ​n​o​w​ ​k​n​o​w​n​ ​a​s​ ​X​.
		 */
		description: string;
		/**
		 * t​o​ ​l​o​g​i​n​,​ ​u​s​e​ ​t​h​e​ ​s​a​m​e​ ​c​r​e​d​e​n​t​i​a​l​s​ ​y​o​u​ ​w​o​u​l​d​ ​u​s​e​ ​t​o​ ​l​o​g​i​n​ ​i​n​t​o​ ​t​w​i​t​t​e​r​.
		 */
		loginInstructions: string;
		/**
		 * i​d
		 */
		id: string;
		/**
		 * e​n​t​e​r​ ​y​o​u​r​ ​u​s​e​r​n​a​m​e​/​e​m​a​i​l​/​p​h​o​n​e​ ​n​u​m​b​e​r​.​.​.
		 */
		idPlaceholder: string;
		/**
		 * p​a​s​s​w​o​r​d
		 */
		password: string;
		/**
		 * e​n​t​e​r​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​.​.​.
		 */
		passwordPlaceholder: string;
		/**
		 * l​o​g​i​n
		 */
		login: string;
		/**
		 * s​o​u​r​c​e​ ​c​o​d​e
		 */
		sourceCode: string;
	};
	main: {
		tabs: {
			/**
			 * h​o​m​e
			 */
			home: string;
			/**
			 * e​x​p​l​o​r​e
			 */
			explore: string;
			/**
			 * n​o​t​i​f​i​c​a​t​i​o​n​s
			 */
			notifications: string;
			/**
			 * m​e​s​s​a​g​e​s
			 */
			messages: string;
			/**
			 * b​o​o​k​m​a​r​k​s
			 */
			bookmarks: string;
			/**
			 * p​r​o​f​i​l​e
			 */
			profile: string;
			/**
			 * s​e​t​t​i​n​g​s
			 */
			settings: string;
		};
	};
	tweet: {
		actions: {
			/**
			 * o​p​e​n​ ​t​w​e​e​t​ ​i​n​ ​X
			 */
			seeOriginal: string;
			/**
			 * c​o​p​y
			 */
			copy: string;
			/**
			 * s​a​v​e
			 */
			save: string;
		};
		/**
		 * r​e​t​w​e​e​t​e​d
		 */
		retweeted: string;
	};
	user: {
		/**
		 * f​o​l​l​o​w
		 */
		follow: string;
		/**
		 * f​o​l​l​o​w​e​r​s
		 */
		followers: string;
		/**
		 * f​o​l​l​o​w​i​n​g
		 */
		following: string;
	};
};

export type TranslationFunctions = {
	/**
	 * English
	 */
	name: () => LocalizedString;
	/**
	 * 🌐
	 */
	flag: () => LocalizedString;
	login: {
		/**
		 * nomox does not yet have a fancy graphic for this section.
		 */
		noGraphic: () => LocalizedString;
		/**
		 * welcome to nomox!
		 */
		title: () => LocalizedString;
		/**
		 * nomox is an alternative frontend for twitter, now known as X.
		 */
		description: () => LocalizedString;
		/**
		 * to login, use the same credentials you would use to login into twitter.
		 */
		loginInstructions: () => LocalizedString;
		/**
		 * id
		 */
		id: () => LocalizedString;
		/**
		 * enter your username/email/phone number...
		 */
		idPlaceholder: () => LocalizedString;
		/**
		 * password
		 */
		password: () => LocalizedString;
		/**
		 * enter your password...
		 */
		passwordPlaceholder: () => LocalizedString;
		/**
		 * login
		 */
		login: () => LocalizedString;
		/**
		 * source code
		 */
		sourceCode: () => LocalizedString;
	};
	main: {
		tabs: {
			/**
			 * home
			 */
			home: () => LocalizedString;
			/**
			 * explore
			 */
			explore: () => LocalizedString;
			/**
			 * notifications
			 */
			notifications: () => LocalizedString;
			/**
			 * messages
			 */
			messages: () => LocalizedString;
			/**
			 * bookmarks
			 */
			bookmarks: () => LocalizedString;
			/**
			 * profile
			 */
			profile: () => LocalizedString;
			/**
			 * settings
			 */
			settings: () => LocalizedString;
		};
	};
	tweet: {
		actions: {
			/**
			 * open tweet in X
			 */
			seeOriginal: () => LocalizedString;
			/**
			 * copy
			 */
			copy: () => LocalizedString;
			/**
			 * save
			 */
			save: () => LocalizedString;
		};
		/**
		 * retweeted
		 */
		retweeted: () => LocalizedString;
	};
	user: {
		/**
		 * follow
		 */
		follow: () => LocalizedString;
		/**
		 * followers
		 */
		followers: () => LocalizedString;
		/**
		 * following
		 */
		following: () => LocalizedString;
	};
};

export type Formatters = {};
