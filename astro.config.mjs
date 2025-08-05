// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [sitemap(), solidJs()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
  image: {
    layout: "constrained",
  },
});

