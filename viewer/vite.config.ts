import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { analyzer } from 'vite-bundle-analyzer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [solid(), UnpluginTypia(), analyzer()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  preview: {
    cors: true,
  },
});
