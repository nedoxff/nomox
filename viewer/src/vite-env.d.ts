/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare const __LAST_COMMIT_HASH__: string;
declare const __VERSION__: string;
