/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  base: "/preview/",

  cacheDir: "../../node_modules/.vite/preview",

  build: {
    sourcemap: true,
    emptyOutDir: true,
  },

  server: {
    host: true,
    port: 4173,
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },

  plugins: [react(), nxViteTsPaths()],

  resolve: {
    alias: {
      "@/preview/": `${searchForWorkspaceRoot(process.cwd())}/apps/preview/src/`,
    },
  },
});
