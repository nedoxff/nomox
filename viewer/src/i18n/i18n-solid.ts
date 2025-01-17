// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initI18nSolid } from "typesafe-i18n/solid";
import type {
	Formatters,
	Locales,
	TranslationFunctions,
	Translations,
} from "./i18n-types.js";
import { loadedFormatters, loadedLocales } from "./i18n-util.js";

const { TypesafeI18n, useI18nContext } = initI18nSolid<
	Locales,
	Translations,
	TranslationFunctions,
	Formatters
>(loadedLocales, loadedFormatters);

export { useI18nContext };

export default TypesafeI18n;
