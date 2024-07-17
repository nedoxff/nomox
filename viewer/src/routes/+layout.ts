import { loadTranslations } from '$lib/translations';

export const ssr = false;

export const load = async ({ url }) => {
	const { pathname } = url;
	const locale = window.localStorage.getItem('locale') ?? 'en';
	await loadTranslations(locale, pathname);

	const storedTheme = window.localStorage.getItem('theme');
	const isDark = (storedTheme ?? '') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
	if(isDark) {
		document.documentElement.classList.add('dark');
	}
	if(storedTheme === null) {
		window.localStorage.setItem('theme', isDark ? 'dark': 'light');
	}
    
    return {};
};
