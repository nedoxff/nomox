import type { Config } from 'tailwindcss';

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				dark: {
					DEFAULT: '#101010',
					50: '#6C6C6C',
					100: '#626262',
					200: '#4D4D4D',
					300: '#393939',
					400: '#242424',
					500: '#101010',
				},
				light: {
					DEFAULT: '#FFFFFF',
					50: '#FFFFFF',
					100: '#F1F1F1',
					200: '#D5D5D5',
					300: '#B9B9B9',
					400: '#9D9D9D',
					500: '#818181'
				}
			}
		}
	},

	plugins: []
} as Config;
