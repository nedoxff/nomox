import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";
import solid from "vite-plugin-solid";
import mkcert from'vite-plugin-mkcert'
import { defineConfig } from "vite";
import {version} from './package.json';

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import * as child from "node:child_process";
const commitHash = child.execSync("git rev-parse --short HEAD").toString();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [solid(), mkcert(), UnpluginTypia({cache: false})],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  preview: {
    cors: true,
  },
  define: {
    __LAST_COMMIT_HASH__: JSON.stringify(commitHash),
    __VERSION__: JSON.stringify(version)
  }
});
