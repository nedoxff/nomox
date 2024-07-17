import i18n, { type Config } from 'sveltekit-i18n';

const config: Config = {
    loaders: [
        {
            locale: 'en',
            key: '',
            loader: async () => (await import('./i18n/en.json')).default
        },
        {
            locale: 'ru',
            key: '',
            loader: async () => (await import('./i18n/ru.json')).default
        }
    ]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);